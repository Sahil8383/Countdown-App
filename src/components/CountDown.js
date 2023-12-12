import React, { useState, useEffect } from 'react';
import { BiReset } from "react-icons/bi";
import { FaPause } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";

const Countdown = () => {
    const [inputMin, setinputMin] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    let countdownInterval;

    useEffect(() => {
        if (isPlaying) {
            countdownInterval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                } else if (minutes > 0) {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                } else if (hours > 0) {
                    setHours(hours - 1);
                    setMinutes(59);
                    setSeconds(59);
                } else {
                    clearInterval(countdownInterval);
                    setIsPlaying(false);
                }
            }, 1000);
        }

        return () => clearInterval(countdownInterval);
    }, [isPlaying, hours, minutes, seconds]);

    const handleStart = () => {
        if (!isPlaying) {
            setIsPlaying(true);
        }
    };

    const handleReset = () => {
        clearInterval(countdownInterval);
        setIsPlaying(false);
        setinputMin(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
    };

    const handleChange = (event) => {

        const newinputMin = parseInt(event.target.value, 10);
        setinputMin(newinputMin);
        setHours(Math.floor(newinputMin / 60));
        setMinutes(newinputMin % 60);
        setSeconds(0);
        clearInterval(countdownInterval);
        setIsPlaying(false);
    };

    return (
        <div className="outerBox">
            <div className="inputBox">
                <label className="label">Enter Minutes :</label>
                <input
                    type="number"
                    value={inputMin}
                    onChange={handleChange}
                    className='input'
                />
            </div>
            <div className="displayBox">
                {
                    isPlaying ? (
                        <button onClick={() => setIsPlaying(false)} className="btnPlay">
                            <FaPause />
                        </button>
                    ) : (
                        <button onClick={handleStart} className="btnReset">
                            <FaPlay />
                        </button>
                    )
                }
                <p>
                    {
                        isNaN(String(hours).padStart(2, '0')) ? '00' : String(hours).padStart(2, '0')}
                        :
                        {isNaN(String(minutes).padStart(2, '0')) ? '00' : String(minutes).padStart(2, '0')}
                        :
                        {isNaN(String(seconds).padStart(2, '0')) ? '00' : String(seconds).padStart(2, '0')}
                </p>
                <button onClick={handleReset} className="btnPlay">
                    <BiReset />
                </button>
            </div>
        </div>
    );
};

export default Countdown;
