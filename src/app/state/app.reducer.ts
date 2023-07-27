// app.reducer.ts

import { Action, createReducer, on } from '@ngrx/store';
import { increment, decrement } from '../state/app.actions';

export const initialState = 0;

const _appReducer = createReducer(
  initialState,
  on(increment, state => state + 1),
  on(decrement, state => state - 1)
);

export function appReducer(state: number | undefined, action: Action) {
  return _appReducer(state, action);
}
