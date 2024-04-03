import Box from '@mui/material/Box'
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import { useState, useContext } from 'react';
import { ItemsContext } from '../../contexts/items.context';
import { GiTomato } from "react-icons/gi";
import './item.style.css'

const Item = ({time, item, itemIndex, projectIndex, container}) => {

    const [edit, setEdit] = useState(false);
    const [edittedItem, setEdittedItem] = useState(item.item);
    const { editItem, removeItem, selectItem, setSelectItem } = useContext(ItemsContext)

   
    const onChangeHandler = (event) => {
        setEdittedItem(event.target.value)
    };

    const onEnterHandler = (event) => {
        if (event.key === 'Enter') {
            editItem(projectIndex, container[1], item.uid, event.target.value)
            
            setEdit(false)
        };
    };

    const onEditHandler = () => {
        ! edit ? setEdit(true) : setEdit(false)
    };


    const removeItemHandler = (event) => {
        const itemId = event.target.id;
        removeItem(projectIndex, container[1], itemId)
        
    };

    const selectItemHandler = (event) => {
        
        if (container[1] === 'inProgress') {
            event.target.id === selectItem.itemId 
            ? setSelectItem({}) 
            : setSelectItem({itemId: event.target.id, index : projectIndex, container : container[1]})
        } else {
            setSelectItem({})
        }
    };

    

    return(
        itemIndex === 0 ? 
        <h3 key={item.uid}>
            {item.item} ({time} min)
        </h3> :
        
        <div>
             
            {edit ? 
            <Box key={item.uid} display={'flex'} justifyContent={'space-between'} alignItems={'center'}
            bgcolor={'primary.main'} borderRadius={'15px'} marginBottom={'5px'} padding={'10px'} gap={'5px'}>
                <TextField size="small" fullWidth value={edittedItem} onChange={onChangeHandler} onKeyDown={onEnterHandler}/> 
                <EditIcon id={item.uid} fontSize='small' onClick={onEditHandler} />
            </Box>
            : 

            <Box key={item.uid} display={'flex'} justifyContent={'space-between'} alignItems={'flex-start'} bgcolor={'primary.main'} borderRadius={'15px'} marginBottom={'5px'} padding={'10px'}>
                <Box display={'flex'} justifyContent={'flex-start'} >
                    
                    {container[1] === 'inProgress' 
                    ? <Box className={'itemMouse'} marginRight={'5px'} >
                        <GiTomato size={'15'} color={selectItem.itemId === item.uid ? 'red' : 'gray'}/>
                      </Box>
                    : null}
                    
                
                    <Box className={'itemMouse'} id={item.uid} onClick={selectItemHandler} display={'flex'} flexWrap={'wrap'} gap={'5px'}>
                        {container[1] ==='complete' ? <s>{item.item}</s> : item.item} 
                        <Box>({Math.floor(item.time / 60)} min)</Box>
                    </Box>
                </Box>
                <Box className={'itemMouseTypeButtons'} display={'flex'} justifyContent={'flex-end'} alignItems={'center'} gap={'2px'} >
                    <EditIcon id={item.uid} fontSize='small' onClick={onEditHandler} />
                    <div onClick={removeItemHandler} id={item.uid}>&#10005;</div>
                </Box>
            </Box>
            }

        </div>
)
};

export default Item