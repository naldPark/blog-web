// 단순한 원시값(Primitive Type)이나 튜플(Tuple), 유니언(Union) 타입을 선언할 때 type을 사용하는 것이 좋다.

// 또한 확장 불가능한 타입을 선언하고 싶다면 type을 사용하면 되고, 확장 가능한 타입을 선언하고 싶다면 interface를 사용하면 된다.

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
  url?: string;
}

export type ValidationRule = (value: string) => string | boolean;

export interface CommonListRequestData {
  pageNumber?: number;
  pageSize?: number;
  sort?: string;
}
