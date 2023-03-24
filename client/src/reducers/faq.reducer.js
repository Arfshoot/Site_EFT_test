import { GET_FAQ } from "../actions/faq.action";

const initialState = [];

export default function faqReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FAQ:
      return action.payload;
    default:
      return state;
  }
}
