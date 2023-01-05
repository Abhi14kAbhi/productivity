import actions from './actions';
type ProductivityAction = {
  type: string;
  payload: any;
};
export const reducer = (state: any, action: ProductivityAction): any => {
  switch (action.type) {
    case actions.SET_FCM_TOKEN:
      return {
        ...state,
        fcmToken: action.payload.fcmToken,
      };
    case actions.SET_DATE_AND_TIME:
      const date = action.payload.date;
      date.setHours(0, 0, 0, 0);
      return {
        ...state,
        selectedDate: date,
        startTime: date.setHours(0, 0, 0, 0) / 1000,
      };
    default:
      return state;
  }
};
