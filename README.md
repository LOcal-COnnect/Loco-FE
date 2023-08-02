# Loco-FE

### ⚠️ 주의사항
1. 파일 구조 html, css, js, img 나눠서 작업
2. html 작성 시 내브바는 꼭 다른 div로 묶어서 작성 !! (재사용 용이)
3. 파일명은 영어로 근데 언더바 사용 X
   (ex. main.html selectMember.html login.html ,,,)
4. 피그마에서 이미지 export 할 때는 svg 파일로 다운로드
5. css명은 웬만하면 파일별로 따로 생성 + html이랑 이름 동일
6. 모바일뷰도 나중에 만들어야 하기 때문에 일단은 최소 width 768px 정도로 잡고, 화면 망가지지 않게 css 작성
7. 추후 레포 파고, 푸시할 때 커밋은 노션 -> 프로젝트 규칙 페이지 참고해서 커밋 작성

### 💬 커밋 메세지

**커밋 유형 지정 :** 커밋 유형은 영어 대문자로 작성하기

| 커밋 유형 | 의미 |
| --- | --- |
| Feat | 새로운 기능 추가 |
| Fix | 버그 수정 |
| Docs | 문서 수정 |
| Style | 코드 formatting, 세미콜론 누락, 코드 자체의 변경이 없는 경우 |
| Refactor | 코드 리팩토링 |
| Test | 테스트 코드, 리팩토링 테스트 코드 추가 |
| Chore | 패키지 매니저 수정, 그 외 기타 수정 ex) .gitignore |
| Design | CSS 등 사용자 UI 디자인 변경 |
| Comment | 필요한 주석 추가 및 변경 |
| Rename | 파일 또는 폴더 명을 수정하거나 옮기는 작업만인 경우 |
| Remove | 파일을 삭제하는 작업만 수행한 경우 |
| !HOTFIX | 급하게 치명적인 버그를 고쳐야 하는 경우 |

**커밋 예시**

```xml
- index.html 추가했을 때
Feat : index.html 추가

- 디자인(css) 변경했을 때
Style : index.css 변경
```

### 🔌 풀리퀘 방법


1. 제발 풀 일단 **PULL** 땡기고 보내세요. (main 브랜치에서 풀 땡기기)
2. 위의 규칙대로 커밋 달기
3. 푸시 후 `create pull request`
4. `MERGE`는 혜린쓰 내가 할게요 !!!!!!!!! 꼭 내가 하게 해줘
