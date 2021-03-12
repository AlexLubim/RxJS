'use strict';

import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {reducer} from '../redux/reducer.js';
import {actionTakeUser,actionRefresh,infoUser,actionNewUser} from '../redux/actions.js';
import { composeWithDevTools } from 'redux-devtools-extension';


const templateWidget = document.querySelector('.templateWidget').content;
const widgetUserList = document.querySelector('.widget__content');
const footer = document.querySelector('.widget__footer');
// const oldUsers = document.querySelectorAll('.widget__item');

const store = createStore(
  reducer,
  {
    users:[],
    usersWidget:[]
  },
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

function addListinerToTransform(user){
  user.querySelector('.arrowTarget').addEventListener('mouseover',() => {
    user.style.transform = 'translateX(-108px)';
  });
  user.querySelector('.arrowTarget').addEventListener('mouseout',() => {
    user.style.transform = 'translateX(0)';
  });
  user.querySelector('.deleteUser').addEventListener('click',() => {
    user.remove();
    store.dispatch(actionNewUser());
  });
}

store.subscribe(()=>{
  const state = store.getState();
  state.usersWidget.forEach(item => {
    
    const newWidgetUser = templateWidget.cloneNode(true);
    newWidgetUser.querySelector('.githubUser').href = item.html_url;
    newWidgetUser.querySelector('.githubUser__avatar').src = item.avatar_url;
    newWidgetUser.querySelector('.githubUser__login').textContent = `@${item.login}`;

    // newWidgetUser.querySelector('.address__text').textContent = state.user.location;
    // newWidgetUser.querySelector('.githubUser__name').textContent = state.user.name; 

    // store.dispatch(infoUser(item));
    addListinerToTransform(newWidgetUser.lastElementChild);
    widgetUserList.append(newWidgetUser);
  });
});

store.dispatch(actionTakeUser());

footer.addEventListener('click',()=>{   //refresh
  store.dispatch(actionRefresh());
});  

