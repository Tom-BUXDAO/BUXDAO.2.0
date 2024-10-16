console.log('Script loaded');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');

    const loginButton = document.getElementById('log-in');
    const loginModal = document.getElementById('login-modal');
    const loginForm = document.getElementById('login-form');
    const balanceDisplay = document.getElementById('balance');
    const gameLobby = document.getElementById('inner-game-lobby');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    
    let currentUser = null;

    if (loginButton && loginModal && loginForm && balanceDisplay && gameLobby && chatForm && chatInput && chatMessages) {
        console.log('All elements found');

        loginButton.addEventListener('click', () => {
            if (currentUser) {
                // Log out
                console.log('Logging out');
                currentUser = null;
                loginButton.textContent = 'LOG IN';
                balanceDisplay.textContent = 'BALANCE: 0 $BUX';
                gameLobby.innerHTML = '';
            } else {
                // Show login modal
                console.log('Login button clicked');
                loginModal.style.display = 'flex';
            }
        });

        loginForm.addEventListener('submit', (event) => {
            console.log('Form submit event triggered');
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            console.log(`Login attempted with username: ${username}`);
            
            // Simulate login without server request
            if (username && password) {
                console.log('Login successful');
                currentUser = username;
                loginModal.style.display = 'none';
                loginButton.textContent = 'LOG OUT';
                balanceDisplay.textContent = `BALANCE: 37,481 $BUX`;
                updateLobby(username);
            } else {
                console.log('Invalid credentials');
                alert('Invalid credentials');
            }
        });

        // Chat functionality
        chatForm.addEventListener('submit', (event) => {
            event.preventDefault();
            if (currentUser && chatInput.value.trim() !== '') {
                addChatMessage(currentUser, chatInput.value.trim());
                chatInput.value = '';
            } else if (!currentUser) {
                alert('Please log in to use the chat.');
            }
        });
    } else {
        console.log('Some elements not found');
    }

    function updateLobby(username) {
        gameLobby.innerHTML = `
            <h2>Welcome, ${username}!</h2>
            <div id="game-options">
                <button id="create-game">Create Game</button>
                <button id="join-game">Join Game</button>
            </div>
            <div id="game-list"></div>
        `;

        const createGameButton = document.getElementById('create-game');
        const joinGameButton = document.getElementById('join-game');

        createGameButton.addEventListener('click', () => {
            console.log('Create game clicked');
            // Open index.html in the same window
            window.location.href = 'index.html';
        });

        joinGameButton.addEventListener('click', () => {
            console.log('Join game clicked');
            alert('Joining game...');
        });
    }

    function addChatMessage(user, message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message';
        messageElement.innerHTML = `<strong>${user}:</strong> ${message}`;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});
