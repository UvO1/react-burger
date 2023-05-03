export const CHANGE_TAB: 'CHANGE_TAB' = 'CHANGE_TAB';
export const RESET_TAB: 'RESET_TAB' = 'RESET_TAB';

export interface IChangeTab {
    readonly type: typeof CHANGE_TAB;
    readonly activeTab: "one" | "two" | "three";
}

export interface IResetTab{
    readonly type: typeof RESET_TAB;
    readonly activeTab: "one" | "two" | "three";
}

export type TTabs = IChangeTab | IResetTab;