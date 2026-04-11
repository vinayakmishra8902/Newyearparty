import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";

export const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="media-player">
      <button onClick={togglePlay} className="play-pause-btn" aria-label="Play/Pause">
        {isPlaying ? <Pause className="icon" /> : <Play className="icon" />}
      </button>
      <audio ref={audioRef} loop>
        <source src="/audio/song2.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
};

export const Background = () => (
  <div className="background">
    <div className="overlay" />
  </div>
);
