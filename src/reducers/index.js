import { combineReducers } from 'redux';

const userReducer = (user=null, action) => {
  if (action.type === 'SET_USER') {
    return action.payload.user;
  }
  return user;
}

const songsReducer = () => {
  return [
    { title: 'No Scrubs', duration: '4:05' },
    { title: 'Macarena', duration: '2:30' },
    { title: 'All Star', duration: '3:15' },
    { title: 'I Want it That Way', duration: '1:45' }
  ];
};


export default combineReducers({
  songs: songsReducer,
  user: userReducer
});