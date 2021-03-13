'use strict';
import {TAKEUSER, CLICKREFRESH,INFOUSER,NEWUSER} from './types.js';


const actionTakeUser = () => {
  return function(dispatch){
    (async ()=>{
      try{
        const user = await fetch('https://api.github.com/users');
        const result = await user.json();
        result.map(async (item)=>{
          try{
            const info = await fetch(`https://api.github.com/users/${item.login}`);
            const infoResult = await info.json();
            dispatch({type: TAKEUSER,payload:infoResult});
          }catch(err){
            alert(err);
          }
        });
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
const actionNewUser = () =>{
  return{
    type: NEWUSER
  };
};

export {
  actionTakeUser,
  actionRefresh,
  actionNewUser
};
