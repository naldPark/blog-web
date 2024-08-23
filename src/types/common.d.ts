export interface MenuInfo {
  name: string;
  icon: string;
  value: string;
  subMenus?: SubMenu[];
  anonymousAccess?: boolean;
  active: boolean;
}

export interface SubMenu {
  name: string;
  icon: string;
  title: string;
  value: string;
}
