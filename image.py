from pathlib import Path
from datetime import datetime
import os

import cloudinary
import cloudinary.uploader
import mysql.connector

from dotenv import load_dotenv


# =========================================================
# 환경 변수
# =========================================================

load_dotenv()

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True,
)


# =========================================================
# 설정
# =========================================================

KIOSK_ASSETS = Path(r"C:\ASAK-workspace\ASAK-Kiosk\public\assets")

# (로컬 소스 폴더, Cloudinary asset_folder) 쌍. 기존에 만들어진
# asak/icon, asak/opt, asak/menus 폴더 구조를 그대로 따른다.
UPLOAD_TARGETS = [
    (KIOSK_ASSETS / "ingredients" / "icons", "asak/icon"),
    (KIOSK_ASSETS / "ingredients" / "photos", "asak/opt"),
    (KIOSK_ASSETS / "menu", "asak/menus"),
]

PROVIDER_ID = int(os.getenv("CLOUDINARY_PROVIDER_ID"))


# =========================================================
# DB 연결
# =========================================================

conn = mysql.connector.connect(
    host=os.getenv("DB_HOST"),
    port=int(os.getenv("DB_PORT", 3306)),
    database=os.getenv("DB_NAME"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
)

cursor = conn.cursor()


# =========================================================
# Cloudinary Response -> DB
# =========================================================

UPSERT_SQL = """
INSERT INTO media_asset (
    provider_id,
    public_id,
    asset_folder,
    url,
    format,
    width,
    height,
    bytes,
    uploaded_at
)
VALUES (
    %s,
    %s,
    %s,
    %s,
    %s,
    %s,
    %s,
    %s,
    %s
)
ON DUPLICATE KEY UPDATE
    asset_folder = VALUES(asset_folder),
    url = VALUES(url),
    format = VALUES(format),
    width = VALUES(width),
    height = VALUES(height),
    bytes = VALUES(bytes),
    uploaded_at = VALUES(uploaded_at),
    deleted_at = NULL
"""


def parse_cloudinary_datetime(value):
    """
    Cloudinary:
    2024-06-25T09:25:44Z

    MySQL:
    datetime 객체
    """

    if not value:
        return None

    return datetime.fromisoformat(
        value.replace("Z", "+00:00")
    ).replace(tzinfo=None)


def save_to_db(response):
    values = (
        PROVIDER_ID,
        response["public_id"],
        response.get("asset_folder"),
        response["secure_url"],
        response.get("format"),
        response.get("width"),
        response.get("height"),
        response.get("bytes"),
        parse_cloudinary_datetime(
            response.get("created_at")
        ),
    )

    cursor.execute(UPSERT_SQL, values)


# =========================================================
# 업로드
# =========================================================

def upload_file(file_path: Path, cloudinary_folder: str):

    # 확장자를 제거한 파일명
    filename = file_path.stem

    # public_id도 폴더 구조와 맞춤
    public_id = f"{cloudinary_folder}/{filename}"

    response = cloudinary.uploader.upload(
        str(file_path),

        resource_type="image",

        # Media Library 위치
        asset_folder=cloudinary_folder,

        # URL / DB에서 사용할 ID
        public_id=public_id,

        # 기존 public_id가 있다면 덮어쓰기
        overwrite=True,

        # CDN 캐시 갱신
        invalidate=True,
    )

    return response


# =========================================================
# 전체 실행
# =========================================================

def main():

    extensions = {
        ".svg",
        ".png",
        ".jpg",
        ".jpeg",
        ".webp",
    }

    success = 0
    failed = 0

    for source_dir, cloudinary_folder in UPLOAD_TARGETS:

        files = [
            path
            for path in source_dir.rglob("*")
            if path.is_file()
            and path.suffix.lower() in extensions
        ]

        print(f"\n=== {source_dir} -> {cloudinary_folder} ===")
        print(f"총 {len(files)}개 파일 발견\n")

        for index, file_path in enumerate(files, start=1):

            try:

                print(
                    f"[{index}/{len(files)}] "
                    f"{file_path.name}"
                )

                response = upload_file(file_path, cloudinary_folder)

                save_to_db(response)

                conn.commit()

                success += 1

                print(
                    f"  ✅ {response['secure_url']}"
                )

            except Exception as e:

                conn.rollback()

                failed += 1

                print(
                    f"  ❌ {file_path.name}"
                )

                print(
                    f"     {e}"
                )


    print()
    print("============================")
    print("Cloudinary 업로드 완료")
    print("============================")
    print(f"성공: {success}")
    print(f"실패: {failed}")
    print("============================")


if __name__ == "__main__":

    try:
        main()

    finally:

        cursor.close()
        conn.close()