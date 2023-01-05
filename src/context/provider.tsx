import React, {useReducer, useMemo} from 'react';

import {reducer} from './reducer';
import {ProductivityContextProps, ProductivityState, Props} from './types';

const currentDate = new Date();
currentDate.setHours(0, 0, 0, 0);

const INITIAL_STATE: ProductivityState = {
  fmcToken: undefined,
  selectedDate: currentDate,
  startTime: currentDate.setHours(0, 0, 0, 0) / 1000,
};

export const Context = React.createContext({} as ProductivityContextProps);

export function ProductivityProvider({children}: Props) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const value = useMemo(() => {
    return {state, dispatch};
  }, [state]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
