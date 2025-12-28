// --- 1. FIREBASE IMPORTS (Using CDN for browser support) ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// --- 2. FIREBASE CONFIGURATION ---
const firebaseConfig = {
  apiKey: "AIzaSyChFehhMdGREwt7-iV30FtuYfSMTp5A9xw",
  authDomain: "replyisnmtant.firebaseapp.com",
  projectId: "replyisnmtant",
  storageBucket: "replyisnmtant.firebasestorage.app",
  messagingSenderId: "196562164334",
  appId: "1:196562164334:web:a3b4975f6b76291a65647f"
};

// --- 3. INITIALIZE FIREBASE & DATABASE ---
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- 4. PERSONALIZED DATA ---
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
    }
};

const defaultQuotes = [
    "May this new year bring you joy, peace, and endless possibilities!",
    "Here's to new beginnings and fresh starts. Happy New Year!",
    "May your dreams take flight in this new year!",
    "Wishing you 365 days of success, happiness, and adventure!",
    "Cheers to a year filled with new opportunities and achievements!"
];

// --- 5. DOM ELEMENTS ---
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
const nitinMusic = document.getElementById("nitinPopupMusic");

// --- 6. DATABASE SAVING FUNCTION (The missing piece) ---
async function saveVisitorToFirebase(name, code) {
    try {
        await addDoc(collection(db, "visitors"), {
            name: name,
            codeUsed: code || "None",
            timestamp: serverTimestamp(),
            device: navigator.userAgent
        });
        console.log("Visitor saved to database!");
    } catch (e) {
        console.error("Error adding visitor: ", e);
    }
}

// --- 7. FORM HANDLER (Updated to save data) ---
nameForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = nameInput.value.trim();
    const code = codeInput.value.trim();
    
    if (name) {
        // Log to Firebase first
        saveVisitorToFirebase(name, code);
        // Then show the popup
        showPopup(name, code);
    }
});

// --- 8. POPUP LOGIC ---
function showPopup(name, code) {
    const nameLower = name.toLowerCase();
    const personalData = personalizedData[nameLower];

    errorMessage.classList.add('hidden');
    greetingName.textContent = `Dear ${name},`;

    if (personalData) {
        if (code) {
            if (code.toUpperCase() === personalData.code) {
                quoteText.textContent = personalData.quote;
                profileImage.src = personalData.imageUrl;
                profileImage.alt = name;
                profileImageContainer.classList.remove('hidden');
                
                popup.classList.remove('hidden');
                triggerConfetti();
                if (nameLower === 'nitin') {
                    if(nitinMusic) {
                        nitinMusic.currentTime = 0;
                        nitinMusic.volume = 0.6;
                        nitinMusic.play().catch(() => {
                            console.log("Autoplay blocked until user interaction");
                        });
                    }
                }
            } else {
                showError('❌ Incorrect code! Please enter the correct personal code.');
                return;
            }
        } else {
            showError('🔒 You have a personalized message! Please enter your personal code to view it.');
            return;
        }
    } else {
        const randomQuote = defaultQuotes[Math.floor(Math.random() * defaultQuotes.length)];
        quoteText.textContent = randomQuote;
        profileImageContainer.classList.add('hidden');
        
        popup.classList.remove('hidden');
        triggerConfetti();
    }
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    setTimeout(() => {
        errorMessage.classList.add('hidden');
    }, 5000);
}

// --- 9. CLOSE POPUP & HELPERS ---
// Attached to window so HTML onclick works with type="module"
window.closePopup = function() {
    popup.classList.add('hidden');
    nameInput.value = '';
    codeInput.value = '';
    errorMessage.classList.add('hidden');
    
    if(nitinMusic) {
        nitinMusic.pause();
        nitinMusic.currentTime = 0;
    }
    
    const canvas = confettiCanvas;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

document.querySelector('.popup-backdrop')?.addEventListener('click', window.closePopup);

function triggerConfetti() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;

    const myConfetti = confetti.create(confettiCanvas, {
        resize: true,
        useWorker: true
    });

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

window.addEventListener('resize', function() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
});

nameInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        nameForm.dispatchEvent(new Event('submit'));
    }
});
