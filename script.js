// Personalized data for specific users with their unique codes
const personalizedData = {
    nitin: {
        code: "NITIN2025",  
        quote: "Your dedication and passion inspire everyone around you. May 2025 bring you extraordinary success and happiness. Keep shining bright!",
        imageUrl: "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjY3NTMzMDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    vinayak: {
        code: "VINAYAK2025",
        quote: "This is the sexiest person of the world!",
        imageUrl: "https://media.discordapp.net/attachments/1282987828464062486/1454340947067539547/IMG_20251224_233329_161.webp?ex=6950bc0e&is=694f6a8e&hm=0b9b82687263c6923e4f6ecaad15f5bdade627129b6f959ce73c6e2da1b059c8&=&format=webp&width=930&height=930 "
    },
    Papa: {
        code: "papa",  
        quote: `✨ Gurmehar — Your 2025 Wrapped ✨

This year with you felt really special.

👍 You’re funny  
😄 Van rides were never boring  
😆 Sometimes reply late (and I wait like 🥲)  
❤️ But you’re sweet, caring and a little angry-queen — in a cute way.`,
        imageUrl: "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjY3NTMzMDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },

};

// Default quotes for other names
const defaultQuotes = [
    "May this new year bring you joy, peace, and endless possibilities!",
    "Here's to new beginnings and fresh starts. Happy New Year!",
    "May your dreams take flight in this new year!",
    "Wishing you 365 days of success, happiness, and adventure!",
    "Cheers to a year filled with new opportunities and achievements!"
];

// Get DOM elements
const nameForm = document.getElementById('nameForm');
const nameInput = document.getElementById('nameInput');
const codeInput = document.getElementById('codeInput');
const errorMessage = document.getElementById('errorMessage');
const popup = document.getElementById('popup');
const greetingName = document.getElementById('greetingName');
const quoteText = document.getElementById('quoteText');
const profileImageContainer = document.getElementById('profileImageContainer');
const profileImage = document.getElementById('profileImage');
const confettiCanvas = document.getElementById('confetti-canvas');

// Form submission handler
nameForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = nameInput.value.trim();
    const code = codeInput.value.trim();
    
    if (name) {
        showPopup(name, code);
    }
});

// Show popup with personalized or default message
function showPopup(name, code) {
    const nameLower = name.toLowerCase();
    const personalData = personalizedData[nameLower];

    // Hide error message
    errorMessage.classList.add('hidden');

    // Set greeting name
    greetingName.textContent = `Dear ${name},`;

    // Check if user has personalized data
    if (personalData) {
        // If code is provided, verify it
        if (code) {
            if (code.toUpperCase() === personalData.code) {
                // Code is correct - show personalized message
                quoteText.textContent = personalData.quote;
                profileImage.src = personalData.imageUrl;
                profileImage.alt = name;
                profileImageContainer.classList.remove('hidden');
                
                // Show popup
                popup.classList.remove('hidden');
                triggerConfetti();
            } else {
                // Code is incorrect
                showError('❌ Incorrect code! Please enter the correct personal code.');
                return;
            }
        } else {
            // No code provided but user has personalized data
            showError('🔒 You have a personalized message! Please enter your personal code to view it.');
            return;
        }
    } else {
        // User doesn't have personalized data - show default quote
        const randomQuote = defaultQuotes[Math.floor(Math.random() * defaultQuotes.length)];
        quoteText.textContent = randomQuote;
        profileImageContainer.classList.add('hidden');
        
        // Show popup
        popup.classList.remove('hidden');
        triggerConfetti();
    }
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        errorMessage.classList.add('hidden');
    }, 5000);
}

// Close popup
function closePopup() {
    popup.classList.add('hidden');
    nameInput.value = '';
    codeInput.value = '';
    errorMessage.classList.add('hidden');
    
    // Clear the canvas
    const canvas = confettiCanvas;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Close popup when clicking backdrop
document.querySelector('.popup-backdrop')?.addEventListener('click', closePopup);

// Confetti effect
function triggerConfetti() {
    // Set canvas size
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;

    // Create confetti instance
    const myConfetti = confetti.create(confettiCanvas, {
        resize: true,
        useWorker: true
    });

    // Fire confetti
    const duration = 3000;
    const animationEnd = Date.now() + duration;

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            clearInterval(interval);
            return;
        }

        const particleCount = 50;

        myConfetti({
            particleCount: particleCount,
            startVelocity: 30,
            spread: 360,
            origin: {
                x: Math.random(),
                y: Math.random() - 0.2
            },
            colors: ['#facc15', '#ec4899', '#a855f7', '#3b82f6', '#10b981']
        });
    }, 250);
}

// Handle window resize for confetti canvas
window.addEventListener('resize', function() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
});

// Prevent form submission on Enter key in a way that still allows form validation
nameInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        nameForm.dispatchEvent(new Event('submit'));
    }
});
