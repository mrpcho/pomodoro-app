import { useContext } from 'react';
import { TimeContext } from '../../contexts/time.context';

import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';




const MinutesInput = ({label, phase}) => {
    

    const { minutes, changeTime } = useContext(TimeContext);

    const onChangeHandler = (event) => {
        const value = event.target.value
        if (phase === 'focus') {
           
            changeTime(value, phase)
        } else if (phase === 'short') {
   
            changeTime(value, phase)
        } else {

            changeTime(value, phase)
        }
    };

    
    return (
        <Box>
            <TextField
            id="outlined-number"
            label={label}
            type="number"
            onChange={onChangeHandler}
            value={minutes[phase]}
            
         />
        </Box>
    )
};

export default MinutesInput


