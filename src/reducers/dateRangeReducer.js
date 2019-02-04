export default (state=null, action) => {
  if (action.type === 'SET_DATE_RANGE') {
    return {
      fromDate: action.payload.fromDate,
      toDate: action.payload.toDate,
    };
  }
  return state;
};
