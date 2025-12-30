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
    vedika: {
        code: "VEDIKA2025",  
        quote: `✨ Vedika — Your Year Wrapped ✨

We’ve been in the same class since 6th… and honestly, you’re like my school-type behen now 😂

✅ you’re funny in your own random way
❌ but yeah… sometimes you hit me in class for fun 😭
✅ you sing good songs at random moments
✅ and you’re supportive — you actually stand with people when they need it

Even with all the madness, I’m glad you were part of my year.
You made school better 💙`,
        imageUrl: "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjY3NTMzMDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    vinayak: {
        code: "VINAYAK2025",
        quote: `✨ nhottoobedisclosed — Your 2025 Wrapped ✨

This year with you in the van and at school honestly felt different — in a good way.

✅ You’re genuinely funny — the type of person who can make even a boring van ride feel fun.

But I have to say it honestly…

❌ sometimes you reply late and I just sit there like: “ok… I’ll wait 😭”

Still, the best parts are definitely you:

✅ you’re a little angry queen sometimes, but somehow it’s cute 😆  
✅ and deep down, you’re a really good person — caring, sweet, and easy to like.

I won’t lie — I kinda had a crush on you this year.  
Thanks for being part of my year — it was better because of you 💙`,
        imageUrl: "https://media.discordapp.net/attachments/1282987828464062486/1454340947067539547/IMG_20251224_233329_161.webp?ex=6950bc0e&is=694f6a8e&hm=0b9b82687263c6923e4f6ecaad15f5bdade627129b6f959ce73c6e2da1b059c8&=&format=webp&width=930&height=930 "
    },
    gurmehar:{
        code: "GUR2025",  
        quote: "Your dedication and passion inspire everyone around you. May 2025 bring you extraordinary success and happiness. Keep shining bright!",
        imageUrl: "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjY3NTMzMDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
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
const backgroundMusic = document.getElementById("backgroundMusic");
const playPauseBtn = document.getElementById('playPauseBtn');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');

// Verify audio element exists
if (!backgroundMusic) {
    console.error('Background music element not found!');
}

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
    const nameLower = name.toLowerCase();

    // 🎵 START MUSIC IMMEDIATELY ON USER ACTION (if not already playing)
    if (backgroundMusic && backgroundMusic.paused) {
        backgroundMusic.volume = 0.6;
        backgroundMusic.play().catch(e => console.log("Audio play failed:", e));
        updatePlayPauseButton(true);
    }

    // Save data (async is now SAFE)
    saveVisitorToFirebase(name, code);

    // Show popup
    showPopup(name, code);
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
    
    // Don't pause background music when closing popup - let it continue playing
    
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

// --- 10. MEDIA PLAYER CONTROLS ---
function updatePlayPauseButton(isPlaying) {
    if (isPlaying) {
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
    } else {
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
    }
}

playPauseBtn.addEventListener('click', function(e) {
    e.stopPropagation(); // Prevent triggering the document click handler
    if (backgroundMusic) {
        if (backgroundMusic.paused) {
            backgroundMusic.play().then(() => {
                console.log('Audio playing via button');
                updatePlayPauseButton(true);
            }).catch(e => {
                console.error("Audio play failed:", e);
                alert('Unable to play audio. Please check your browser settings or try clicking elsewhere on the page first.');
            });
        } else {
            backgroundMusic.pause();
            console.log('Audio paused via button');
            updatePlayPauseButton(false);
        }
    } else {
        console.error('Background music element not found!');
    }
});

// Update button state based on audio events
if (backgroundMusic) {
    backgroundMusic.addEventListener('play', function() {
        updatePlayPauseButton(true);
    });
    
    backgroundMusic.addEventListener('pause', function() {
        updatePlayPauseButton(false);
    });
    
    backgroundMusic.addEventListener('ended', function() {
        updatePlayPauseButton(false);
    });
}

// Initialize audio on page load
function initializeAudio() {
    if (backgroundMusic) {
        backgroundMusic.volume = 0.6;
        
        // Set initial button state
        updatePlayPauseButton(!backgroundMusic.paused);
        
        // Handle audio loading errors
        backgroundMusic.addEventListener('error', function(e) {
            console.error('Audio loading error:', e);
            console.error('Audio source:', backgroundMusic.src || backgroundMusic.currentSrc);
            console.error('Error details:', backgroundMusic.error);
            // Try alternative paths if main path fails
            const audioSource = backgroundMusic.querySelector('source');
            if (audioSource) {
                // Try relative path
                audioSource.src = './audio/song.mp3';
                backgroundMusic.load();
            }
        });
        
        // Log when audio loads successfully
        backgroundMusic.addEventListener('loadeddata', function() {
            console.log('Audio loaded successfully:', backgroundMusic.currentSrc);
            console.log('Audio duration:', backgroundMusic.duration);
        });
        
        backgroundMusic.addEventListener('canplay', function() {
            console.log('Audio can play - ready to play');
        });
        
        backgroundMusic.addEventListener('loadstart', function() {
            console.log('Audio loading started');
        });
        
        // Try autoplay - will fail silently on browsers that require user interaction
        const playPromise = backgroundMusic.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('Audio playing automatically');
                updatePlayPauseButton(true);
            }).catch(e => {
                // Autoplay blocked - will play on first user interaction
                console.log("Autoplay blocked, waiting for user interaction:", e.message);
                updatePlayPauseButton(false);
            });
        } else {
            // Fallback if play() doesn't return a promise
            updatePlayPauseButton(false);
        }
    } else {
        console.error('Background music element not found during initialization!');
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAudio);
} else {
    // DOM is already ready
    initializeAudio();
}

// Play music on any user interaction (click, touch, keypress)
let hasInteracted = false;
function tryPlayAudio() {
    if (backgroundMusic) {
        if (backgroundMusic.readyState >= 2) { // HAVE_CURRENT_DATA or higher
            if (backgroundMusic.paused) {
                backgroundMusic.play().then(() => {
                    console.log('Audio started playing on user interaction');
                    updatePlayPauseButton(true);
                    hasInteracted = true;
                }).catch(e => {
                    console.error("Audio play failed:", e);
                });
            }
        } else {
            // Wait for audio to load
            backgroundMusic.addEventListener('canplay', function() {
                if (backgroundMusic.paused) {
                    backgroundMusic.play().then(() => {
                        console.log('Audio started playing after load');
                        updatePlayPauseButton(true);
                        hasInteracted = true;
                    }).catch(e => {
                        console.error("Audio play failed:", e);
                    });
                }
            }, { once: true });
        }
    }
}

// Listen for multiple interaction types - play on ANY click anywhere
document.addEventListener('click', function(e) {
    // Don't interfere with play/pause button clicks
    if (e.target !== playPauseBtn && !playPauseBtn.contains(e.target)) {
        tryPlayAudio();
    }
}, { once: true });

document.addEventListener('touchstart', tryPlayAudio, { once: true });
document.addEventListener('keydown', tryPlayAudio, { once: true });

// Also try to play when form is interacted with
if (nameInput) {
    nameInput.addEventListener('focus', tryPlayAudio, { once: true });
}
if (codeInput) {
    codeInput.addEventListener('focus', tryPlayAudio, { once: true });
}

nameInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        nameForm.dispatchEvent(new Event('submit'));
    }
});
