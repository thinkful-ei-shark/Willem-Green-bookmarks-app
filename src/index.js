import $ from 'jquery';
import api from './scripts/api';

import store from './scripts/store';

import generate from './scripts/generate';


function main(){
    api.getBookmarks()
    .then((items) => {
      items.forEach((item) => store.addItem(item));
      generate.render();
    });
    generate.render();
    generate.bindEventListeners();
    
}

$(main)