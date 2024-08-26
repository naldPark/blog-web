export interface MenuInfo {
  name: string;
  icon: string;
  value: string;
  subMenus?: SubMenuInfo[];
  anonymousAccess?: boolean;
  active: boolean;
}

export interface SubMenuInfo {
  name: string;
  icon: string;
  title: string;
  value: string;
}

export type ValidationRule = (value: string) => string | boolean;
