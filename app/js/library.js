import { booksDisplay, myLibrary } from "./books.js";
import { showNotification } from "./notification.js";

const book_form = document.getElementById('book-form');
const book_show = document.getElementById('show-book-btn');

//Book Constructor
function Book(author, title, pages, isRead) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.isRead = isRead;
}

//Book function that reads status and changes it.
Book.prototype.changeStatus = function() {
    this.isRead == 'Yes' ? this.isRead = 'No' : this.isRead = 'Yes';
}

//Adds a book to an array
function addBookToLibrary(book) {
    myLibrary.push(book);
}

//Get the value of radio button
function getRadioValue() {
    let value;
    const book_radio_buttons = document.getElementsByName('book-read');
    book_radio_buttons.forEach(
        (element) => { 
        if(element.checked) {
            value = element.value;
        }});
    return value;
}

//EVENT LISTENERS-------------------------------------------------------------
//Submit - Sends data
book_form.addEventListener('submit', (e) => {
    e.preventDefault();
    //Getting data from form elements
    const title = document.querySelector('[name="book-title"]').value;
    const author = document.querySelector('[name="book-author"]').value;
    const pages = document.querySelector('[name="book-pages"]').value;
    const isRead = getRadioValue();

    if(title == '' || author == "" || pages == "") {
        showNotification('warning', 'You have to fill up all fields.', 'fa-solid', 'fa-xmark');
    }
    else {
        showNotification('success', 'Book has been added.', 'fa-solid', 'fa-check');
        const newBook = new Book(title, author, pages, isRead);
        addBookToLibrary(newBook);
    }
});

book_show.addEventListener('click', booksDisplay);