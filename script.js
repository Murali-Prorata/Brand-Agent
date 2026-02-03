// Initialize the AI Agent module
document.addEventListener('DOMContentLoaded', function() {
    const anchorElement = document.getElementById('ai-agent-anchor');
    
    // Create the AI Agent Module
    const agentModule = createAgentModule();
    anchorElement.parentNode.insertBefore(agentModule, anchorElement);
    
    // Trigger animation when scrolling into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    observer.observe(agentModule);
    
    // Initialize chat functionality
    initializeChat();
});

function createAgentModule() {
    const module = document.createElement('div');
    module.className = 'ai-agent-module';
    module.innerHTML = `
        <div class="ai-agent-header">
            <div class="agent-logo">✈️</div>
            <div class="agent-branding">
                <h3>Delta Air Lines AI Guide</h3>
                <p>Your personal flight assistant • Powered by Gist ✨</p>
            </div>
        </div>
        <div class="ai-agent-body">
            <p class="agent-intro">Have specific questions about flight routes or baggage for Italy? Ask me anything.</p>
            
            <div class="chat-container" id="chatContainer">
                <div class="chat-message message-bot">
                    <div class="message-avatar">🤖</div>
                    <div class="message-content">
                        <p>Hi! I'm here to help you find the perfect flights to Italy. What would you like to know?</p>
                    </div>
                </div>
            </div>
            
            <div class="quick-replies" id="quickReplies">
                <button class="chip" data-question="best-time">
                    <span>📅</span> Best time to fly to Rome?
                </button>
                <button class="chip" data-question="family-deals">
                    <span>👨‍👩‍👧‍👦</span> Current deals for families?
                </button>
                <button class="chip" data-question="baggage">
                    <span>🧳</span> Baggage allowance info
                </button>
                <button class="chip" data-question="direct-flights">
                    <span>✈️</span> Direct flights available?
                </button>
            </div>
            
            <div class="chat-input-container">
                <input 
                    type="text" 
                    class="chat-input" 
                    id="chatInput" 
                    placeholder="Type your question here..."
                    autocomplete="off"
                />
                <button class="send-button" id="sendButton">Send</button>
            </div>
            
            <div class="cta-container" id="ctaContainer" style="display: none;">
                <a href="#" class="cta-button" id="bookButton">
                    Book this route on Delta.com →
                </a>
            </div>
        </div>
    `;
    
    return module;
}

function initializeChat() {
    const chatContainer = document.getElementById('chatContainer');
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');
    const quickReplies = document.querySelectorAll('.chip');
    const ctaContainer = document.getElementById('ctaContainer');
    
    // Predefined responses
    const responses = {
        'best-time': {
            text: "The best time to fly to Rome is typically during the shoulder seasons - April to June or September to October. During these months, you'll find:",
            details: [
                "• Lower ticket prices (20-30% cheaper than summer)",
                "• Pleasant weather in Italy",
                "• Fewer crowds at tourist sites",
                "• Better seat availability"
            ],
            media: {
                type: 'chart',
                prices: 'Average prices: Spring $450-650 | Summer $700-900 | Fall $500-700 | Winter $400-550'
            },
            showCTA: true
        },
        'family-deals': {
            text: "Great news! We have several family-friendly deals to Italy right now:",
            flight: {
                route: "New York (JFK) → Rome (FCO)",
                dates: "September 15-29, 2026",
                price: "$1,899",
                details: "for a family of 4",
                features: [
                    "✓ 2 free checked bags per person",
                    "✓ Free seat selection",
                    "✓ In-flight entertainment",
                    "✓ Complimentary meals & snacks"
                ]
            },
            showCTA: true
        },
        'baggage': {
            text: "Here's Delta's baggage policy for international flights to Italy:",
            details: [
                "✈️ <strong>Carry-on:</strong> 1 bag (22x14x9 inches) + 1 personal item",
                "🧳 <strong>Checked bags:</strong> 2 free bags up to 50 lbs each (Main Cabin)",
                "👶 <strong>Children under 2:</strong> 1 free checked bag + stroller/car seat",
                "⚖️ <strong>Extra baggage:</strong> $100-$200 per additional bag",
                "📦 <strong>Special items:</strong> Sports equipment may have additional fees"
            ],
            tip: "💡 Pro tip: Pack a change of clothes in your carry-on in case of delays!"
        },
        'direct-flights': {
            text: "Delta offers direct flights to Italy from several major US cities:",
            routes: [
                "🗽 New York (JFK) → Rome (FCO) - Daily",
                "🗽 New York (JFK) → Venice (VCE) - Seasonal (May-Oct)",
                "🏙️ Atlanta (ATL) → Rome (FCO) - Daily",
                "🌴 Boston (BOS) → Rome (FCO) - Seasonal",
                "🌉 Los Angeles (LAX) → Rome (FCO) - 5x weekly"
            ],
            note: "Flight times average 8-9 hours. All direct flights include meals and entertainment.",
            showCTA: true
        }
    };
    
    // Handle quick reply clicks
    quickReplies.forEach(chip => {
        chip.addEventListener('click', function() {
            const question = this.dataset.question;
            const questionText = this.textContent.trim();
            
            // Add user message
            addMessage(questionText, 'user');
            
            // Show typing indicator
            showTypingIndicator();
            
            // Simulate delay and show response
            setTimeout(() => {
                hideTypingIndicator();
                const response = responses[question];
                addBotResponse(response);
            }, 1500);
        });
    });
    
    // Handle send button
    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;
        
        addMessage(message, 'user');
        chatInput.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Simulate AI response
        setTimeout(() => {
            hideTypingIndicator();
            const response = generateResponse(message);
            addBotResponse(response);
        }, 1800);
    }
    
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message message-${sender}`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = sender === 'bot' ? '🤖' : '👤';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        
        const p = document.createElement('p');
        p.textContent = text;
        content.appendChild(p);
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    
    function addBotResponse(response) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message message-bot';
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = '🤖';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        
        // Add main text
        const p = document.createElement('p');
        p.textContent = response.text;
        content.appendChild(p);
        
        // Add details list if present
        if (response.details) {
            const detailsList = document.createElement('div');
            detailsList.style.marginTop = '10px';
            response.details.forEach(detail => {
                const detailP = document.createElement('p');
                detailP.innerHTML = detail;
                detailP.style.margin = '5px 0';
                detailsList.appendChild(detailP);
            });
            content.appendChild(detailsList);
        }
        
        // Add routes list if present
        if (response.routes) {
            const routesList = document.createElement('div');
            routesList.style.marginTop = '10px';
            response.routes.forEach(route => {
                const routeP = document.createElement('p');
                routeP.textContent = route;
                routeP.style.margin = '5px 0';
                routesList.appendChild(routeP);
            });
            content.appendChild(routesList);
            
            if (response.note) {
                const noteP = document.createElement('p');
                noteP.textContent = response.note;
                noteP.style.marginTop = '10px';
                noteP.style.fontStyle = 'italic';
                noteP.style.fontSize = '14px';
                content.appendChild(noteP);
            }
        }
        
        // Add flight card if present
        if (response.flight) {
            const flightCard = createFlightCard(response.flight);
            content.appendChild(flightCard);
        }
        
        // Add media if present
        if (response.media) {
            const mediaDiv = document.createElement('div');
            mediaDiv.className = 'message-media';
            mediaDiv.style.marginTop = '10px';
            mediaDiv.style.padding = '10px';
            mediaDiv.style.background = '#f0f0f0';
            mediaDiv.style.borderRadius = '8px';
            mediaDiv.style.fontSize = '14px';
            mediaDiv.textContent = response.media.prices;
            content.appendChild(mediaDiv);
        }
        
        // Add tip if present
        if (response.tip) {
            const tipP = document.createElement('p');
            tipP.textContent = response.tip;
            tipP.style.marginTop = '10px';
            tipP.style.padding = '10px';
            tipP.style.background = '#fff3cd';
            tipP.style.borderRadius = '8px';
            tipP.style.fontSize = '14px';
            content.appendChild(tipP);
        }
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
        
        // Show CTA if appropriate
        if (response.showCTA) {
            setTimeout(() => {
                ctaContainer.style.display = 'block';
                ctaContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 500);
        }
    }
    
    function createFlightCard(flight) {
        const card = document.createElement('div');
        card.className = 'flight-card';
        card.style.marginTop = '15px';
        
        const title = document.createElement('h4');
        title.textContent = flight.route;
        card.appendChild(title);
        
        const dates = document.createElement('p');
        dates.textContent = flight.dates;
        dates.style.color = '#666';
        dates.style.fontSize = '14px';
        dates.style.margin = '5px 0';
        card.appendChild(dates);
        
        const price = document.createElement('div');
        price.className = 'flight-price';
        price.textContent = flight.price;
        card.appendChild(price);
        
        const details = document.createElement('p');
        details.textContent = flight.details;
        details.style.fontSize = '14px';
        details.style.marginBottom = '10px';
        card.appendChild(details);
        
        flight.features.forEach(feature => {
            const featureP = document.createElement('p');
            featureP.textContent = feature;
            featureP.style.fontSize = '13px';
            featureP.style.margin = '3px 0';
            featureP.style.color = '#28a745';
            card.appendChild(featureP);
        });
        
        return card;
    }
    
    function showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'chat-message message-bot';
        indicator.id = 'typingIndicator';
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = '🤖';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        
        const typing = document.createElement('div');
        typing.className = 'typing-indicator';
        typing.innerHTML = '<span></span><span></span><span></span>';
        
        content.appendChild(typing);
        indicator.appendChild(avatar);
        indicator.appendChild(content);
        
        chatContainer.appendChild(indicator);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    
    function hideTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }
    
    function generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('cheap')) {
            return responses['family-deals'];
        } else if (lowerMessage.includes('bag') || lowerMessage.includes('luggage') || lowerMessage.includes('suitcase')) {
            return responses['baggage'];
        } else if (lowerMessage.includes('direct') || lowerMessage.includes('nonstop')) {
            return responses['direct-flights'];
        } else if (lowerMessage.includes('when') || lowerMessage.includes('time') || lowerMessage.includes('season')) {
            return responses['best-time'];
        } else {
            return {
                text: "I'd be happy to help you with that! Our best current offers include flights starting at $475 per person to Rome. Would you like to know more about:",
                details: [
                    "• Specific routes and schedules",
                    "• Baggage policies",
                    "• Family packages and discounts",
                    "• Best times to travel"
                ],
                showCTA: true
            };
        }
    }
    
    // Handle CTA button
    document.getElementById('bookButton').addEventListener('click', function(e) {
        e.preventDefault();
        
        // Add confirmation message
        addMessage("I'd like to book this flight!", 'user');
        
        setTimeout(() => {
            const confirmationResponse = {
                text: "Perfect! I'm redirecting you to Delta.com to complete your booking. You'll see this exact route with the pricing we discussed. Your session details have been saved.",
                details: [
                    "🔒 Secure booking guaranteed",
                    "⏱️ Price locked for 24 hours",
                    "💳 Multiple payment options available"
                ]
            };
            addBotResponse(confirmationResponse);
            
            // Simulate redirect (in real implementation, this would go to actual booking)
            setTimeout(() => {
                alert('In a real implementation, you would now be redirected to Delta.com with pre-filled flight details!');
            }, 2000);
        }, 1000);
    });
}
