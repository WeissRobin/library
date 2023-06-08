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
}

//Adds a book to an array
function addBookToLibrary(book) {
    myLibrary.push(book);
}

//Looping through books and displaying them
function booksDisplay() {
    book_list.innerHTML = '';

    for (let i = 0; i < myLibrary.length; i++) {
        //Init of buttons
        const button_container = document.createElement('div');
        const change_button = document.createElement('button');
        const remove_button = document.createElement('button');
        change_button.classList.add('change-btn');
        remove_button.classList.add('remove-btn');
        change_button.textContent = 'Change Status';
        remove_button.textContent = 'Remove Book';

        //Init of buttons container
        button_container.classList.add('buttons-card-body');
        button_container.appendChild(change_button);
        button_container.appendChild(remove_button);

        //Init li element for ul element
        const book_li = document.createElement('li');

        //Init book heading
        const book_heading = document.createElement('h2');
        book_heading.innerText = `Title: ${myLibrary[i].title}`;
        book_li.appendChild(book_heading);
        //Init book body
        //Set data atribute to each book - setting index for them
        book_li.setAttribute('data-book-index', [i]);
        book_li.classList.add('book-list-card');

        //Init book body
        const book_body = document.createElement('div');
        book_body.classList.add('book-card-body');
        book_body.innerText = `Author: ${myLibrary[i].author}
        Pages: ${myLibrary[i].pages}
        Already read?: ${myLibrary[i].isRead}
        `;
        //Append book component into DOM
        book_li.appendChild(book_heading);
        book_li.appendChild(book_body);
        book_li.appendChild(button_container);
        book_list.appendChild(book_li);

        //Event listener for change button
        change_button.addEventListener('click', (e) => {
            const index = e.target.parentElement.parentElement.getAttribute('data-book-index');
            myLibrary[index].changeStatus();
            booksDisplay();
        });
        //Event listener for remove book
        remove_button.addEventListener('click', (e) => { 
            const index = e.target.parentElement.getAttribute('data-book-index');
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

//EVENT LISTENERS-------------------------------------------------------------

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

book_show.addEventListener('click', booksDisplay);