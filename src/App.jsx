import { useEffect, useState } from 'react';

import img1 from './assets/img/01.jpg';
import img2 from './assets/img/02.jpg';
import img3 from './assets/img/03.png';
import img4 from './assets/img/04.jpg';
import img5 from './assets/img/05.png';
import img6 from './assets/img/06.jpg';
import img7 from './assets/img/07.jpg';
import img8 from './assets/img/08.png';

function App() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [color, setColor] = useState('black');
  const [countdown, setCountdown] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [backgroundImageIndex, setBackgroundImageIndex] = useState(0);

  const images = [img1, img2, img3, img4, img5, img6, img7, img8];

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown % 10 === 0) {
            console.log('prevCountdown === ', prevCountdown);
            setColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
            setBackgroundImageIndex((prevIndex) => (prevIndex + 1) % images.length);
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
    <div className="container">
      <div className="im">
        <div
          className="images"
          style={{
            color: color,
            backgroundImage: `url(${images[backgroundImageIndex]})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="timer">
            {Math.floor(countdown / 60)}:{countdown % 60 < 10 ? `0${countdown % 60}` : countdown % 60}
          </div>
          <input type="number" value={minutes} onChange={(e) => setMinutes(e.target.value)} placeholder="Minutes" />
          <input type="number" value={seconds} onChange={(e) => setSeconds(e.target.value)} placeholder="Seconds" />
        </div>
        <div className="buttons">
          <button onClick={startCountdown}>Start</button>
          <button onClick={resetCountdown}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;
