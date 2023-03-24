import { combineReducers } from 'redux';

import userReducer from './user.reducer.js';
import usersReducer from './users.reducer.js';
import postReducer from './post.reducer.js';
import faqReducer from './faq.reducer.js';

export default combineReducers({
  userReducer,
  usersReducer,
  postReducer,
  faqReducer

});