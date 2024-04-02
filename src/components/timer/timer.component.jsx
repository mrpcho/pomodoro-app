import { useState, useEffect, useContext } from 'react';
import { ColorModeContext } from '../../contexts/color-mode.contexts';
import { TimeContext } from '../../contexts/time.context';
import { ItemsContext } from '../../contexts/items.context';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Settings from '../settings/settings.component';
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { AiOutlineEllipsis } from "react-icons/ai";
import { PiBrainBold } from "react-icons/pi";
import { VscCoffee } from "react-icons/vsc";

import './timer.styles.css'
import { SoundContext } from '../../contexts/sound.context';

const next = ['focus', 'shortBreak', 'focus', 'longBreak']
const stage = ['Focus', 'Short Break', 'Focus', 'Long Break']
const phase = ['focus', 'short', 'focus', 'long']

const Timer = () => {
    const {setPhase} = useContext(ColorModeContext);
    const {updateTime, selectItem} = useContext(ItemsContext);
    const { minutes, trackTime, setTrackTime, startTimer, setStartTimer, } = useContext(TimeContext);
    const [index, setIndex] = useState(0);
    const [settings, setSettings] = useState(false);
    const [time, setTime] = useState(minutes[phase[index]]);
    const {alarm, notification} = useContext(SoundContext);

    const handleSettings = () => {
        !settings ? setSettings(true) : setSettings(false)
    };

    const handleStartTimer = () => {
        ! startTimer ? setStartTimer(true) : setStartTimer(false)
        if (selectItem && trackTime && stage[index] === 'Focus') {
            console.log(stage[index])
            updateTime(trackTime)
            setTrackTime(0)
        }
        
    };

    const handleNext = () => {
        
        if (index < 3) {
            setIndex(index+1)
            setStartTimer(false)
            
        } else {
            setIndex(0)
            setStartTimer(false)
        };
        if (selectItem && stage[index] === 'Focus') {
            updateTime(trackTime)
            setTrackTime(0)
        } else {
            setTrackTime(0)
        }
    };

    useEffect(() => {
        setPhase(next[index])
        setTime(minutes[phase[index]] * 60) // * 60
    }, [index, setPhase, minutes])

    
    useEffect(() => {
        let timeoutId;
        if (startTimer && time > 0) {
            timeoutId = setTimeout(() => {
            setTime(time - 1)
        }, 1000);}
        if (startTimer && time === 0) {
            handleNext()
            setStartTimer(false)
            notification && alarm.play()
        }
        return () => clearTimeout(timeoutId);
    }, [startTimer, time, ])


    useEffect(() => {
        if (startTimer && time > 0) {
            setTrackTime(trackTime + 1)
        };
    }, [time])

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return ( 
            <div className="timer-display" >
              <span>{minutes.toString().padStart(2, '0')}</span>
           
              <span>{remainingSeconds.toString().padStart(2, '0')}</span>
            </div>
          );
    };

    return (
        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} height={'450px'}>
            
            <Box textAlign={'center'} gap={'4px'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <span>{stage[index] === 'Focus' ? <PiBrainBold /> : <VscCoffee />} </span>
                <span>{stage[index]}</span>
            </Box>

            {<div style={{height:350}}>
            {settings 
                ? 
                <Settings /> 
                : 
                <Box  textAlign={'center'} fontSize={'200px'}>{formatTime(time)}</Box>
            }
            </div>
          }
            
            <Box display={'flex'} alignContent={'center'} justifyContent={'center'} gap={"20px"} sx={{ '& button': { m: 1 } }}>
              <div>
                <Button sx={{ borderRadius:20}} size="small" color={'secondary'} onClick={handleSettings} variant="contained" ><AiOutlineEllipsis size={20} /></Button>

                {! startTimer ? 
                    <Button  sx={{ borderRadius:"15px"}} size="large" variant="contained" onClick={handleStartTimer} ><FaPlay size={35} /></Button>
                : 
                <Button  sx={{ borderRadius:"15px"}} size="large" variant="contained" onClick={handleStartTimer} ><FaPause size={35} /></Button>
                }
                
                <Button sx={{ borderRadius:20}} size="small" color={'secondary'} variant="contained" onClick={handleNext}><TbPlayerTrackNextFilled size={20} /></Button>
              </div>  
            </Box >

        </Box>
    )
};

export default Timer;