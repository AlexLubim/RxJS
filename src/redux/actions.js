'use strict';
import {TAKEUSER, CLICKREFRESH,INFOUSER,NEWUSER} from './types.js';


const actionTakeUser = () => {
  return function(dispatch){
    (async ()=>{
      try{
        const user = await fetch('https://api.github.com/users');
        const result = await user.json();
        dispatch({type: TAKEUSER,payload:result});
      }catch(err){
        alert(err);
      }
    })();
  };
};

const actionRefresh = () => {
  return {
    type:CLICKREFRESH
  };
};

const infoUser = (user) => {
  return function(dispatch){
    (async ()=>{
      try{
        const infoUser = await fetch(`https://api.github.com/users/${user.login}`);
        const result = await infoUser.json();
        dispatch({type: INFOUSER,payload:result});
      }catch(err){
        alert(err);
      }
    })();
  };
};

const actionNewUser = () =>{
  return{
    type: NEWUSER
  };
};

export {
  actionTakeUser,
  actionRefresh,
  infoUser,
  actionNewUser
};
