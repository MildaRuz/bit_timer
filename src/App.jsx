import { useState, useEffect } from 'react';

function App() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [color, setColor] = useState('black');
  const [countdown, setCountdown] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown % 10 === 0) {
            console.log('prevCountdown === ', prevCountdown);
            setColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
          }
          if (prevCountdown === 0) {
            clearInterval(interval);
            return (prevCountdown = 0);
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }
    console.log('clearInterval === ', clearInterval);
    return () => clearInterval(interval);
  }, [isRunning, countdown]);

  const startCountdown = () => {
    setCountdown(minutes * 60 + seconds);
    setIsRunning(true);
  };

  const resetCountdown = () => {
    () => clearInterval(null);
    setCountdown(0);
    setIsRunning(false);
    setMinutes(0);
    setSeconds(0);
  };

  return (
    <div style={{ color: color }}>
      <div className="timer">
        {Math.floor(countdown / 60)}:{countdown % 60 < 10 ? `0${countdown % 60}` : countdown % 60}
      </div>
      <input
        type="number"
        value={minutes}
        onChange={(e) => setMinutes(e.target.value)}
        placeholder="Minutes"
      />
      <input
        type="number"
        value={seconds}
        onChange={(e) => setSeconds(e.target.value)}
        placeholder="Seconds"
      />
      <button onClick={startCountdown}>Start</button>
      <button onClick={resetCountdown}>Reset</button>
    </div>
  );
}

export default App;
