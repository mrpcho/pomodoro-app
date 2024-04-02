import { useState, createContext } from "react";
import alarmSound from '../assets/digital-alarm-sound.wav';

export const SoundContext = createContext({
    notification : true,
    setNotification: () => {},
    alarm : null,
    setAlarm: () => {},
    toggleNotification: () => {},
});

export const SoundProvider = ({children}) => { 
    const [notification, setNotification] = useState(true);
    const [alarm, setAlarm] = useState(new Audio(alarmSound));
    alarm.volume = 0.5

    const toggleNotification = (prevMode) => {
        setNotification(prevMode === true ? prevMode = false : prevMode = true);
      };

    const value = {
        notification, setNotification,
        alarm, setAlarm,
        toggleNotification,
    };


    return (
        <SoundContext.Provider value={value}>
            {children}
        </SoundContext.Provider>
    )
};