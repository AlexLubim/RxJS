'use strict';



export function deleteAndRefreshUser(){
  const users = document.querySelectorAll('.widget__item');
  users.forEach(item => {
    item.remove();
  });
}





