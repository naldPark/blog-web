Vetur 확장 기능을 비활성화, Vue - 공식(예: Volar)을 사용

### docker

docker build -f ./Dockerfile -t nas.nald.me:35003/docker/main/front-web:v1 --build-arg PROFILE=local .

build: 코드 빌드와 관련된 변경 사항(ex: npm 종속성, 라이브러리 설치, docker 파일 등)
chore: 외부 사용자에게 영향을 주지 않는 변경 사항(ex: .gitignore 변경, .prettierrc 파일 변경 등)
feat: 새로운 기능
fix: 버그 수정
docs: 단순 텍스트(문서) 작업/JSDOC 포함
refactor: 변수/함수 이름 변경, 코드 정리, 미비한 타입 선언, 코드 퀄리티 개선 등
test: 새 테스트를 추가하거나 기존 테스트를 변경
style: 단순 스타일 변경
