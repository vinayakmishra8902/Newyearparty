import { useEffect, useState } from "react";

export const Snow = () => {
  const [flakes, setFlakes] = useState<{ id: number; left: string; size: string; duration: string; delay: string }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      const newFlake = {
        id,
        left: Math.random() * 100 + "vw",
        size: Math.random() * 6 + 2 + "px",
        duration: Math.random() * 6 + 6 + "s",
        delay: Math.random() * 4 + "s",
      };
      setFlakes((prev) => [...prev, newFlake]);

      setTimeout(() => {
        setFlakes((prev) => prev.filter((f) => f.id !== id));
      }, 10000);
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="snow">
      {flakes.map((flake) => (
        <div
          key={flake.id}
          className="flake"
          style={{
            left: flake.left,
            width: flake.size,
            height: flake.size,
            animationDuration: flake.duration,
            animationDelay: flake.delay,
          }}
        />
      ))}
    </div>
  );
};
