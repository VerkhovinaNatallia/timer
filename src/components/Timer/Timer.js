import React, { useState, useEffect } from 'react';
import s from './timer.module.css';


function Timer() {
    const [totalSeconds, setTotalSeconds] = useState(0); // Начальное значение таймера (в секундах)
    const [inputHours, setInputHours] = useState(''); // Значение ввода часов
    const [inputMinutes, setInputMinutes] = useState(''); // Значение ввода минут
    const [inputSeconds, setInputSeconds] = useState(''); // Значение ввода секунд
    const [paused, setPaused] = useState(false); // Флаг паузы
    const [over, setOver] = useState(false); // Флаг завершения таймера
  
    const handleInputChange = (e, type) => {
      const inputValue = e.target.value;
      switch (type) {
        case 'hours':
          setInputHours(inputValue);
          break;
        case 'minutes':
          setInputMinutes(inputValue);
          break;
        case 'seconds':
          setInputSeconds(inputValue);
          break;
        default:
          break;
      }
    };
  
    const startTimer = () => {
      const hours = parseInt(inputHours, 10) || 0;
      const minutes = parseInt(inputMinutes, 10) || 0;
      const seconds = parseInt(inputSeconds, 10) || 0;
      const totalSeconds = hours * 3600 + minutes * 60 + seconds;
      setTotalSeconds(totalSeconds);
      setPaused(false);
      setOver(false);
      setInputHours('');
      setInputMinutes('');
      setInputSeconds('');
    };
  
    useEffect(() => {
      if (!paused && !over) {
        const interval = setInterval(() => {
          if (totalSeconds > 0) {
            setTotalSeconds(totalSeconds - 1);
          } else {
            setOver(true);
          }
        }, 1000);
  
        return () => clearInterval(interval); // Очистка интервала при размонтировании компонента
      }
    }, [totalSeconds, paused, over]);
  
    const formatTime = (timeInSeconds) => {
      const hours = Math.floor(timeInSeconds / 3600);
      const minutes = Math.floor((timeInSeconds % 3600) / 60);
      const seconds = timeInSeconds % 60;
      return `${hours} ч ${minutes} мин ${seconds} сек`;
    };
  
    return (
      <div className={s.wrapper}>
        <h1>Таймер</h1>
        <div className={s.inpt}>
            <input
            type="number"
            placeholder="Часы"
            value={inputHours}
            onChange={(e) => handleInputChange(e, 'hours')}
            />
            <input
            type="number"
            placeholder="Минуты"
            value={inputMinutes}
            onChange={(e) => handleInputChange(e, 'minutes')}
            />
            <input
            type="number"
            placeholder="Секунды"
            value={inputSeconds}
            onChange={(e) => handleInputChange(e, 'seconds')}
            />
        </div>
        <div className={s.btn}>
            <button onClick={startTimer}>Старт</button>
            <button onClick={() => setPaused(!paused)} disabled={over}>
            {paused ? 'Продолжить' : 'Пауза'}
            </button>
        </div>
      
        <p>Осталось времени: {formatTime(totalSeconds)}</p>
      </div>
    );
  }
  
  export default Timer;