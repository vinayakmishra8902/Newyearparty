import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { Background, AudioPlayer } from "./components/Layout";
import { Snow } from "./components/Snow";
import confetti from "canvas-confetti";
import { X } from "lucide-react";

function App() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const logVisitor = useMutation(api.messages.logVisitor);
  
  // We use the query only when the user clicks submit to avoid constant background checks
  // Or we can just use a mutation-like pattern, but queries are fine if we pass the right args
  const messageQuery = useQuery(api.messages.getMessageByCode, code ? { code: code.toUpperCase() } : "skip" as any);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (!code) {
      setError("Please enter your personal code.");
      setIsSubmitting(false);
      return;
    }

    // Since useQuery updates automatically, we check the current value
    if (messageQuery) {
      if (messageQuery.name.toLowerCase() === name.toLowerCase()) {
        setSelectedMessage(messageQuery);
        triggerConfetti();
        logVisitor({ name, codeUsed: code, device: navigator.userAgent });
      } else {
        setError("❌ Incorrect code or name! Please check again.");
      }
    } else if (messageQuery === null) {
      setError("❌ Message not found for this code.");
    } else {
      // Still loading or skipped
      setError("⏳ Loading...");
    }
    setIsSubmitting(false);
  };

  const triggerConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      confetti({
        particleCount: 50,
        startVelocity: 30,
        spread: 360,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ['#facc15', '#ec4899', '#a855f7', '#3b82f6', '#10b981']
      });
    }, 250);
  };

  return (
    <>
      <Background />
      <Snow />
      <AudioPlayer />
      
      <div className="container">
        <div className="glass-card">
          <div className="card-content">
            <div className="heading-section">
              <h1>Happy New Year!</h1>
              <p className="year">2026</p>
              <div className="divider"></div>
            </div>

            <form onSubmit={handleSubmit} className="form">
              <div className="form-group">
                <label>Enter your name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name here..."
                  required
                />
              </div>
              <div className="form-group">
                <label>Enter your personal code</label>
                <input 
                  type="text" 
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Your personal code..."
                />
              </div>
              {error && <div className="error-message">{error}</div>}
              <button 
                type="submit" 
                className="submit-btn" 
                disabled={isSubmitting}
                style={{ position: 'relative', zIndex: 10 }}
              >
                {isSubmitting ? "Checking..." : "Go"}
              </button>
            </form>
          </div>
        </div>

        {selectedMessage && (
          <div className="popup-overlay">
            <div className="popup-backdrop" onClick={() => setSelectedMessage(null)} />
            <div className="popup-card">
              <button className="close-btn" onClick={() => setSelectedMessage(null)}>
                <X size={24} />
              </button>
              <div className="popup-content">
                <div className="profile-image-container">
                  <img src={selectedMessage.imageUrl} alt={selectedMessage.displayName} className="profile-image" />
                </div>
                <div className="popup-greeting">
                  <h2>Dear {selectedMessage.displayName},</h2>
                  <div className="popup-divider"></div>
                </div>
                <p className="quote-text">{selectedMessage.quote}</p>
                <button onClick={() => setSelectedMessage(null)} className="instagram-btn">CLOSE</button>
              </div>
            </div>
          </div>
        )}

        <footer className="site-footer">
          Made with ❤️ by <span>Vinayak</span>
        </footer>
      </div>
    </>
  );
}

export default App;
