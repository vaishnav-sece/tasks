import React, { useState, useEffect, useRef } from 'react';

const TimerApp = () => {
  // State to track the time
  const [time, setTime] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  // Refs to manage focus and timer id
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  // Function to start the timer
  const startTimer = () => {
    if (isRunning) return;

    setIsRunning(true);
    timerRef.current = setInterval(() => {
      setTime(prevTime => {
        if (prevTime === 1) {
          clearInterval(timerRef.current);
          setShowMessage(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  // Function to stop the timer
  const stopTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
  };

  // Function to reset the timer
  const resetTimer = () => {
    clearInterval(timerRef.current);
    setTime(10);
    setIsRunning(false);
    setShowMessage(false);
  };

  // Focus input box when page loads
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Function to focus the input box when "Focus Box" button is clicked
  const focusBox = () => {
    inputRef.current.focus();
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <div>
        <input
          ref={inputRef}
          type="text"
          placeholder="Type something..."
          style={{ padding: '10px', fontSize: '16px' }}
        />
      </div>

      <div>
        <button onClick={focusBox} style={buttonStyle}>Focus Box</button>
      </div>

      <div>
        <p>Time remaining: {time} seconds</p>
        {showMessage && <p style={{ color: 'red', fontWeight: 'bold' }}>Time's Up!</p>}
      </div>

      <div>
        <button onClick={startTimer} style={buttonStyle} disabled={isRunning}>Start Timer</button>
        <button onClick={stopTimer} style={buttonStyle} disabled={!isRunning}>Stop Timer</button>
        <button onClick={resetTimer} style={buttonStyle}>Reset Timer</button>
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  margin: '5px',
  cursor: 'pointer',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
};

export default TimerApp;
