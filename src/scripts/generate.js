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
    let bookmarkTitle = `<button class ="item" type="submit"id="expand-button">${bookmark.title}</button>`;
    const bookmarkItem = `
    <div class="ind-bookmark group" data-item-id="${bookmark.id}">
      ${bookmarkTitle}
      <p class = "item">${bookmark.rating}</p>
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
  <input type ="text" id="url" name="url"placeholder="put url here">
  <label for = "name">Name</label>
  <input type="text" placeholder="Nickname" name="name" id="name">
  <label for = "rating">Rating</label>
  <input type="text" placeholder="rating 1-5" name="rating" id="rating">
  <button type ="submit">Add Bookmark</button>
</form>
</div>`
    return addPage;
}

function generateExpandedPage(bookmark){
    const expandedPage =`<h1>
    My Bookmarks
</h1>
<div class ="group">
<button type = "submit" class="add-bookmark">New</button>
<form>
<select name="filter" id="filter-button">
    <option id="filter1">Show 1+</option>
    <option id="filter2">Show 2+</option>
    <option id="filter3">Show 3+</option>
    <option id="filter4">Show 4+</option>
    <option id="filter5">Show 5</option>
</select>
<input type="submit" value="Filter">
</form>
</div>
<div>
<form class ="add-bookmark-form">
  <label for ="url">Url Here</label>
  <input type ="text" id="url" name="url"placeholder="put url here">
  <label for = "name">Name</label>
  <input type="text" placeholder="Nickname" name="name" id="name">
  <button type ="submit">Add Bookmark</button>
</form>
</div>
<div>
    <h3>
        ${bookmark.title}
    </h3>
    <button type ="submit" id="site-link">Visit Site</button>
    <p>
        ${bookmark.rating}
    </p>

    <p>
        ${bookmark.desc}
    </p>
</div>
`
    return expandedPage;
}

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
        })
    })
}

function handleExpandButton(){
    $('#expand-button').on('click', function(e){
        e.preventDefault();
        renderExpandedView();
    })
}

function renderExpandedView(){
    page= '';
    page += generateExpandedPage();
    $('main').html(page);
}

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