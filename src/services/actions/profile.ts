export const CHANGE_MENU: "CHANGE_MENU" = "CHANGE_MENU";

export interface IChangeMenu {
    readonly type: typeof CHANGE_MENU;
    readonly isActiveMenu: 'profile' | 'orders' | 'constructor';
}