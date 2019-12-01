import { combineReducers } from 'redux';

import errors from './errorsReducer';
import ideaReducer from './ideaReducer';
import loginMode from './loginModeReducer';
import page from './pageReducer';
import pollReducer from './pollReducer';
import user from './userReducer';
import voteReducer from './voteReducer';


// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  ideaReducer,  // Stores ideaList
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  page, // Tracking pages on in the Make Poll path
  pollReducer,  // Stores the Poll properties
  user, // will have an id and username if someone is logged in
  voteReducer,  // Stores the vote array and winner
});

// This is imported in index.js as rootSaga
export default rootReducer;
