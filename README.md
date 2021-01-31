# 햄버거 딜리버리 사이트

2021.01.18 ~ 01.29 1인 작업

node.js의 express.js를 공부하여 처음으로 백엔드까지 직접 코드를 짜본 즐거운 작업이었습니다. 몽고DB로 데이터베이스도 다뤄보고 많은 공부가 되었습니다.

메뉴등록페이지에서 메뉴를 업로드하면 몽고DB에 상품이 들어가고 메인 페이지에서는 등록된 상품들을 불러옵니다.

회원가입페이지에서는 react hook form을 이용하여 모든 칸을 필수로 입력하게끔 작업하였고 이메일 정규표현식을 사용하여 잘못된 이메일은 가입할 수 없게 처리하였습니다.

> ## 사용 기술

### 1. 프론트엔드 : react.js

- redux
- sass(scss)
- material-ui (아이콘만 사용)
- axios
- react hook form
- react router dom

### 2. 백엔드 : node.js/express.js

- mogoDB
- mongoose
- multer
- jsonwebtoken
- cookie-parser
- cors
- bcrypt

---

> ## 페이지

1.  회원가입 페이지
2.  로그인 페이지
3.  메인 메뉴페이지
4.  메뉴 업로드페이지
5.  카트 페이지

---

### 01. 회원가입 페이지

![register_page](https://user-images.githubusercontent.com/71235165/106388850-b0562280-6423-11eb-880b-7304e7e1f6a3.png)

### 02. 로그인 페이지

![login_page](https://user-images.githubusercontent.com/71235165/106388855-b9df8a80-6423-11eb-900f-0f28097a1698.png)

### 03. 메인 메뉴페이지

![main_page](https://user-images.githubusercontent.com/71235165/106388865-c19f2f00-6423-11eb-9c01-2a3b3bdc28b2.png)

### 04. 메뉴 업로드페이지

![upload_page](https://user-images.githubusercontent.com/71235165/106388878-cbc12d80-6423-11eb-96f1-2cee3690b458.png)

### 05. 카트 페이지

![cart_page](https://user-images.githubusercontent.com/71235165/106388887-d8de1c80-6423-11eb-838f-cf045d2050e7.png)
