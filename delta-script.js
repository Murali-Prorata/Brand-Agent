// Initialize the Delta AI Agent on Delta.com homepage
document.addEventListener('DOMContentLoaded', function() {
    const bannerContainer = document.getElementById('agentBannerContainer');
    
    // Create and insert the agent banner
    const agentBanner = createAgentBanner();
    bannerContainer.appendChild(agentBanner);
    
    // Initialize chat functionality
    initializeAgentChat();
});

function createAgentBanner() {
    const wrapper = document.createElement('div');
    wrapper.className = 'agent-banner';
    
    wrapper.innerHTML = `
        <div class="ai-agent-module-banner">
            <div class="ai-agent-header-banner">
                <div class="agent-logo-banner">✈️</div>
                <div class="agent-branding-banner">
                    <h3>Delta AI Travel Assistant</h3>
                    <p>Powered by Gist ✨</p>
                </div>
            </div>
            <div class="ai-agent-body-banner">
                <p class="agent-intro-banner">Get personalized flight recommendations and exclusive deals. Ask me anything!</p>
                
                <div class="chat-container-banner" id="agentChatContainerBanner">
                    <div class="chat-message-banner message-bot-banner">
                        <div class="message-avatar-banner">🤖</div>
                        <div class="message-content-banner">
                            <p>Hi! I'm here to help you find the best flights and deals. What would you like to know?</p>
                        </div>
                    </div>
                </div>
                
                <div class="quick-replies-banner" id="agentQuickRepliesBanner">
                    <button class="chip-banner" data-question="best-time">
                        <span>📅</span> Best time to book?
                    </button>
                    <button class="chip-banner" data-question="packages">
                        <span>🏖️</span> Vacation packages
                    </button>
                    <button class="chip-banner" data-question="deals">
                        <span>🎉</span> Current deals
                    </button>
                    <button class="chip-banner" data-question="routes">
                        <span>🗺️</span> Popular routes
                    </button>
                </div>
                
                <div class="chat-input-container-banner">
                    <input 
                        type="text" 
                        class="chat-input-banner" 
                        id="agentChatInputBanner" 
                        placeholder="Ask about flights, deals, packages..."
                        autocomplete="off"
                    />
                    <button class="send-button-banner" id="agentSendButtonBanner">Send</button>
                </div>
                
                <div class="cta-container-banner" id="agentCtaContainerBanner">
                    <a href="#" class="cta-button-banner" id="agentBookButtonBanner">
                        Book Flight Now →
                    </a>
                </div>
            </div>
        </div>
    `;
    
    return wrapper;
}

function initializeAgentChat() {
    const chatContainer = document.getElementById('agentChatContainerBanner');
    const chatInput = document.getElementById('agentChatInputBanner');
    const sendButton = document.getElementById('agentSendButtonBanner');
    const quickReplies = document.querySelectorAll('.chip-banner');
    const ctaContainer = document.getElementById('agentCtaContainerBanner');
    
    // Predefined responses
    const responses = {
        'best-time': {
            text: "Great question! Here's when to book for the best prices:",
            details: [
                "📊 <strong>Best booking window:</strong> 2-3 months in advance",
                "📉 <strong>Cheapest days:</strong> Tuesday-Thursday departures",
                "🌙 <strong>Off-peak times:</strong> Early morning or late evening flights",
                "💰 <strong>Price range:</strong> $200-500 per person depending on destination",
                "⏰ <strong>Pro tip:</strong> Set price alerts and book mid-week for 20-30% savings"
            ],
            showCTA: true
        },
        'packages': {
            text: "Yes! We have amazing vacation packages available:",
            packages: [
                "🏝️ <strong>Caribbean All-Inclusive:</strong> Flight + 5-night resort",
                "  Starting at $1,299 per person (includes meals & activities)",
                "",
                "🇪🇺 <strong>European Explorer:</strong> Flight + Hotel + Tours",
                "  Starting at $2,199 per person (7 cities in 14 days)",
                "",
                "🏖️ <strong>Family Getaway:</strong> Flight + Resort + Water Park",
                "  Starting at $899 per person (4+ passengers)",
                "",
                "✈️ <strong>Business Travel:</strong> Flexible dates, lounge access",
                "  Starting at $3,499 per person"
            ],
            showCTA: true
        },
        'deals': {
            text: "We have incredible deals running right now!",
            details: [
                "🎉 <strong>Fall Getaway Sale:</strong> 30% off Europe flights through Oct 31",
                "👨‍👩‍👧‍👦 <strong>Family Bundle:</strong> Book 4+ get 25% off + extra baggage",
                "🏖️ <strong>Beach Escape:</strong> Caribbean flights from $275 round-trip",
                "🌃 <strong>City Break:</strong> NYC, LA, Chicago from $150 one-way",
                "💎 <strong>SkyMiles Double Offer:</strong> Earn 2x miles on all bookings"
            ],
            showCTA: true
        },
        'routes': {
            text: "Here are our most popular routes with great pricing:",
            routes: [
                "🗽 <strong>New York (JFK) → London (LHR)</strong>",
                "  Flights from $350 | 7-8 hours | 4+ daily departures",
                "",
                "🎬 <strong>Los Angeles (LAX) → Tokyo (NRT)</strong>",
                "  Flights from $650 | 11 hours | Daily departures",
                "",
                "🌴 <strong>Miami (MIA) → Caribbean Islands</strong>",
                "  Flights from $275 | 2-4 hours | Multiple destinations",
                "",
                "🇲🇽 <strong>Houston (IAH) → Cancun (CUN)</strong>",
                "  Flights from $250 | 3 hours | 5+ daily departures",
                "",
                "🏙️ <strong>Atlanta (ATL) → Rome (FCO)</strong>",
                "  Flights from $475 | 8-9 hours | 3+ weekly"
            ],
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
            }, 1200);
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
        }, 1500);
    }
    
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message-banner message-${sender === 'bot' ? 'bot-banner' : 'user-banner'}`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar-banner';
        avatar.textContent = sender === 'bot' ? '🤖' : '👤';
        
        const content = document.createElement('div');
        content.className = 'message-content-banner';
        
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
        messageDiv.className = 'chat-message-banner message-bot-banner';
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar-banner';
        avatar.textContent = '🤖';
        
        const content = document.createElement('div');
        content.className = 'message-content-banner';
        
        const p = document.createElement('p');
        p.textContent = response.text;
        content.appendChild(p);
        
        if (response.details) {
            const detailsList = document.createElement('div');
            detailsList.style.marginTop = '8px';
            response.details.forEach(detail => {
                const detailP = document.createElement('p');
                detailP.innerHTML = detail;
                detailP.style.margin = '4px 0';
                detailP.style.fontSize = '12px';
                detailsList.appendChild(detailP);
            });
            content.appendChild(detailsList);
        }
        
        if (response.packages || response.routes) {
            const list = document.createElement('div');
            list.style.marginTop = '8px';
            list.style.whiteSpace = 'pre-line';
            (response.packages || response.routes).forEach(item => {
                const itemP = document.createElement('p');
                itemP.innerHTML = item;
                itemP.style.margin = '3px 0';
                itemP.style.fontSize = '12px';
                list.appendChild(itemP);
            });
            content.appendChild(list);
        }
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
        
        if (response.showCTA) {
            setTimeout(() => {
                ctaContainer.style.display = 'block';
            }, 300);
        }
    }
    
    function showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'chat-message-banner message-bot-banner';
        indicator.id = 'agentTypingIndicatorBanner';
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar-banner';
        avatar.textContent = '🤖';
        
        const content = document.createElement('div');
        content.className = 'message-content-banner';
        
        const typing = document.createElement('div');
        typing.className = 'typing-indicator-banner';
        typing.innerHTML = '<span></span><span></span><span></span>';
        
        content.appendChild(typing);
        indicator.appendChild(avatar);
        indicator.appendChild(content);
        
        chatContainer.appendChild(indicator);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    
    function hideTypingIndicator() {
        const indicator = document.getElementById('agentTypingIndicatorBanner');
        if (indicator) {
            indicator.remove();
        }
    }
    
    function generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('package') || lowerMessage.includes('vacation') || lowerMessage.includes('resort')) {
            return responses['packages'];
        } else if (lowerMessage.includes('deal') || lowerMessage.includes('sale') || lowerMessage.includes('offer')) {
            return responses['deals'];
        } else if (lowerMessage.includes('route') || lowerMessage.includes('destination') || lowerMessage.includes('where')) {
            return responses['routes'];
        } else if (lowerMessage.includes('book') || lowerMessage.includes('when') || lowerMessage.includes('time')) {
            return responses['best-time'];
        } else {
            return {
                text: "I can help you with flight information! Ask me about:",
                details: [
                    "💰 Best times to book for savings",
                    "🏖️ Vacation packages and deals",
                    "🎉 Current promotions and offers",
                    "🗺️ Popular routes and destinations"
                ],
                showCTA: true
            };
        }
    }
    
    // Handle CTA button
    document.getElementById('agentBookButtonBanner').addEventListener('click', function(e) {
        e.preventDefault();
        
        addMessage("I'd like to check availability", 'user');
        
        setTimeout(() => {
            const confirmationResponse = {
                text: "Perfect! Redirecting you to our booking engine with your preferences...",
                details: [
                    "✈️ Real-time flight availability",
                    "💳 Multiple payment options",
                    "🎁 Exclusive member discounts applied",
                    "📱 Mobile-friendly checkout"
                ]
            };
            addBotResponse(confirmationResponse);
            
            setTimeout(() => {
                alert('In a real implementation, you would be redirected to our flight booking engine!');
            }, 1500);
        }, 800);
    });
}
