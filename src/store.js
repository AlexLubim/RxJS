// 'use strict';

// export function createStore(reducer,initialState){
//   let state = reducer(initialState,{type:'INITSTATE'});
//   const subscribers = [];
//   return {
//     dispatch(action) {
//       state = reducer(state,action);
//       subscribers.forEach(sub => {sub();});
//     },
//     subscribe(callback){
//       subscribers.push(callback);
//     },
//     getState(){
//       return state;
//     }
//   };
// }