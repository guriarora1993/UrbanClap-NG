import { createReducer, on, Action } from '@ngrx/store';
import { addCart, removeCart, reset } from './app.actions';

export interface AppState {
  count: number;
}

const initialState: AppState = {
  count: parseInt(localStorage.getItem('counterState')!, 10) || 1,
};

const _serviceCartsReducer = createReducer(
  initialState,
  on(addCart, (state) => {
    const count = state.count + 1;
    localStorage.setItem('counterState', count.toString());
    return { count };
  }),
  on(removeCart, (state) => {
    const count = state.count - 1;
    localStorage.setItem('counterState', count.toString());
    return { count };
  }),
  on(reset, () => {
    const count = 1;
    localStorage.setItem('counterState', count.toString());
    return { count };
  })
);

export function serviceCartsReducer(state: AppState | undefined, action: Action) {
  return _serviceCartsReducer(state, action);
}
