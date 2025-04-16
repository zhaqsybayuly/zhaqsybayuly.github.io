document.getElementById('chat-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const userInput = document.getElementById('user-input').value;
    const chatMessages = document.getElementById('chat-messages');

    const userMessage = document.createElement('div');
    userMessage.className = 'user-message';
    userMessage.textContent = userInput;
    chatMessages.appendChild(userMessage);

    try {
        const response = await fetch('https://informatics-chatbot.onrender.com/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question: userInput })
        });
        const data = await response.json();
        const botMessage = document.createElement('div');
        botMessage.className = 'bot-message';
        botMessage.textContent = data.response || 'Қате: Сервер жауап бермеді.';
        chatMessages.appendChild(botMessage);
    } catch (error) {
        const botMessage = document.createElement('div');
        botMessage.className = 'bot-message';
        botMessage.textContent = 'Қате: Серверге қосылу мүмкін емес.';
        chatMessages.appendChild(botMessage);
    }

    document.getElementById('user-input').value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;
});
