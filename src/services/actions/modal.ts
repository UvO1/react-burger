export const OPEN_MODAL: 'OPEN_MODAL' = 'OPEN_MODAL';
export const CLOSE_MODAL: 'CLOSE_MODAL' = 'CLOSE_MODAL';

interface IOpenModal{
    readonly type: typeof OPEN_MODAL;
    readonly isOpen?: boolean;
}

interface ICloseModal{
    readonly type: typeof CLOSE_MODAL;
    readonly isOpen?: boolean;
}

export type TModal = IOpenModal | ICloseModal;