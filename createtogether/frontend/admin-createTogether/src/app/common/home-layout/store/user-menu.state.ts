import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ClearActiveMenuItem, GetMenuList, SetActiveMenuItem, SetCurrentMenu } from './user-menu.action';
import { UserProfileService } from '../services/user-profile.service';
import { ApiLoadingError, ApiLoadingStart, ApiLoadingSuccess } from '../../../store/api.actions';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Utilities } from '../../../utilities';
import produce from 'immer';
import { Injectable } from '@angular/core';

export interface UserMenuActiveStateModel {
  id: number;
  displayName: string;
  iconName: string;
  route: string;
  position: number;
  hasSubMenu: boolean;
  subMenu: UserMenuStateModel[];
  permissions: string[];
  hasParent: boolean;
}
export interface UserMenuStateModel {
  id: number;
  displayName: string;
  iconName: string;
  route: string;
  position: number;
  hasSubMenu: boolean;
  subMenu: UserMenuStateModel[];
  permissions: string[];
}

export interface UserMenuModel {
  list: UserMenuStateModel[];
  activeMenu: UserMenuActiveStateModel[];
  activeMenuItem: UserMenuActiveStateModel;
}

@State<UserMenuModel>({
  name: 'userMenu',
  defaults: {
    activeMenu: [],
    list: [],
    activeMenuItem: {
      hasSubMenu: false,
      subMenu: [],
      route: '',
      position: 0,
      permissions: [],
      hasParent: false,
      iconName: '',
      displayName: '',
      id: 0
    }
  },

})
@Injectable()
export class UserMenuState {
  constructor(private _service: UserProfileService) {
  }
  @Action(GetMenuList)
  getMenu(ctx: StateContext<UserMenuModel>) {
    return ctx.dispatch(new ApiLoadingStart('get-menu')).pipe(
      switchMap(() => this._service.getMenu()),
      tap((resp) => {
        const state = produce(ctx.getState(), draft => {
          draft.activeMenu = new Array<UserMenuActiveStateModel>();
          draft.list = new Array<UserMenuStateModel>();
          resp.data.forEach((item: UserMenuStateModel) => {
            let listItem: UserMenuStateModel = {
              id: item.id,
              displayName: item.displayName,
              hasSubMenu: item.hasSubMenu,
              iconName: item.iconName,
              permissions: item.permissions,
              position: item.position,
              route: item.route,
              subMenu: item.subMenu
            } as UserMenuStateModel;
            draft.list.push(listItem);

            let activeItem: UserMenuActiveStateModel = {
              id: item.id,
              displayName: item.displayName,
              hasSubMenu: item.hasSubMenu,
              iconName: item.iconName,
              permissions: item.permissions,
              position: item.position,
              route: item.route,
              subMenu: item.subMenu,
              hasParent: false
            };
            draft.activeMenu.push(activeItem);
          });
        });
        ctx.setState(state);
      }),
      mergeMap(() => {
        return ctx.dispatch(new ApiLoadingSuccess('get-menu'));
      }),
      catchError(err => {
        console.log(err);
        return ctx.dispatch(new ApiLoadingError('get-menu', Utilities.handleError(err)))
      })
    );
  }

  @Action(SetCurrentMenu)
  setCurrentMenu(ctx: StateContext<UserMenuModel>, action: SetCurrentMenu) {
    const currentState = ctx.getState();
    if (action.goBack) {
      const activeMenu = currentState.list.map((item) => {
        return {
          id: item.id,
          hasSubMenu: item.hasSubMenu,
          displayName: item.displayName,
          iconName: item.iconName,
          hasParent: false,
          permissions: item.permissions,
          position: item.position,
          route: item.route,
          subMenu: item.subMenu
        } as UserMenuActiveStateModel;
      });
      ctx.patchState({
        activeMenu: activeMenu
      });
      return;
    }
    const menuItem = currentState.list.find(x => x.id == action.item.id);
    if (menuItem.hasSubMenu) {
      const activeMenu = menuItem.subMenu.map((item) => {
        return {
          id: item.id,
          hasSubMenu: item.hasSubMenu,
          displayName: item.displayName,
          iconName: item.iconName,
          hasParent: menuItem.hasSubMenu,
          permissions: item.permissions,
          position: item.position,
          route: item.route,
          subMenu: item.subMenu
        } as UserMenuActiveStateModel;
      });
      console.log('Active Menu: ', activeMenu);
      ctx.patchState({
        activeMenu: activeMenu
      });
    }
  }

  @Action(SetActiveMenuItem)
  setActiveMenuItem(ctx: StateContext<UserMenuModel>, action: SetActiveMenuItem) {
    ctx.patchState({
      activeMenuItem: action.item
    });
  }

  @Action(ClearActiveMenuItem)
  clearActiveMenuItem(ctx: StateContext<UserMenuModel>) {
    const activeMenuItem = {
      hasSubMenu: false,
      subMenu: [],
      route: '',
      position: 0,
      permissions: [],
      hasParent: false,
      iconName: '',
      displayName: '',
      id: 0
    } as UserMenuActiveStateModel;

    ctx.patchState({
      activeMenuItem: activeMenuItem
    });
  }

  @Selector()
  static getActiveMenu(state: UserMenuModel) {
    return state.activeMenu;
  }

  @Selector()
  static getActiveMenuItem(state: UserMenuModel) {
    return state.activeMenuItem;
  }

  @Selector()
  static getCurrentPermissions(state: UserMenuModel) {
    return state.activeMenuItem.permissions;
  }


}
