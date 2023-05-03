import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
  } from 'react-redux';
  import { Dispatch } from 'redux';
  import { TProjectActions } from './actions';
  import { RootState } from '..';

  export type TAppDispatch = Dispatch<TProjectActions>;
  export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
  export const useDispatch = () => dispatchHook<TAppDispatch>();