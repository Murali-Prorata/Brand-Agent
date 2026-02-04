document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('offerSearchInput');
    const enterButton = document.querySelector('.offer-enter');
    const pills = document.querySelectorAll('.offer-pill');

    const goToConversation = (question) => {
        const query = encodeURIComponent(question.trim());
        if (!query) return;
        window.location.href = `offer-conversation.html?q=${query}`;
    };

    if (input) {
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                goToConversation(input.value);
            }
        });
    }

    if (enterButton) {
        enterButton.addEventListener('click', () => {
            goToConversation(input.value);
        });
    }

    pills.forEach((pill) => {
        pill.addEventListener('click', () => {
            const question = pill.dataset.question || pill.textContent;
            goToConversation(question);
        });
    });
});
