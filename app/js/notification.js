const notification = document.querySelector('.notification');

function showNotification(className, message, type, icon) {
    notification.addEventListener('animationend', () => {
        notification.style.display = 'none';
        notification.classList.remove(className);
    });
    notification.textContent = '';
    const i = document.createElement('i');
    i.classList.add(type);
    i.classList.add(icon);
    notification.classList.add(className);
    notification.append(i);
    notification.append(message);
    notification.style.display = 'block';
}

export { showNotification }