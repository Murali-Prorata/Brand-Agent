// Modal functionality
const flightBtn = document.getElementById('flightBtn');
const hotelBtn = document.getElementById('hotelBtn');
const cabBtn = document.getElementById('cabBtn');

const flightModal = document.getElementById('flightModal');
const hotelModal = document.getElementById('hotelModal');
const cabModal = document.getElementById('cabModal');

// Open modals
flightBtn.addEventListener('click', () => {
    flightModal.style.display = 'block';
});

hotelBtn.addEventListener('click', () => {
    hotelModal.style.display = 'block';
});

cabBtn.addEventListener('click', () => {
    cabModal.style.display = 'block';
});

// Close modals
const closeButtons = document.querySelectorAll('.cta-modal-close');
closeButtons.forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        const modalId = closeBtn.getAttribute('data-modal');
        document.getElementById(modalId).style.display = 'none';
    });
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target.classList.contains('cta-modal')) {
        event.target.style.display = 'none';
    }
});

// Handle form submissions
const forms = document.querySelectorAll('.cta-form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Form submitted successfully! We will process your request shortly.');
        form.closest('.cta-modal').style.display = 'none';
        form.reset();
    });
});
