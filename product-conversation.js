document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const question = params.get('q') || 'What should I know before traveling to Italy?';

    const conversationThread = document.getElementById('conversationThread');
    const relatedList = document.getElementById('relatedList');

    const responses = {
        best: "For Italy trips, the best time to visit is April–June or September–October for mild weather and fewer crowds. If you want the warmest weather with fewer lines, late September is a sweet spot—prices are lower than summer, the air is still warm, and attractions are easier to book. Kids are also back in school, making museums and monuments less crowded than summer holidays.\n\nPlan at least 2–3 months out to lock in better airfare and hotel selection. If you can travel mid-week, you'll often see the lowest fares and better room availability. Late spring is ideal for families because the weather is perfect and school holidays haven't started yet.",
        hotels: "For families, prioritize apartments or family-friendly hotels in walkable neighborhoods close to transit. Look for places that include breakfast, offer laundry access, and are within a 10–15 minute walk of a major metro or bus line. Many family-owned properties offer kitchen facilities which help with young kids' meal schedules.\n\nCentral areas in Rome (Trastevere or near Campo de' Fiori) and Florence (Oltrarno) reduce daily travel time and make mid-day breaks easier for kids. These neighborhoods have local restaurants, playgrounds, and less tourism pressure than the historic centers.",
        flights: "Direct flights to Rome are most frequent from major hubs like JFK, ATL, and BOS. Booking 2–3 months ahead often saves money, and mid-week departures are usually cheaper. Look for morning departures which often have lower prices and allow you to arrive early to adjust jet lag.\n\nIf you can, consider an open-jaw itinerary (arrive Rome, depart Venice) to avoid backtracking—this can save a full day of travel and often costs the same as a round trip. This routing makes better use of your vacation time and reduces travel fatigue for the family.",
        budget: "Set aside $2,400–$6,000 for a family of four depending on season, route, and flexibility. To reduce costs, target shoulder-season travel, fly Tuesday or Wednesday, and keep your lodging in central neighborhoods so you can walk more and spend less on taxis. Budget 30-40% for flights, 25-30% for lodging, 15-20% for meals, and 10-15% for activities and transit passes.\n\nA balanced budget usually includes flights, lodging, transit passes, museum tickets, and a daily food allowance. Don't forget to allocate funds for travel insurance and emergency reserves—these can prevent financial stress if travel plans change."
    };

    const chooseResponse = (text) => {
        const lower = text.toLowerCase();
        if (lower.includes('time') || lower.includes('best')) return responses.best;
        if (lower.includes('hotel') || lower.includes('stay')) return responses.hotels;
        if (lower.includes('flight') || lower.includes('rome')) return responses.flights;
        if (lower.includes('budget')) return responses.budget;
        return "Happy to help! Italy trips are easiest to plan by locking flights first, then choosing family-friendly neighborhoods and day trips.";
    };

    const relatedQuestions = [
        'Which cities are best for kids in Italy?',
        'How many days should we spend in Rome?',
        'What are family-friendly day trips from Florence?'
    ];

    const addMessage = (type, text) => {
        const message = document.createElement('div');
        message.className = `conversation-message ${type}`;

        const avatar = document.createElement('div');
        avatar.className = 'conversation-avatar';
        avatar.textContent = type === 'conversation-user' ? '👤' : '🤖';

        const bubble = document.createElement('div');
        bubble.className = 'conversation-bubble';
        text.split('\n\n').forEach((paragraph, index) => {
            const p = document.createElement('p');
            p.textContent = paragraph;
            if (index > 0) {
                p.style.marginTop = '10px';
            }
            bubble.appendChild(p);
        });

        message.appendChild(avatar);
        message.appendChild(bubble);
        conversationThread.appendChild(message);
    };

    addMessage('conversation-user', question);
    addMessage('conversation-agent', chooseResponse(question));

    relatedQuestions.forEach((item) => {
        const chip = document.createElement('button');
        chip.className = 'related-chip';
        chip.textContent = item;
        chip.addEventListener('click', () => {
            window.location.href = `product-conversation.html?q=${encodeURIComponent(item)}`;
        });
        relatedList.appendChild(chip);
    });

    const followupInput = document.getElementById('offerFollowupInput');
    const followupButton = document.querySelector('.offer-module .offer-enter');

    const submitFollowup = () => {
        const value = followupInput ? followupInput.value.trim() : '';
        if (!value) return;
        window.location.href = `product-conversation.html?q=${encodeURIComponent(value)}`;
    };

    if (followupInput) {
        followupInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                submitFollowup();
            }
        });
    }

    if (followupButton) {
        followupButton.addEventListener('click', submitFollowup);
    }
});
