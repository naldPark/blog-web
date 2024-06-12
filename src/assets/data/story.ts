const story: any = {
  Nald: {
    title: '프로젝트 존재의 이유',
    content:
      "외국어도 시간이 지나면 잊혀지듯이 프로그래밍도 안 하던걸 오랜만에 하면 버퍼링이 걸리기 마련이다.\n\n처음 개발자를 시작했을 때부터 가지고 있던 고질적인 고민이고 애써 익힌 무언가가 잊혀져가는게 안타까웠다.\n\n내가 짠 코드를 보는 것이 가장 기억을 빠르게 상기시키는 수단이기에,\n\n내 프로젝트에 기억하고 싶은 것들을 다 적용하자가 되었다.\n\n\n\n그렇게 탄생한 클라우드 내집 마련 '스크린뷰 날드파크' 단지 입니다.",
  },
  Frontend: {
    title: 'Vue2 + Typescript가 메인으로 구성',
    content:
      '큰 틀은 Vue로 구성되어 있다.\n\n이유는 내가 이 프로젝트를 시작할때 vue를 한참쓰고 있었기 때문이다.\n\n 만드는와중에 Vue3로 마이그레이션할까 했지만, 그것보다 앞으로 추가될 페이지는 리액트나 다른 라이브러리를 써서 붙이는게 더 도움이 될 것 같다',
  },
  Backend: {
    title: 'Java언어 + JPA인터페이스',
    content:
      'Java언어에 JPA인터페이스를 더했다. \n\nJPA에 익숙해지려는 목적도 있고 DB변경시에도 편리할 것 같아서.\n\n거기에 MariaDB와 연결해서 사용하고 있다.\n\n',
  },
  Infra: {
    title: 'Kubernetes를 전면으로 세움',
    content:
      '말도 많고 탈도 많은 인프라 \n\n가장 삽질도 많았고 스트레스도 많았던 파트.\n\n 그만큼 해냈을 때의 성취감도 엄청난 파트..\n\n',
  },
  Jenkins: {
    title: 'CI 구축',
    content:
      '어플리케이션의 자동화를 위한 툴로 K8S내에 Pod로서 자리잡고 있다 \n\n 이녀석 생각보다 용량도 자원도 많이 쓴다.\n\n 설치할 때 다양한 권한과 기능이 필요하고 노드와 복잡하게 얽혀있어서 많은 시행착오를 만들어냈던 툴..',
  },
  Argocd: {
    title: 'CD 구축',
    content:
      'Jenkins에 비해서 수월하게 셋팅함\n\n 권한 같은것도 깃헙과 상호작용만 하면 되고 크게 건드릴건 없었음',
  },
  Java: {
    title: 'Java +  SpringBoot + Maven + JPA + MariaDB',
    content:
      'Maven과 JPA를 사용하여 프로젝트의 메인 백엔드 역할을 맡고 있다.\n\n 보안, video스트리밍, 파일변환, k8s모니터링등 다양한 시도중..\n\n ',
  },
  Mariadb: {
    title: 'MariaDB가 최선이다',
    content:
      'Nas Storage에 저장되고 Network File System으로 어플리케이션과 연동하여 이용중\n\nRDMBS 소프트웨어 중에  현재 실무에 사용하는게 mysql이라 oracle은 배제하고 생각했을 때\n\nMariaDB가 성능적인 부분이나 완벽한 무료라는 점에서 선택\n\n ',
  },
  Vue: {
    title: 'Vue2 + Vuetify ',
    content:
      '나한테 가장 익숙해서 선택함\n\n Vue3도 있고 React도 있고 다양한 라이브러리가 나오고 있는데 이런것들은 사이드로 붙여서 사용해볼 예정 \n\n 디자인 능력은 그다지 좋지 않아 Vuetify의 힘을 빌려 사용중',
  },
  JPA: {
    title: 'Spring Data JPA + QueryDsl',
    content:
      '최대한 Native Query는 사용하지 않아보려고 노력중\n\n 객체지향적 코드를 짜려고 선택한 것이기 때문에\n\n  아직까지는 두 조합으로 버티고 있다',
  },
  Typescript: {
    title: 'Vue와 함께 사용',
    content:
      'Typescript를 쓰면 가장 좋은게 가끔 타입을 잘못써서 헤매는 경우나 복잡해지면 페이지 왔다갔다하면서 뭐였지 하는 경우가 있는데, 타입을 확정해버리니 개발속도가 빨라지는 좋은 점이 있다.\n\n (하지만 급하면 any로 일관하는 나를 발견함..)',
  },
  Kubernetes: {
    title: '인프라의 중심',
    content:
      '여기 있는 대부분의 것들은 Kubernetes의 Pod로 띄워져 있고 Kubernetes내에서 관리된다.\n\n  Node는 MasterNode를 포함하여 총 3개\n\n ',
  },
  Docker: {
    title: 'Docker & Containerd',
    content:
      ' Kubernetes가 정책을 바꾸면서 사실 CRI를 containerd로 변경했다\n\n 다만 아직 Jenkins에서 빌드시에는 docker를 사용중이다 ',
  },
  Ubuntu: {
    title: 'Ubuntu server 20.04',
    content:
      '이 모든건 Ubuntu server 20.04기반에서 이루어지고 있다.\n\n GUI버전으로도 깔아봤으나 10만원 주고산 낡은 PC는 GUI를 버텨내지 못해서 다시 server버전으로 깔았다\n\n 3대를 kubernetes Node로 사용하고 있다',
  },
  Nginx: {
    title: 'Frontend 웹서버',
    content:
      'Frontend 웹서버로 사용중, reverse proxy를 적용해서 backend와 소통하고 있다.\n\n 시간이 되면 forward proxy서버를 하나 별도로 만들어서 중간에 세울까 고민중이다..\n\n',
  },
  SpringBoot: {
    title: 'Java를 쓴다면 필수품',
    content:
      '좋은 Spring boot를 두고 Spring Legacy를 쓸 이유가 없어서 사용\n\n',
  },
  Nexus: {
    title: 'Docker Repository',
    content:
      'Docker허브는 유료라서 선택하지 않았고 Harbor와 Nexus중에 고민했으나 손에 더익었다는 이유로 Nexus로 선택\n\n 처음에는 k8s에 pod로 실행했으나 cpu 메모리 모든것이 최소사양 미달이라 문제가 많았다.\n\n 그래서 ubuntu에 설치해서 사용하다가 Nas를 구입하면서 Nas에 Docker로 이미지를 띄워서 사용중이다',
  },
  JavaScript: {
    title: 'Frontend 메인언어',
    content: 'frontend에 사용중 ( 더이상의 설명이 필요할까.. )',
  },
  Nas: {
    title: '저장장치',
    content:
      '주 역할은 k8s에서의 storageClass로 Nas내에 Persistent Volume을 만들어서 사용중\n\n 그 외에 Nexus 레파지토리로도 사용',
  },
  Github: {
    title: '형상관리툴',
    content:
      'CI / CD 로 깃헙과 연결하여 배포 자동화처리가 되어있음\n\n이후에 github Actions도 해보자',
  },
  Helm: {
    title: 'Kubernetes 배포시 사용',
    content:
      '여러가지 어플리케이션을 간단한 cmd명령어로 실행할 수 있는데, nfs는 Helm을 활용하여 설치함',
  },
};

export default story;
