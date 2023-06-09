const modalBook = document.getElementById('modal-book-form');
const newBookBtn = document.getElementById('new-book-btn');
const closeBookBtn = document.getElementById('close-book-btn');
const modalBox = document.querySelector('#modal-box');
const notification = document.querySelector('.notification');

newBookBtn.addEventListener('click', () => {
    modalBox.setAttribute('data-active', 'true');
    modalBook.showModal();
});

closeBookBtn.addEventListener('click', () => {
    modalBox.setAttribute('data-active', 'false');
    modalBook.close();
});