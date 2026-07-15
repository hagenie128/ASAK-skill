# LPMBOX

![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)

> 이 프로젝트는 **LTBox 문서 스타일**을 따르며 **LTBox 라이선스 모델**에 따라 배포됩니다.
>
> * [LTBox](https://github.com/jjhitel/LTBox), [LTBox 라이선스](https://github.com/jjhitel/LTBox?tab=License-1-ov-file)
> * LTBox에서 영감을 받아 **MediaTek 기반 Lenovo 태블릿 펌웨어 작업**에 맞게 수정했습니다.
> * **이 프로젝트는 LTBox 개발자와 관련이 없으며, 개발 승인을 받아 LPMBox를 개발했습니다.**
> * LTBox(CC BY-NC-SA 4.0)를 기반으로 **?좎뒪 (dwas)**가 MTK Lenovo 펌웨어 작업을 위해 수정·확장했습니다.
> * **비상업적 사용:** 이 프로젝트를 판매하거나 유료로 제공하거나, 상업적 이익 또는 금전적 보상을 주된 목적으로 사용하지 마세요.

---

## 1. 개발자 YouTube

* 개발 및 관리: **?좎뒪 (dwas)**
* [YouTube 채널](https://www.youtube.com/@dwas_KR?sub_confirmation=1)
* [동영상 보기](https://youtu.be/M3hUF-AVJbM?si=CkAkY9Rv6jFtvQmm)

[![동영상 보기](https://img.youtube.com/vi/M3hUF-AVJbM/0.jpg)](https://youtu.be/M3hUF-AVJbM?si=CkAkY9Rv6jFtvQmm)

---

## 2. 개요

**LPMBox**는 **MediaTek(MTK) 기반 Lenovo 태블릿**에서 PRC(중국) / ROW(글로벌) 펌웨어 작업을 쉽게 할 수 있도록 제작된 도구입니다.

### 언어 및 LPMBox 오류 목록·해결 방법

* [영어 (en)](https://dwas.tistory.com/20) / [한국어 (ko)](https://dwas.tistory.com/19) / [러시아어 (ru)](https://dwas.tistory.com/25) / [일본어 (jp)](https://dwas.tistory.com/23)
* [중국어 (CN/TW)](https://dwas.tistory.com/27) / 베트남어 (vi) / 그리스어 (el) / 힌디어 (hi)
* 조지아어 (ka) / 네덜란드어 (nl) / 아랍어 (ar) / 스페인어 (es)

![이미지](https://github.com/user-attachments/assets/cbe60528-9d8e-47c7-955e-32947ecf2c00)

### 지원 대상 모델

* Xiaoxin Pad Pro 2025 (TB375FC, TB373FU)
* Xiaoxin Pad 12.1 (TB365FC, TB361FU)
* Xiaoxin Pad 2025 (TB335FC, TB336FU)
* MediaTek Dimensity 칩셋을 사용하는 기타 Lenovo 태블릿

> ⚠️ 참고: 동작 방식은 기기 모델, ROM 및 SoC/플랫폼에 따라 달라질 수 있습니다.  
> 반드시 해당 기기 전용 **공식 펌웨어 패키지**를 사용하세요.

---

## 3. 메뉴(기능)

![이미지](https://github.com/user-attachments/assets/ad800f39-f909-484d-a107-4f4c7e3f2dc3)

### 3.1 옵션 1: PRC(중국) 또는 ROW(글로벌) 펌웨어 설치/플래시 [데이터 삭제]

초기화 후 새로 설치합니다. **모든 사용자 데이터가 삭제됩니다.**

### 3.2 옵션 2: ROW(글로벌) 펌웨어 업데이트 [데이터 유지]

이 옵션을 사용하면 **ROW(글로벌) 펌웨어** 간에 자유롭게 전환할 수 있습니다.

### 3.3 옵션 3: OTA 비활성화

시스템 OTA 업데이트 확인, 알림 및 관련 구성 요소를 비활성화합니다.

### 3.4 옵션 4: OTA 활성화 [중국 ROM 전용]

**PRC(중국) ROM** 기기에서 시스템 업데이트 앱과 OTA 기능을 복원합니다.  
기기에서 **ROW 펌웨어**를 사용 중이면 경고가 표시되고 메인 메뉴로 돌아갑니다.

### 3.5 옵션 5: MediaTek 드라이버 다운로드

MediaTek 드라이버 다운로드 페이지를 열고 현재 드라이버 설치 상태(예: **설치됨 / 설치되지 않음**)를 표시합니다.

### 3.6 옵션 6: 국가 코드 변경 기능 [켜기/끄기]

**국가 코드 변경** 기능을 켜거나 끕니다.

* **끄기** 상태에서는 메뉴 1과 메뉴 2에서 국가 코드 입력을 건너뛰고 다음을 표시합니다:  
  `[*] 국가 코드 기능을 건너뜁니다.`

### 3.7 옵션 7: LPMBox 업데이트 확인

현재 LPMBox 버전을 확인하고 새 버전이 있으면 도구를 업데이트합니다.

### 3.8 옵션 8: LPMBox 언어 변경

언제든 원하는 UI 언어를 다시 선택할 수 있습니다.

### 3.9 옵션 9: 개발자 YouTube

Lenovo 태블릿(ZUI / ZUXOS) 관련 가이드와 도구가 있는 개발자 YouTube 채널을 엽니다.

### 종료

`x`를 눌러 프로그램을 종료합니다.

---

## 4. 빠른 시작(사용 방법)

### 4.1 다운로드 및 압축 해제

LPMBox 릴리스 압축 파일을 다운로드한 후 **압축을 해제**합니다.

### 4.2 드라이버 설치(중요)

다음 방법 중 하나로 MTK 드라이버를 설치할 수 있습니다.

* LPMBox 메인 메뉴의 **옵션 4: MTK 드라이버 다운로드** 사용
* 또는 [https://mtkdriver.com/](https://mtkdriver.com/)에서 직접 다운로드하여 설치

**LPMBox는 시스템에 MediaTek 드라이버가 설치되어 있는지 감지합니다.**

### 4.3 `image/` 폴더 준비(중요)

Lenovo Software Fix를 통해 다운로드한 공식 펌웨어의 **`image` 폴더**를 LPMBox 루트 디렉터리에 복사합니다.

일반적인 구성은 다음과 같습니다.

* `image/`
* `image/flash.xml`
* `image/da.auth`
* `image/<platform>_Android_scatter.x` (예: `MT0000_Android_scatter.x`)
* `image/super.img`, `image/userdata.img`, `image/vendor.img` 등

> 정확한 `image/` 폴더 구조는 펌웨어 패키지에 따라 다릅니다.  
> 반드시 **Lenovo Software Fix에서 다운로드한 공식 펌웨어**를 사용하세요.

### 4.4 실행

`start.cmd`를 실행하고 원하는 옵션을 선택합니다.

---

## 5. 요구 사항

### 권장 환경

* Windows 10/11(32비트, 64비트)
* 안정적인 USB 케이블/포트(메인보드에 직접 연결된 USB 포트 권장)
* **USB 디버깅(ADB) 활성화 및 PC 인증 완료**
* **MediaTek USB Port(Preloader) 드라이버 설치**  
  (장치 관리자에 **MediaTek Preloader USB VCOM**으로 표시되어야 합니다.)

### 필요한 펌웨어 파일(사용자가 준비)

다음 파일을 포함한 기기 전용 공식 펌웨어/도구 패키지가 필요합니다.

* `flash.xml`
* `da.auth`(DA/인증 파일)
* `*_Android_scatter.x`
* `flash.xml`에서 참조하는 파티션 이미지 파일(예: `*.img`)

---

## 6. ⚠️ 중요: 면책 사항

이 프로젝트는 **학습, 연구 및 개인적인 사용**만을 위해 제공됩니다.  
펌웨어 플래싱과 파티션 수준의 작업에는 다음과 같은 심각한 위험이 있습니다.

* 기기 **벽돌화** / 부팅 실패
* **데이터 손실**(공장 초기화)
* 보증 무효, 지역/서비스 제한 및 기타 문제

작성자는 이 도구의 사용으로 인해 발생하는 손상이나 손실에 대해 책임지지 않습니다.  
**모든 결과에 대한 책임은 사용자에게 있습니다. 반드시 본인 책임하에 사용하세요.**

---

## 7. 크레딧

### 7.1 영감을 받은 프로젝트 / 기반 프로젝트

* **jjhitel**(및 기여자)의 **LTBox**  
  [https://github.com/jjhitel/LTBox](https://github.com/jjhitel/LTBox)  
  (LTBox README에 명시된 CC BY-NC-SA 4.0 라이선스 적용)

### 7.2 특별 감사

* **익명([태블릿PC 갤러리](https://gall.dcinside.com/board/lists?id=tabletpc))**: LTBox 프로젝트/파일을 공유하고 LPMBox 개발을 가능하게 해주셔서 감사합니다.
* **[hitin911](https://xdaforums.com/m/hitin911.12861404/)**: `.x` 파일을 `.xml`로 복호화하는 방법과 XML 스크립트 수정에 대한 안내를 제공해주셔서 감사합니다.

---

## 8. 서드파티

* [Android platform-tools](https://developer.android.com/tools/releases/platform-tools?hl=en)(ADB/Fastboot)
* [Python(임베더블)](https://www.python.org/downloads/windows/) / pip / 오픈 소스 Python 패키지(예: [cryptography](https://pypi.org/project/cryptography/))
* [SP Flash Tool V6](https://spflashtools.com/windows/sp-flash-tool-v6-2404)

> LPMBox에는 Lenovo 펌웨어가 포함되어 있지 않습니다.  
> 사용자는 Lenovo Software Fix 등 공식 경로를 통해 공식 펌웨어를 직접 다운로드해야 합니다.

---

## 9. 라이선스

LPMBox는 **LTBox와 동일한 라이선스 모델**을 따릅니다.

이 저작물은 다음 라이선스에 따라 이용할 수 있습니다.  
**Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)**

자세한 내용은 `LICENSE` 파일 또는 다음 페이지를 참고하세요.  
[https://creativecommons.org/licenses/by-nc-sa/4.0/](https://creativecommons.org/licenses/by-nc-sa/4.0/)

> ⚠️ **참고**  
> LPMBox에서 사용하거나 다운로드하는 서드파티 도구/파일(예: SP Flash Tool, platform-tools, 펌웨어 패키지)은  
> 각각의 라이선스와 배포 조건이 적용됩니다. 반드시 별도로 확인하고 준수하세요.

[![CC BY-NC-SA 4.0][cc-by-nc-sa-image]][cc-by-nc-sa]

[cc-by-nc-sa]: https://creativecommons.org/licenses/by-nc-sa/4.0/
[cc-by-nc-sa-image]: https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png
