import { useState, useContext } from 'react';
// import ListItem from '@mui/material/ListItem';
import Box from "@mui/material/Box";
import Switch from '@mui/material/Switch';

import { ColorModeContext } from '../../contexts/color-mode.contexts';
import { SoundContext } from '../../contexts/sound.context';
import './settings.styles.css';
import MinutesInput from '../minutes-input/minutes-input.component';



const Settings = () => {
    const { mode, toggleColorMode } = useContext(ColorModeContext);
    const { notification, toggleNotification } = useContext(SoundContext);
    
    const [isDarkMode, setIsDarkMode] = useState(mode === 'dark'); // Initialize from context
    const [isNotificationOn, setIsNotificationOn] = useState(notification); // Initialize from context

    const handleColorMode = () => {
        setIsDarkMode(!isDarkMode);
        toggleColorMode(mode)
    };

    const handleNotification = () => {
        setIsNotificationOn(!isNotificationOn);
        toggleNotification(notification)
    };



    return (
    
        <Box
            sx={{
                display:"flex",
            width:'250px',
            padding: '15px',
            flexDirection:"column", 
            justifyContent:"space-between",
            bgcolor:'primary.setting',
            borderRadius:"16px",
            margin:'auto',
            gap: "15px",
            
            }} 
            >

            <Box>
                
                <span>Dark Mode</span>
                <Switch onChange={handleColorMode} checked={mode === 'dark' ? true : false} />
                
            </Box>

            <MinutesInput label="Focus minutes" phase='focus' />
            <MinutesInput label="Short break minutes" phase='short' />
            <MinutesInput label="Long break minutes" phase='long' />

            <Box >
                Notifications
                <Switch onChange={handleNotification} checked={notification ? true : false} />
            </Box>
        </Box>
        
)};

export default Settings;