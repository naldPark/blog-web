const timelineEntries = [
  {
    hideDot: true,
    class: 'text-primary text-right mt-12 mb-12',
    large: true,
    title: 'Release Note History . .',
  },
  {
    icon: '📺💻🕋',
    cardTitle: '리펙토링',
    cardText:
      '시대의 흐름에 따라 Vue3 + nuxt.js + Typescript 로 리팩토링 (진행중)',
    link: 'https://daylog.nald.me/retrospect/vue2-greater-than-vue3',
  },
  {
    icon: '💻🕋',
    cardTitle: 'Free S3',
    cardText:
      'ubuntu에서 wget으로 file을 편리하게 받고싶어서 nodejs서버를 만듬',
    link: 'https://daylog.nald.me/retrospect/s3',
  },
  {
    icon: '💻🕋',
    cardTitle: 'Free EC2',
    cardText: 'nodejs 쿠버네티스 권한상승 방지',
    link: 'https://daylog.nald.me/retrospect/ec2',
  },
  {
    hideDot: true,
    class: 'text-primary text-right mt-12 mb-12',
    large: true,
    title: '2024년',
  },
  {
    icon: '💻🕋',
    cardTitle: 'K8s',
    cardText: '백엔드 쿠버네티스 상태조회',
    link: 'https://daylog.nald.me/infralogs/metric-server',
  },
  {
    icon: '📺💻',
    cardTitle: 'K8s',
    cardText: '채팅방 페이지 만듬 ( JAVA )',
  },
  {
    icon: '📺',
    cardTitle: 'gojs',
    cardText: 'gojs로 infra structure 구현',
  },
  {
    icon: '📺',
    cardTitle: '개발자도구 못하게 막기',
    cardText: '어떤 사이트에 개발자도구가 금지된걸 봤는데 적용해 보고 싶었음',
  },
  {
    icon: '🕋',
    cardTitle: 'kubernetes CRI containerd로 변경',
    cardText: 'kubernetes CRI containerd로 변경',
    link: 'https://daylog.nald.me/infralogs/on-premise-kubernetes/4.-on-premise-k8s-cri',
  },
  {
    icon: '📺💻🕋',
    cardTitle: '스트리밍 서비스 & nfs',
    cardText: '넷플릭스는 어떤 방식으로 작동할까가 시작',
    link: 'https://daylog.nald.me/backendlogs/ffmpeg-hls',
  },
  {
    icon: '📺💻🕋',
    cardTitle: 'Free RDB, ECR',
    cardText:
      '나스를 사고 무료 RDB, ECR: Elastic Container Registry로 사용 컴퓨터가 너무 불안정해서 db도 꺼지고 했음',
    link: 'https://daylog.nald.me/infralogs/on-premise-repo-db/1.-docker-repository-nexus',
  },
  {
    hideDot: true,
    class: 'text-primary text-right mt-12 mb-12',
    large: true,
    title: '2023년',
  },
  {
    class: 'mb-1',

    icon: '🕋',
    cardTitle: 'CI / CD 구현',
    cardText:
      '귀찮아서.. 젠킨스에서 권한의처리 엘리게이션 이라든가 롤바인딩 중요함',
    link: 'https://daylog.nald.me/infralogs/kubernetes/jenkins',
  },
  {
    class: 'mb-1',

    icon: '📺',
    cardTitle: 'i18n 다국어 지원 구현',
    cardText: '한 영 이렇게 바꾸는 사이트 들이 부러워서',
  },
  {
    class: 'mb-1',

    icon: '📺💻',
    cardTitle: '관리자 기능 구현',
    cardText: '기본적인 건데 삭제 추가 변경 등의 대한 기능',
  },
  {
    cardTitle: '컨텍트페이지 이메일 stmp',
    icon: '📺💻',
    cardText:
      '문의를 게시판을 통해서 보기 귀찮고 slack알람을 할까 고민하다가 그냥 메일로 함',
    link: null,
  },
  {
    cardTitle: '📺💻 로그인 기능 구현 (JWT)',
    cardText: 'JWT로 토큰방식으로 로그인 여부를 판단',
    link: 'https://daylog.nald.me/backendlogs/login',
  },
  {
    cardTitle: '🕋 쿠버네티스 환경 셋업',
    cardText: 'ec2프리티어에 의존할수 없어서',
    link: 'https://daylog.nald.me/infralogs/on-premise-kubernetes/1.-kubernetes',
  },
  {
    cardTitle: '💻 backend java jpa & 마리아디비 초기셋업',
    cardText:
      'frontend만 사용하면 기능의 한계가 있기에 이것또한 가장 익숙한 것 채택',
    link: 'https://daylog.nald.me/infralogs/on-premise-repo-db/3.-maria-db',
  },
  {
    cardTitle: '🕋 EC2 프리티어 사용 베포',
    cardText: '한번 public ip로 올려보고 싶었음',
    link: null,
  },
  {
    cardTitle: '📺 퍼블리싱 + 기본적인 디자인 구현',
    cardText: 'vuetify의 도움을 무진장받음',
    link: null,
  },
  {
    cardTitle: '📺💻 vue2 + Typescript기반 반응형 frontend 초기셋',
    cardText: '익숙해서 그 당시 가장 많이 접하는 조합이었음',
    link: null,
  },
  {
    cardTitle: '🕋 Rout53 도메인구매',
    cardText: 'ssl 수동으로 직접한다',
    link: 'https://daylog.nald.me/infralogs/on-premise-kubernetes/1.-kubernetes',
  },
  {
    hideDot: true,
    class: 'text-primary text-right mt-12 mb-12',
    large: true,
    title: '2022년',
  },
];

export default timelineEntries;
