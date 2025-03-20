const username = localStorage.getItem('name');
if (!username) {
    window.location.replace('/');
    throw new Error('No username found');
}

const lblStatusOnline = document.querySelector('#status-online');
const lblStatusOffline = document.querySelector('#status-offline');
const usersUlElement = document.querySelector('.connection-info ul');
const form = document.querySelector('.input-form');
const input = document.querySelector('.input-form input');
const chatElement = document.querySelector('#chat');
const backButton = document.querySelector('.back-button');
const connectionInfo = document.querySelector('.connection-info');

backButton.addEventListener('click', () => {
    connectionInfo.classList.toggle('hidden');
});

const renderUsers = (users) => {
    usersUlElement.innerHTML = '';
    users.forEach((user) => {
        const liElement = document.createElement('li');
        liElement.innerText = user.name;
        usersUlElement.appendChild(liElement);
    });
}

const renderMessage = (payload) => {
    const { userId, message, name } = payload;

    const divElement = document.createElement('div');
    divElement.classList.add('message');
    
    if (userId !== socket.id) {
        divElement.classList.add('incoming');
    }

    divElement.innerHTML = `
        <small>${name}</small>
        <p>${message}</p>
        <span class="message-time">${getCurrentTime()}</span>
    `;

    chatElement.appendChild(divElement);

    chatElement.scrollTop = chatElement.scrollHeight;
}

function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const message = input.value.trim();
    
    if (!message) return;
    
    input.value = '';
    
    socket.emit('send-message', message);
});

const socket = io({
    auth: {
        token: 'ABC-123',
        name: username
    }
});

socket.on('connect', () => {
    lblStatusOnline.classList.remove('hidden');
    lblStatusOffline.classList.add('hidden');
    
    document.querySelector('.contact-details .name').textContent = 'Chat Grupal';
    document.querySelector('.contact-details .status').textContent = 'en línea';
});

socket.on('disconnect', () => {
    lblStatusOffline.classList.remove('hidden');
    lblStatusOnline.classList.add('hidden');
    
    document.querySelector('.contact-details .status').textContent = 'desconectado';
});

socket.on('welcome-message', (data) => {
    console.log({ data });
});

socket.on('on-clients-changed', renderUsers);
socket.on('on-message', renderMessage);
