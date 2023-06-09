let myLibrary = [];

function booksDisplay() {
    const book_list = document.getElementById('book-list');
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

export { booksDisplay, myLibrary }