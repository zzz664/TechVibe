# 🚀 테크 바이브 (Tech-Vibe)


---

## ✨ 목차 (Table of Contents)

* [프로젝트 소개](#프로젝트-소개)
* [주요 기능](#주요-기능)
* [기술 스택](#기술-스택)
* [설치 및 실행 방법](#설치-및-실행-방법)
* [기여자](#기여자)
* [라이센스](#라이센스)

---

## 🌟 프로젝트 소개 (Introduction)

* **배경:** 이 프로젝트는 ServerSideRendering에 관심을 갖게 되면서 Next.js 프레임워크의 동작방식에 익숙해지고 각종 api들을 활용해보기 위해 시작되었습니다.
* **목표:** 개인의 관심사에 대한 글을 작성하고 보여주기 겸 포트폴리오 업로드를 위한 개인 블로그
* **해결하는 문제:** 직접 블로그를 제작해보며 사용한 기술에 대한 호기심이 해소된다. 다양한 로직의 구현을 통한 로직의 기본 동작에 대한 원리를 이해하며 체득하고 차후 프로젝트 진행에 있어 밑거름이 된다.

---

## 🛠️ 주요 기능 (Features)

* ✅ **기능 1:** 블로그 방문객들이 가장 많이 찾아본 게시글의 썸네일과 작성자 및 게시날짜를 보여준다.
* ✅ **기능 2:** 블로그 주인이 새로 게시한 게시글의 썸네일과 작성자 및 게시날짜를 보여준다.
* ✅ **기능 3:** 카테고리별 게시글의 썸네일과 작성자 및 게시날짜를 보여준다.
* ✅ **기능 4:** 게시글의 세부 내용과 댓글을 보여준다.
* ✅ **기능 5:** 방문자는 로그인 후 원하는 게시글에 댓글을 작성할 수 있다.
* ✅ **기능 6:** 블로그 주인은 로그인 후 새로운 게시글을 작성할 수 있다.
* ✅ **기능 7:** 작성중인 게시글은 임시저장해놓고 나중에 이어작성이 가능하다.
* ✅ **기능 8:** Notion api를 활용하여 Notion Database에 저장된 포트폴리오를 보여준다.

---

## 🧱 기술 스택 (Tech Stack)

### 🧑‍💻 Frontend
![Next.js Badge](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript Badge](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS Badge](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Shadcn UI Badge](https://img.shields.io/badge/Shadcn_UI-000000?style=for-the-badge&logo=vercel&logoColor=white)

### ⚙️ Backend & Authentication
![Supabase Auth Badge](https://img.shields.io/badge/Supabase_Auth-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Supabase Storage Badge](https://img.shields.io/badge/Supabase_Storage-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

### 💾 Database
![Supabase Database Badge](https://img.shields.io/badge/Supabase_Database-3ECF8E?style=for-the-badge&logo=postgresql&logoColor=white)
---

## ⚙️ 설치 및 실행 방법 (Installation & Run)

1.  **레포지토리 복제 (Clone the repository)**
    ```bash
    git clone https://github.com/zzz664/TechVibe.git
    ```

2.  **의존성 설치 (Install dependencies)**
    ```bash
    cd [프로젝트-폴더-이름]
    npm install
    ```
3. **환경 변수 설정 (Environment Variables Setup)**
    Supabase를 사용했기 때문에, 실행을 위해서는 .env.local 파일 설정이 필수입니다. 프로젝트 루트 폴더에 .env.local 파일을 생성합니다. Supabase 프로젝트의 API 설정에서 다음 변수들을 가져와 입력해야 합니다.
    ```bash
    # .env.local 파일 내용
    NEXT_PUBLIC_SUPABASE_URL="[당신의 Supabase 프로젝트 URL]"
    NEXT_PUBLIC_SUPABASE_ANON_KEY="[당신의 Supabase Public Anon Key]"
    SUPABASE_SERVICE_ROLE_KEY="[당신의 Supabase Service Role Key]"
    ```

4.  **프로젝트 실행 (Run the project)**
    ```bash
    npm run dev
    ```

---

## 🖼️ 사용 예시 (Usage Example)

추후 추가 예정

---

## 🧑‍💻 기여자 (Contributing)

프로젝트에 참여한 사람들의 정보를 기록합니다.

| 이름 | 역할 | GitHub |
| :---: | :---: | :---: |
| 이선우 | 개발 및 배포 | https://github.com/zzz664 |

---

## ⚖️ 라이센스 (License)

이 프로젝트는 **MIT License**를 따릅니다. 자세한 내용은 [LICENSE.md](LICENSE.md) 파일을 확인하세요.
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)