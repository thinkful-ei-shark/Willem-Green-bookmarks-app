import $ from "jquery";
import style from "../style.css";
import api from "./api";
import store from './store';

function generateMainPage(){
    const mainPage = `
        <h1>
            My Bookmarks
        </h1>
        <div class = "group">
            <div class = "item">
                <form id ="add-bookmark">
                <button type = "submit">New</button>
                </form>
            </div>
            <form id="filter-form">
            <div class ="item">
                <select name="filter" id="filter-button">
                    <option id="filter1">Show 1+</option>
                    <option id="filter2">Show 2+</option>
                    <option id="filter3">Show 3+</option>
                    <option id="filter4">Show 4+</option>
                    <option id="filter5">Show 5</option>
                </select>
            </div>
        <div class"item"
            <input type="submit" value="Filter">
        </div>
        </form>
        </div>`
        return mainPage;
};

function generateBookmarkItem(bookmark){
    let bookmarkTitle = `<span class ="item" >${bookmark.title}</span>`;
    const bookmarkItem = `<li><div class="top-row"
    <div class="ind-bookmark group" data-item-id="${bookmark.id}">
      ${bookmarkTitle}
      <p class = "item">${bookmark.rating}</p>
      </div>
      </div>
      <div class="bottom-row hidden">
      <a href ="${bookmark.url}">Visit Site</a>
      <p>${bookmark.desc}</p>
      <button type = "submit id="delete">Delete</button>
      </div>
    </li>`;
    return bookmarkItem;
}

function generateBookmarkString(bookmarkList){
    const pageHead = generateMainPage();
    const list = bookmarkList.map((item) => generateBookmarkItem(item));
    const items = pageHead + list;
  return items;
}

function handleNewButton(){
    $('main').on('submit', '#add-bookmark', function(e){
        e.preventDefault();
        store.store.adding = true;
        render();

    })
}

function generateAddPage(){
    const addPage = 
    `<h1>
    My Bookmarks
</h1>
<div>
<form id ="add-bookmark-form">
  <label for ="url">Url Here</label>
  <input type ="text" id="url" name="url" placeholder="put url here" required>
  <label for = "name">Name</label>
  <input type="text" placeholder="Nickname" name="name" id="name" required>
  <label for = "rating">Rating</label>
  <input type="text" placeholder="rating 1-5" name="rating" id="rating">
  <label for="desc">Description</label>
  <textarea name="desc" rows="4"></textarea>
  <button type ="submit">Add Bookmark</button>
</form>
</div>`
    return addPage;
}


function getIdFromElement(item){
    return $(item)
        .closest('ind-bookmark group')
        .data('data-item-id')
}


function handleExpandButton(){
    $('main').on('click', 'li',function(e){
        $(this).children('.bottom-row').toggleClass('hidden');
    });
};

function handleBookmarkSubmit(){
    $('main').on('submit', '#add-bookmark-form', function(e){
        e.preventDefault();
        let urlName = $('#url').val();
        $('#url').val('');
        let name = $('#name').val();
        $('#name').val('');
        let rating = $('#rating').val();
        $('#rating').val('');
        api.postBookmark(name, urlName, rating)
        .then((data)=> {
            store.addItem(data);
            store.store.adding = false;
            render();
        });
    });
};

function render(){
    let bookmarksCall = store.store.bookmarks;
    let page = '';
    if(store.store.adding === false){
        page += generateBookmarkString(bookmarksCall);
    } else {
        page += generateAddPage();
    };
    $('main').html(page);
}

function bindEventListeners(){
    handleBookmarkSubmit();
    handleNewButton();
    handleExpandButton();

}

export default {
    bindEventListeners,
    render
}