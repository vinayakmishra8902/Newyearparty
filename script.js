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

  aditi: {
    code: "ADITI2025",
    quote: `✨ Aditi — Your Year Wrapped ✨

From childhood till now, you’ve always felt more like a friend than just a sister.
Those days playing games together at nani’s house are still some of my favorite memories.

Here’s what I really love about you:

✔ supportive
✔ caring
✔ always fun to be around

But I have to be honest…

❌ judging couples in the mall every time we see them is not a good habit 😭😂

Still — you’re kind, you’re fun, and honestly one of the best sisters anyone could get.

I’m really lucky I got you as my sister, Aditi 💙`,
    imageUrl: "/public/assets/aditi.jpg"
  },

  sourav: {
    code: "SOURAV2025",
    quote: `✨ Sourav — Your Year Wrapped ✨

You’ve always felt like the real big brother figure in my life.
From teaching me things, guiding me, and sometimes scolding me — you’ve been there.

Those days at nani’s house, playing games and doing crazy things together…
they’ll always be special memories for me.

✔ you teach me life stuff in a simple way
✔ you always act like a responsible elder brother
✔ you even taught me how to ride a bike

But I have to say it honestly…

❌ sometimes you act TOO strict — like full dad mode 😭😂

Still… you’re the eldest brother, the one everyone looks up to,
and I’m really glad I have you in my life.

Love you bhaiya 💙`,
    imageUrl: "/public/assets/sourav.jpg"
  },

  Abhay: {
    code: "ABHAY2025",
    quote: `✨ Your Year Wrapped ✨

We first met back in 6th — during exams — and yeah…
our friendship literally started because I helped you cheat 😆

From there, slowly, you became more than just a senior.
Sometimes you felt like a brother,
sometimes like a friend I could chill and talk with.

✔ you guide me like an elder
✔ you always joke around and keep the mood light
✔ you never treated me like “just junior”

But I’ve got to say it honestly…

❌ sometimes you disappear and don’t talk for days 😭

And now this year, you’re giving your 10th exams
and you’ll be leaving school.

It feels weird — but I’m really proud of you, and I hope you do great ahead.
No matter where you go — I’ll still remember how our friendship started 😄`,
    imageUrl: "/public/assets/abhay.jpg"
  },

  sujal: {
    code: "SUJAL2025",
    quote: `✨ Sujal — Your Year Wrapped ✨

You’ve always felt like one more brother to me.
From games, jokes and random moments — we’ve had a lot of fun together.

Those days at nani’s house,
playing Clash of Clans and other games,
and learning new things together — they were the best.

✔ you taught me bike and never got tired of explaining
✔ you’re always ready to joke and have fun
✔ you make every meetup feel like childhood again

But honestly…

❌ sometimes you become too crazy and start doing full comedy mode 😭😂

Still — you’re one of those people I always enjoy spending time with,
and I’m really glad you’re part of my life.

More games, more rides, more memories ahead 💙`,
    imageUrl: "/public/assets/sujal.jpg"
  },

  stuti: {
    code: "STUTI2025",
    quote: `✨ Stuti — Your Year Wrapped ✨

You’ve always been the cute little sister of the family.
From childhood till now, we’ve done so many funny things together — 
especially at nani’s house, where every visit turned into fun and chaos.

✔ you’re sweet
✔ you’re innocent
✔ and you always bring smiles wherever you go

But I have to say one small thing…

❌ sometimes you get too innocent and believe ANYTHING people say 😭😂

Still — you’re one of the cutest sisters I could ever have,
and I’m really happy you’re part of my life.

Stay happy, stay cute, and never lose that innocence 💙`,
    imageUrl: "/public/assets/stuti.jpg"
  },

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
    imageUrl: "/public/assets/vedika.jpg"
  },

  vinayak: {
    code: "VINAYAK2025",
    quote: `✨ nhottoobedisclosed — Your 2025 Wrapped ✨

This year with you in the van and at school honestly felt different — in a good way.
 
Thanks for being part of my year — it was better because of you 💙`,
    imageUrl: "https://media.discordapp.net/attachments/1282987828464062486/1454340947067539547/IMG_20251224_233329_161.webp?ex=6950bc0e&is=694f6a8e&hm=0b9b82687263c6923e4f6ecaad15f5bdade627129b6f959ce73c6e2da1b059c8&=&format=webp&width=930&height=930 "
  },

  gurmehar: {
    code: "GURMEHARFRIEND2025",  
    quote: `✨ Gurmehar — Your 2025 Wrapped ✨

This year with you in the van and at school honestly felt different — in a good way.

✅ You’re genuinely funny — the type of person who can make even a boring van ride feel fun.

But I have to say it honestly…

❌ sometimes you reply late and I just sit there like: “ok… I’ll wait 😭”

Still, the best parts are definitely you:

✅ you’re a little angry queen sometimes, but somehow it’s cute 😆  
✅ and deep down, you’re a really good person — caring, sweet, and easy to like.

I won’t lie — I kinda had a crush on you this year.  
Thanks for being part of my year — it was better because of you 💙`,
    imageUrl: "/public/assets/gurmehar.jpg"
  },

  swarit: {
    code: "SWARIT2025",
    quote: `✨ Swarit — Your Year Wrapped ✨

We’ve been together since 8th, and honestly — you’re one of those friends who actually changed me for the better.

✅ you teach me when I’m wrong instead of just laughing
❌ but haan… kabhi-kabhi tu woh cheez bhi bata deta hai jo chup rehni chahiye 
✅ you give real reality checks — not sugar-coating
✅ and you’re a trusted person, plus a really good photographer

Thanks for being that friend who doesn’t just stay — but helps me grow.
Grateful you were part of my year 💙`,
    imageUrl: "/public/assets/swarit.jpg"
  },

  prince: {
    code: "PRINCE2025",
    quote: `✨ Prince — Your Year Wrapped ✨

Sach bolu — shuru mein hum dono ka bilkul match hi nahi hota tha.
But 9th ke baad slowly-slowly vibes match ho gaye — and now it actually feels good talking to you.

✅ you turned into a genuinely good friend
❌ kabhi-kabhi thoda awkward ho jata hai, ya seedha baat hi nahi karta 
✅ but you listen, you understand
✅ and most importantly — you’re a proper secret keeper

Glad our vibes finally matched.
Thanks for being part of my year 💙`,
    imageUrl: "/public/assets/prince.jpg"
  },

  aryan: {
    code: "ARYAN2025",
    quote: `✨ Aryan — Your Year Wrapped ✨

We’ve known each other since 8th, and honestly — pehle itna match nahi hota tha.
But slowly, this year, vibes thodi-thodi set hone lagi.

✅ you’ve got that romantic + sad songs playlist ready all the time

But I’ll be honest…

❌ kabhi-kabhi mood itna filmy ho jata hai ki lagta hai full movie chal rahi hai 

Still…

✅ you’re chill, fun to talk to
✅ and haan… tu secret bhi sambhalta hai — waise mere paas bhi tera ek secret hai 😉

Glad we’re actually matching better now.
Let’s see how the next year goes — hopefully better vibes 💙`,
    imageUrl: "/public/assets/aryangupta.jpg"
  },

  aman: {
    code: "AMAN2025",
    quote: `✨ Aman — Your Year Wrapped ✨

We didn’t meet in real life first — we met in a roleplay server in 2025.
And somehow from that one RP moment… you actually became one of my closest friends.

We played so many games together,
did crazy police RP,
and spent hours just laughing, talking and creating moments.

First, the good stuff:

✅ you’re loyal — once you call someone a friend, you stand with them
❌ but yeah… sometimes you act too pro like “I know everything” 
✅ you make every game and RP actually fun
✅ and you feel more like a brother than just a player from a server

And listen…

No matter how big your rank becomes in RP —
you will ALWAYS be my student 😆

Thanks for being part of my year, bro.
I’m really glad we met — even if it was in a virtual world 💙`,
    imageUrl: "/public/assets/aman.jpg"
  },

  akshat: {
    code: "AKSHAT2025",
    quote: `✨ Akshat — Your Gamer Wrapped ✨

We met almost 4 years ago on a Minecraft SMP — and honestly, at the start we were more like enemies than teammates.
But somehow, after all the fights and chaos, we ended up becoming real friends.

First, the good parts:

✅ you’re competitive in every game we touch
❌ but yeah… you always think you’re better than me (spoiler: you’re not 😆)
✅ we’ve played so many games together — especially Valorant
✅ and you’re still someone I can chill, laugh and waste hours with

And remember…

A student can never beat the teacher —
no matter how hard you try 😌

Glad you stayed in my year — and in my games 💙`,
    imageUrl: "/public/assets/akshat.jpg"
  },

  aditya: {
    code: "ADITYA2025",
    quote: `✨ Aditya — Your Year Wrapped ✨

From childhood till now — our vibes have always matched in a different way.
You’re not just family, you’re someone I can actually talk to like a friend.

✅ you’ve been my biggest secret keeper
❌ but sometimes you give such crazy ideas that I start doubting my life choices 😭
✅ you’ve taught me so many things — style, confidence, even how to talk properly 
✅ and every moment with you feels fun, stupid, and unforgettable

Spending time with you never feels boring.
More memories, more madness — and more secrets we’ll never tell anyone 🤝`,
    imageUrl: "/public/assets/sanket.jpg"
  }

};

const defaultQuotes = [
    "✨ New year, new chances — may this one be your best chapter yet!",
    "🌟 Here’s to growth, laughter, and moments that feel like magic. Happy New Year!",
    "🎆 May this year surprise you with beautiful memories and big wins.",
    "💫 You deserve peace, success, love — and everything that makes you smile.",
    "🔥 Don’t just dream this year — build it. Your time starts now.",
    "🎉 New year, same amazing you — just leveling up.",
    "🌙 May every night be peaceful and every morning full of purpose.",
    "🌈 If last year tested you, this year will bless you — trust the process.",
    "💖 More happiness, more courage, more confidence — that’s your 2026 energy.",
    "🚀 Small steps. Big progress. Beautiful results. Happy New Year!"
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
        backgroundMusic.volume = 0.4;
        
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
