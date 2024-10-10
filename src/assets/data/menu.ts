const menuItems = [
  {
    name: 'home',
    icon: 'mdi-home',
    title: 'menubar.home',
    value: 'MainPage',
    anonymousAccess: true,
    active: false,
  },
  {
    name: 'infra',
    icon: 'mdi-duck',
    title: 'menubar.infra',
    value: 'ProjectPage',
    anonymousAccess: false,
    active: false,
  },
  {
    name: 'aboutMe',
    icon: 'mdi-robot-happy-outline',
    title: 'menubar.aboutMe',
    value: 'AboutMePage',
    anonymousAccess: false,
    active: false,
  },
  {
    name: 'wonderwall',
    icon: 'mdi-space-invaders',
    title: 'menubar.wonderwall',
    value: 'WonderwallPage',
    anonymousAccess: false,
    subMenus: [
      {
        name: 'sandbox',
        icon: 'mdi-server',
        title: 'menubar.sandbox',
        value: 'SandboxPage',
      },
      {
        name: 'share',
        icon: 'mdi-share',
        title: 'menubar.shareLocker',
        value: 'SharePage',
        availableRange: 1,
        url: 'https://upload.nald.me',
      },
      {
        name: 'webApp',
        icon: 'mdi-cellphone-text',
        title: 'menubar.webApp',
        value: 'WebAppPage',
        url: 'https://pwa.nald.me',
      },
      {
        name: 'video',
        icon: 'mdi-television-box',
        title: 'menubar.video',
        value: 'StreamingListPage',
      },
      {
        name: 'chat',
        icon: 'mdi-gamepad',
        title: 'menubar.clilendor',
        value: 'ChatRoomPage',
      },
      // {
      //   name: 'characterTest',
      //   icon: 'mdi-penguin',
      //   title: 'menubar.characterTest',
      //   value: 'CharacterTestPage',
      // },
    ],
  },
  {
    name: 'contactPage',
    icon: 'mdi-email-outline',
    title: 'menubar.contact',
    value: 'ContactPage',
    anonymousAccess: true,
    active: false,
  },
];
export default menuItems;
