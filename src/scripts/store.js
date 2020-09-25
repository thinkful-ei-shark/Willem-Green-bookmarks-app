
  const store = {
    bookmarks: [],
    adding: false,
    error: null,
    filter: 0
  }


const addItem = function (item) {
  this.store.bookmarks.push(item);
};

const findAndDelete = function (id) {
  this.store.bookmarks = this.store.bookmarks.filter(currentItem => currentItem.id !== id);
};

export default {
  store,
  addItem,
  findAndDelete
}