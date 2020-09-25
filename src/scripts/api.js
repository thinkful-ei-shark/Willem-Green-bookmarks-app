import { post } from 'jquery';
import generate from './generate'

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/WillemGreen/bookmarks'

async function getBookmarks() {
    try {
        const res = await fetch(BASE_URL);
        const data = await res.json()
        return data;

    } catch(err) {
        console.log(err);
    }
}

async function postBookmark(title, url, rating) {
    let newBookmark = JSON.stringify({title:title, url:url, rating:rating})
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: newBookmark
        });
        const data = await res.json()
        return data;

    } catch(err) {
        console.log(err);
    }
}






export default {
    getBookmarks,
    postBookmark
}