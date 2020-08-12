import {UserMenuActiveStateModel} from "./user-menu.state";


export class GetMenuList {
  public static readonly type ="[GET MENU API] Call Get Menu Service";
}

export class SetCurrentMenu {
  public static readonly type = "[SET MENU] Set Current/Active Menu";
  constructor(public goBack: boolean, public item?: UserMenuActiveStateModel) {
  }
}

export class SetActiveMenuItem {
  public static readonly type = "[Active Menu] Set Active Menu Item";
  constructor(public item: UserMenuActiveStateModel) {
  }
}

export class ClearActiveMenuItem {
  public static readonly type = "[Clear Menu] Clear Active Menu Item";

}
