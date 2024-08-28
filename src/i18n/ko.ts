import DOMPurify from 'dompurify';

export default {
  lang: 'ko',
  hello: '클라우드 내 집',
  nald: '스크린뷰 날드파크',
  name: '이름',
  email: '이메일',
  title: '제목',
  content: '내용',
  send: '보내기',
  category: '카테고리',
  blog: '업무 및 개발 관련 데이로그',
  github: '프로젝트 및 코드 정리',
  naver: '이전에 사용하던 블로그',
  complete: '완료',
  leave: '나가기',
  close: '닫기',
  error: '에러',
  unknownError: '알 수 없는 에러가 발생하였습니다',
  password: '비밀번호',
  passwordConfirm: '비밀번호 확인',
  show: '보이기',
  hide: '가리기',
  copied: '복사완료',
  editPassword: '비밀번호 변경',
  adminPage: '관리자 페이지',
  logout: '로그아웃',
  id: '아이디',
  defaultPlaceHolder: '입력하세요',
  cancel: '취소',
  confirm: '확인',
  doLogin: '로그인 해 주세요',
  loggedOut: '로그아웃 되었습니다',
  noGuestAccess: '게스트는 접근이 제한됩니다',
  changePwd: '변경할 Password를 입력해주세요',
  loginFailed: 'login failed',
  changePwdConfirm: '다시한번 Password를 입력해주세요',
  required: '필수항목입니다.',
  requiredError: '{0} 는 필수항목입니다.',
  idRulesError: 'Id는 소문자, 숫자 조합만 가능합니다',
  lengthRulesError: '{0}의 길이는 {1}보다 작아야 합니다.',
  emailRulesError: '이메일형식에 맞지 않습니다.',
  passwordRulesError:
    '대소문자, 숫자, 특수문자를 포함하여 8자~16자로 입력하세요.',
  passwordMatchRulesError: '비밀번호가 일치하지 않습니다.',
  mobileWarining: 'PC 화면을 이용하세요',
  accessDenied: '잘못된 접근입니다',
  inputEmpty: '필수 항목을 모두 입력하세요',
  emailValidate: '이메일을 정확하게 입력하세요',
  typeMessage: '메세지를 입력하세요',
  searchPlaceHolder: '검색하세요',
  countPerPage: '건 / 페이지',
  group: '그룹',
  status: '상태',
  user: '사용자',
  login: '로그인',
  admin: '관리자',
  failCnt: '실패 횟수',
  lastLoginDt: '최근 접속일',
  registDt: '등록일',
  createdDt: '생성일',
  edit: '수정',
  delete: '삭제',
  userManage: '사용자 관리',
  resourceManage: '리소스 관리',
  emptyManage: '미정',
  addUser: '사용자 추가',
  editUser: '사용자 수정',
  deleteUsers: '사용자 삭제',
  deleteUsersMsg: '{0} 사용자를 삭제하시겠습니까 ?',
  confirmMsg: '정상적으로 처리 되었습니다.',
  relogin: '다시 로그인 해주세요',
  chat: {
    enterInfo: 'ID를 확인하고 입장 해 주세요',
    enter: '입장하기',
    chatRoom: '방ID',
    connecting: '연결중입니다..',
  },
  video: {
    uploadDetail: '파일을 여기에 드래그 하거나 클릭 하세요 (.mp4파일)',
    uploadedDetail: '선택 완료. 파일을 변경하려면 클릭하세요.',
    upload: '업로드',
    videoPageSubTitle: '원하는 영상을 골라 지금 바로 즐기세요.',
    playAny: '비디오 랜덤 플레이하기',
    uploadVideo: '새로운 비디오 업로드 하기',
    selectedFile: '선택한 파일',
    uploadFileSize: '파일 업로드 사이즈',
    movieName: '동영상 이름',
    category: '카테고리',
    description: '줄거리 / 소개',
    fileCover: '포스터(.png만 가능)',
    subtitle: '자막(.vtt)',
    ableToDownload: '다운로드 가능 여부',
    private: '비공개 여부',
    download: '다운로드',
    synopsis: '줄거리',
    recommendedMovie: '추천영상',
    all: '전체',
    movie: '영화 (저작권 만료)',
    tomAndJerry: '톰과제리 시리즈',
    nald: '날드',
  },
  menubar: {
    home: '메인으로',
    infra: '날드파크 인프라 탐색', //kubenav 1, 에버노트 확인할것
    sandbox: '샌드박스( EC2 )',
    blog: '블로그 및 깃헙',
    aboutMe: '자기소개',
    wonderwall: '원더월',
    contact: '연락하기',
    video: '날드 티비', // 검색기능 추가, 컨텐츠 추가 업로드
    bookCafe: '도서대여점(공사중)',
    crawling: '크롤링(공사중)',
    utils: '유용한 유틸리티(공사중3)', //한글영어발음은로 바꾸기, pdf to png
    characterTest: '심리 테스트(공사중)',
    shareLocker: '공유드라이브 ( S3 )', // workupload
    doodle: '연습용 페이지(공사중)', // 진짜 연습용
    clilendor: '채팅방', // 스플렌더
    webApp: 'PWA (웹앱)',
    catchDrawing: '기린그림판(공사중)', // 캐치마인드
  },
  sandbox: {
    funcInfo: '기능 정보',
    rules: '규칙',
    rulesDesc: `
      - 각당 하나의 linux 기반의 샌드박스만 제공 \n
      - 사용하지 않는 경우 샌드박스는 stop상태로 변경  \n
      - 10일간 미사용시 샌드박스는 초기화 됨`,
    howToUse: '사용방법',
    howToUseDesc:
      '- 상태가 Running이 아닌 경우 Running으로 변경 후 접속 가능 \n - 하단의 인스턴스 시작 버튼 클릭 / 비밀번호는 버튼 우측에서 확인 가능 \n ',
    environmentInfo: '환경 정보',
    status: '상태',
    instanceInfo: '인스턴스 정보',
    startInstance: '인스턴스 시작',
    instancePwd: '비밀번호',
    containerImage: '컨테이너 이미지',
    sourceFolder: '소스폴더',
  },
  file_check_error: {
    file_extension: '등록 가능한 파일 종류 : \n',
    max_file_size: '최대 파일 크기 : {0}',
    local_file_error:
      '등록이 불가능한 파일이 존재 합니다.\n 아래 등록 가능한 조건을 확인하시고 다시 등록해주세요.\n\n',
    folder_file_error:
      '등록 불가한 파일이 포함되어 있습니다. 확인바랍니다.\n 등록불가파일: {0}.\n\n',
    file_type_error:
      '등록이 불가능한 파일 유형입니다.\n 아래 등록 가능한 파일 유형을 확인하시고 다시 등록해주세요.\n\n',
    file_size_error:
      '등록 가능한 최대 파일 크기를 초과 하였습니다.\n 아래 최대 파일 크기를 확인하시고 다시 등록해주세요.\n\n',
    file_set_error: '알 수 없는 형태의 데이터 셋입니다.',
    file_error:
      'API 호출 시 오류가 발생하였습니다. \n 파일을 확인해주세요.(파일명 특수문자 등) \n\n {0} \n 관리자에게 문의 하시기 바랍니다.',
  },
  prMessage: DOMPurify.sanitize(
    'Docker와 Kubernetes등의 환경에 익숙하며, Backend는 Java, Frontend는 Javascript(주로 Vue.js)를 다룹니다. \n도전적인 문제 해결에 성취감을 느낍니다.  \n 직관적이고 확장성있는 코드방식을 선호하고 효율적인 인프라 설계를 모색하는 편입니다.',
  ),
  // message: DOMPurify.sanitize("<b>Docker와 Kubernetes</b> 등의 환경에 익숙하며, Backend는 <b>Java</b>, Frontend는 <b>Javascript(주로 Vue.js)</b>를 다룹니다.<br>도전적인 문제 해결에 성취감을 느낍니다. <br> 직관적이고 확장성있는 코드방식을 선호하고 효율적인 인프라 설계를 모색하는 편입니다.")
  contactMsg: '편하게 연락 주세요.',
};
