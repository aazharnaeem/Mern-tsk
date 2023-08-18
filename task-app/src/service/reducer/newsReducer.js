import { add, get, remove, update } from "../actionTypes/types"
//Other functins commented because we only need to get the news
const newsReducer = (state = [], action) => {
  switch (action.type) {
    case add:
        return state
    //   return [...state, action.payload];
    case get:

      return action.payload;
    case remove:
    return state
    //  return state.filter(task=> task.id !== action.payload);
    case update:
        return state
    //   return state.map(st => {
    //     if (st._id === action.payload._id) {
    //       return { ...st, todo: action.payload.todo };
    //     }
    //     return st;
    //   });
    default:
      return state;
  }
};

export default newsReducer;
