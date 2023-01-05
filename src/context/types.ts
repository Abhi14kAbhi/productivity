export interface ProductivityState {
  fmcToken?: string;
  selectedDate: Date;
  startTime: number;
}
export interface Props {
  children: JSX.Element | JSX.Element[];
}
export interface ProductivityContextProps {
  state: any;
  dispatch: any;
}
