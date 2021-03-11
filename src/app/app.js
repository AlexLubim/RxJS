'use strict';

import {fromEvent, Observable} from 'rxjs';
import {ajax} from 'rxjs/ajax/index.js';
import {addListinerToDelete} from './delete.js';

const templateWidget = document.querySelector('.templateWidget').content;
const widgetUserList = document.querySelector('.widget__content');

const obs$ = new Observable(observer =>{   //view first users
  observer.next(addAllUser());
});
obs$.subscribe();

function addUser(user){
  const stream$ = ajax.getJSON(`https://api.github.com/users/${user.login}`);
  stream$.subscribe(
    value => {
      const newWidgetUser = templateWidget.cloneNode(true);
      newWidgetUser.querySelector('.githubUser').href = user.html_url;
      newWidgetUser.querySelector('.githubUser__avatar').src = user.avatar_url;
      newWidgetUser.querySelector('.githubUser__login').textContent = `@${user.login}`;

      newWidgetUser.querySelector('.address__text').textContent = value.location;
      newWidgetUser.querySelector('.githubUser__name').textContent = value.name; 
      addListinerToDelete(newWidgetUser.lastElementChild);
      widgetUserList.append(newWidgetUser);
    },
    err => console.log(err)
  );
}

export function takeUser(){
  const ajax$ = ajax.getJSON(`https://api.github.com/users`);
  ajax$.subscribe(
    value => addUser(value[Math.round(Math.random()*30)]),
    err => console.log(err)
    );
  }

function addAllUser(){
  const oldUsers = document.querySelectorAll('.widget__item');
  oldUsers.forEach(item=>{
    item.remove();
  });
  for(let i = 0;i<3;i++){
    takeUser();
  }
}

fromEvent(document.querySelector('.widget__footer'),'click')  //refresh
  .subscribe(() =>{
    addAllUser();
  });

