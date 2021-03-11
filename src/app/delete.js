'use strict';

import { fromEvent} from 'rxjs';
import {takeUser} from './app';

export function addListinerToDelete(user){
  fromEvent(user.querySelector('.arrowTarget'),'mouseover')
    .subscribe(()=>{
      user.style.transform = 'translateX(-108px)';
    });

  fromEvent(user.querySelector('.arrowTarget'),'mouseout')
  .subscribe(()=>{
    user.style.transform = 'translateX(0)';
  });

  fromEvent(user.querySelector('.deleteUser'),'click')
  .subscribe(()=>{
    user.remove();
    takeUser();
  });
}





