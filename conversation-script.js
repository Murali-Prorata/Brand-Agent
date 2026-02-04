// Initialize the Delta AI Agent in the conversation
document.addEventListener('DOMContentLoaded', function() {
    const insertionPoint = document.getElementById('agent-insertion-point');
    
    // Create the Delta agent module as a conversation response
    const agentWrapper = createConversationAgentModule();
    insertionPoint.parentNode.insertBefore(agentWrapper, insertionPoint);
    
    // Trigger animation when scrolling into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    observer.observe(agentWrapper);
    
    // Initialize chat functionality
    initializeAgentChat();
});

function createConversationAgentModule() {
    const wrapper = document.createElement('div');
    wrapper.className = 'delta-agent-wrapper';
    
    wrapper.innerHTML = `
        <div class="agent-intro-message">
            💡 Specialized flight information available from our partner
        </div>
        
        <div class="ai-agent-module-conversation">
            <div class="ai-agent-header">
                <div class="agent-logo">✈️</div>
                <div class="agent-branding">
                    <h3>Delta Air Lines AI Guide</h3>
                    <p>Your personal flight assistant • Powered by Gist ✨</p>
                </div>
            </div>
            <div class="ai-agent-body">
                <p class="agent-intro">I can help you with specific flight details to Italy! Let me answer your questions about pricing and booking.</p>
                
                <div class="chat-container" id="agentChatContainer">
                    <div class="chat-message message-bot">
                        <div class="message-avatar-small">🤖</div>
                        <div class="message-content">
                            <p>Hi! For your family trip to Italy this fall, I can help you find the perfect flights. What would you like to know?</p>
                        </div>
                    </div>
                </div>
                
                <div class="quick-replies" id="agentQuickReplies">
                    <button class="chip" data-question="family-deals">
                        <span>👨‍👩‍👧‍👦</span> Family flight deals
                    </button>
                    <button class="chip" data-question="best-time">
                        <span>📅</span> Best booking time
                    </button>
                    <button class="chip" data-question="baggage">
                        <span>🧳</span> Baggage for families
                    </button>
                    <button class="chip" data-question="routes">
                        <span>🗺️</span> Multi-city options
                    </button>
                </div>
                
                <div class="chat-input-container">
                    <input 
                        type="text" 
                        class="chat-input" 
                        id="agentChatInput" 
                        placeholder="Ask about flights to Italy..."
                        autocomplete="off"
                    />
                    <button class="send-button" id="agentSendButton">Send</button>
                </div>
                
                <div class="cta-container" id="agentCtaContainer" style="display: none;">
                    <a href="#" class="cta-button" id="agentBookButton">
                        Book this route on Delta.com →
                    </a>
                </div>
            </div>
        </div>
    `;
    
    return wrapper;
}

function initializeAgentChat() {
    const chatContainer = document.getElementById('agentChatContainer');
    const chatInput = document.getElementById('agentChatInput');
    const sendButton = document.getElementById('agentSendButton');
    const quickReplies = document.querySelectorAll('.chip');
    const ctaContainer = document.getElementById('agentCtaContainer');
    
    // Predefined responses
    const responses = {
        'best-time': {
            text: "For fall travel to Italy, here's when you should book:",
            details: [
                "📅 <strong>Book now!</strong> For September-October travel, book 2-3 months in advance",
                "💰 <strong>Price range:</strong> $450-$700 per person (family of 4: $1,800-$2,800)",
                "📉 <strong>Best days:</strong> Fly Tuesday/Wednesday for 15-20% lower fares",
                "⚡ <strong>Price drop alerts:</strong> I'll monitor and notify you of deals"
            ],
            tip: "💡 Prices typically increase 3-4 weeks before departure, so booking in July-August is ideal for fall travel."
        },
        'family-deals': {
            text: "Great news! Here are our current family deals to Italy:",
            flight: {
                route: "New York (JFK) → Rome (FCO)",
                dates: "September 20 - October 4, 2026",
                price: "$2,195",
                details: "for family of 4 (includes all taxes)",
                features: [
                    "✓ 2 free checked bags per person (8 bags total)",
                    "✓ Free seat selection together",
                    "✓ Kids meals & entertainment included",
                    "✓ Flexible date changes (small fee)",
                    "✓ SkyMiles points earned"
                ]
            },
            note: "Alternative: Atlanta (ATL) → Rome for $1,899 (family of 4) with one connection",
            showCTA: true
        },
        'baggage': {
            text: "Perfect timing to ask! Here's everything about baggage for your family of 4:",
            details: [
                "🎒 <strong>Carry-on (per person):</strong> 1 bag (22×14×9\") + 1 personal item = 8 items total",
                "🧳 <strong>Checked bags:</strong> 2 free per person (50 lbs each) = 8 free checked bags!",
                "👶 <strong>Kids items:</strong> Strollers, car seats, and baby bags fly free",
                "⚖️ <strong>Weight tip:</strong> Distribute items - you have 400 lbs total allowance",
                "📦 <strong>Smart packing:</strong> Put breakables in carry-ons, clothes in checked bags"
            ],
            tip: "💡 Pro tip: Each person gets 2 bags - use all 8! Pack gifts/shopping in one bag, leave it empty for souvenirs coming home."
        },
        'routes': {
            text: "Perfect for your Rome-Florence-Venice trip! Here are your multi-city flight options:",
            routes: [
                "Option 1: <strong>Fly into Rome, out of Venice</strong> (most convenient!)",
                "  • Saves backtracking time",
                "  • Same price as round-trip",
                "  • Natural progression north",
                "",
                "Option 2: <strong>Round-trip to Rome</strong>",
                "  • Train to other cities",
                "  • Return to Rome for flight",
                "  • Slightly cheaper",
                "",
                "🚄 Between cities: High-speed trains (2-3 hours each)",
                "  • Rome → Florence: €49/person",
                "  • Florence → Venice: €39/person"
            ],
            pricing: {
                route: "Multi-city: New York → Rome, Venice → New York",
                price: "$2,295",
                details: "for family of 4",
                note: "Only $100 more than round-trip Rome, saves 6 hours of travel!"
            },
            showCTA: true
        }
    };
    
    // Handle quick reply clicks
    quickReplies.forEach(chip => {
        chip.addEventListener('click', function() {
            const question = this.dataset.question;
            const questionText = this.textContent.trim();
            
            addMessage(questionText, 'user');
            showTypingIndicator();
            
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
        
        showTypingIndicator();
        
        setTimeout(() => {
            hideTypingIndicator();
            const response = generateResponse(message);
            addBotResponse(response);
        }, 1800);
    }
    
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message message-${sender === 'bot' ? 'bot' : 'user-chat'}`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar-small';
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
        avatar.className = 'message-avatar-small';
        avatar.textContent = '🤖';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        content.style.maxWidth = '100%';
        
        const p = document.createElement('p');
        p.textContent = response.text;
        content.appendChild(p);
        
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
        
        if (response.routes) {
            const routesList = document.createElement('div');
            routesList.style.marginTop = '10px';
            routesList.style.whiteSpace = 'pre-line';
            response.routes.forEach(route => {
                const routeP = document.createElement('p');
                routeP.innerHTML = route;
                routeP.style.margin = '3px 0';
                routesList.appendChild(routeP);
            });
            content.appendChild(routesList);
        }
        
        if (response.flight) {
            const flightCard = createFlightCard(response.flight);
            content.appendChild(flightCard);
        }
        
        if (response.pricing) {
            const pricingCard = createFlightCard(response.pricing);
            content.appendChild(pricingCard);
        }
        
        if (response.note) {
            const noteP = document.createElement('p');
            noteP.textContent = response.note;
            noteP.style.marginTop = '10px';
            noteP.style.fontStyle = 'italic';
            noteP.style.fontSize = '14px';
            noteP.style.background = '#f0f0f0';
            noteP.style.padding = '8px';
            noteP.style.borderRadius = '6px';
            content.appendChild(noteP);
        }
        
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
        
        if (response.showCTA) {
            setTimeout(() => {
                ctaContainer.style.display = 'block';
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
        
        if (flight.dates) {
            const dates = document.createElement('p');
            dates.textContent = flight.dates;
            dates.style.color = '#666';
            dates.style.fontSize = '14px';
            dates.style.margin = '5px 0';
            card.appendChild(dates);
        }
        
        const price = document.createElement('div');
        price.className = 'flight-price';
        price.textContent = flight.price;
        card.appendChild(price);
        
        const details = document.createElement('p');
        details.textContent = flight.details;
        details.style.fontSize = '14px';
        details.style.marginBottom = '10px';
        card.appendChild(details);
        
        if (flight.features) {
            flight.features.forEach(feature => {
                const featureP = document.createElement('p');
                featureP.textContent = feature;
                featureP.style.fontSize = '13px';
                featureP.style.margin = '3px 0';
                featureP.style.color = '#28a745';
                card.appendChild(featureP);
            });
        }
        
        if (flight.note) {
            const noteP = document.createElement('p');
            noteP.textContent = flight.note;
            noteP.style.fontSize = '13px';
            noteP.style.marginTop = '10px';
            noteP.style.fontStyle = 'italic';
            noteP.style.color = '#666';
            card.appendChild(noteP);
        }
        
        return card;
    }
    
    function showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'chat-message message-bot';
        indicator.id = 'agentTypingIndicator';
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar-small';
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
        const indicator = document.getElementById('agentTypingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }
    
    function generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('budget')) {
            return responses['family-deals'];
        } else if (lowerMessage.includes('bag') || lowerMessage.includes('luggage')) {
            return responses['baggage'];
        } else if (lowerMessage.includes('multi') || lowerMessage.includes('cities') || lowerMessage.includes('route')) {
            return responses['routes'];
        } else if (lowerMessage.includes('when') || lowerMessage.includes('book')) {
            return responses['best-time'];
        } else {
            return {
                text: "I'd be happy to help! For your fall Italy trip, I can provide information about:",
                details: [
                    "💰 Current pricing and family deals",
                    "📅 Best time to book for fall travel",
                    "🧳 Baggage policies for families",
                    "🗺️ Multi-city routing options"
                ],
                showCTA: true
            };
        }
    }
    
    // Handle CTA button
    document.getElementById('agentBookButton').addEventListener('click', function(e) {
        e.preventDefault();
        
        addMessage("I'd like to check availability for these flights", 'user');
        
        setTimeout(() => {
            const confirmationResponse = {
                text: "Perfect! I'm preparing your booking details. You'll be redirected to Delta.com with:",
                details: [
                    "✓ Your selected route pre-filled",
                    "✓ Family of 4 configuration",
                    "✓ Dates and pricing locked for 24 hours",
                    "✓ All baggage allowances included"
                ],
                tip: "🔒 Secure checkout with multiple payment options available"
            };
            addBotResponse(confirmationResponse);
            
            setTimeout(() => {
                alert('In a real implementation, you would now be redirected to Delta.com with your flight details pre-filled!');
            }, 2000);
        }, 1000);
    });
}
