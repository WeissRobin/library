//DOM elements
const new_book_btn = document.getElementById('new-book-btn');
const book_form = document.getElementById('book-form');
const book_list = document.getElementById('book-list');
const book_show = document.getElementById('show-book-btn');

//JS Code
let myLibrary = [];

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
    booksDisplay();
}

//Adds a book to an array
function addBookToLibrary(book) {
    myLibrary.push(book);
}

//Looping through books and displaying them
function booksDisplay() {
    book_list.innerHTML = '';

    for (let i = 0; i < myLibrary.length; i++) {
        //Init of components
        const change_button = document.createElement('button');
        const remove_button = document.createElement('button');
        change_button.textContent = 'Change Status';
        remove_button.textContent = 'Remove Book';
        let book_li = document.createElement('li');

        //Set data atribute to each book - setting index for them
        book_li.setAttribute('data-book-index', [i]);

        book_li.innerText += `Title: ${myLibrary[i].title}
        Author: ${myLibrary[i].author}
        Pages: ${myLibrary[i].pages}
        Already read: ${myLibrary[i].isRead}
        `
        book_list.appendChild(book_li);
        book_list.appendChild(change_button);
        book_list.appendChild(remove_button);
        //Event listener for change button
        change_button.addEventListener('click', (e) => { 
            const index = e.target.previousSibling.getAttribute('data-book-index');
            myLibrary[index].changeStatus();
        });
        //Event listener for remove book
        remove_button.addEventListener('click', (e) => { 
            const index = e.target.previousSibling.getAttribute('data-book-index');
            myLibrary.splice(index, 1);
            booksDisplay();
        });
    }
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

//Shows the form after clicking on a button
function ShowForm() {
    book_form.style.display = 'flex';
}

//EVENT LISTENERS-------------------------------------------------------------
//Click - Displays book form
new_book_btn.addEventListener('click', ShowForm);

//Submit - Sends data
book_form.addEventListener('submit', (e) => {
    e.preventDefault();
    //Getting data from form elements
    const title = document.querySelector('[name="book-title"]').value;
    const author = document.querySelector('[name="book-author"]').value;
    const pages = document.querySelector('[name="book-pages"]').value;
    const isRead = getRadioValue();

    //Init new book
    const newBook = new Book(title, author, pages, isRead);

    //Adding a new book
    addBookToLibrary(newBook);
});

//Change the status of read property

book_show.addEventListener('click', booksDisplay);