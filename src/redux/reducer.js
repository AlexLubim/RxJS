'use strict';
import {TAKEUSER,CLICKREFRESH,INFOUSER,NEWUSER} from './types.js';
import {deleteAndRefreshUser} from '../app/refresh';


export function reducer(state,action){
  switch(action.type){
    case TAKEUSER :
      return {
        ...state,
        users: [...state.users,action.payload]
      };
    case CLICKREFRESH:
      return {
        ...state,
        usersWidget: refresh(state)
      };
    case INFOUSER:
      return {
        ...state,
        usersWidget:[...state.usersWidget,action.payload]
      };
    case NEWUSER:
      return {
        ...state,
        usersWidget:  [newUser(state)]
      };
    default:
      return state;
  }
}
function refresh(state){
  const quantityUsers = state.users.length;
  deleteAndRefreshUser();
  let arrThirdRandomUsers = [];
  for(let i=0;i<3;i++){
    arrThirdRandomUsers = [...arrThirdRandomUsers,state.users[Math.round(Math.random()*quantityUsers)]];
  }
  return arrThirdRandomUsers;
}

function newUser(state){
  const quantityUsers = state.users.length;
  return  state.users[Math.round(Math.random()*quantityUsers)];
}

