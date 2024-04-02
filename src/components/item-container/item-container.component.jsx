import { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { ItemsContext } from '../../contexts/items.context';
import './item-container.styles.css';
import { Draggable } from 'react-beautiful-dnd';
import Item from '../item/item.component';

const ItemContainer = ({index, container}) => {
   
    const [value, setValue] = useState('');
    const { projectsList, addItem } = useContext(ItemsContext);

    const onChangeHandler = (event) => {
        setValue(event.target.value)
    };

    const onEnterHandler = (event) => {
        if (event.key === 'Enter') {
            addItem(index, container[1], value, 0)
            setValue('');
        };
    };

    const displayTime = () => {
        const time = projectsList.projects[index][container[1]].reduce((acc, item) => {
            
            return item.time >= 0 ? acc + item.time : 0
        } , 0);

        const minutes = Math.floor(time / 60);
        return minutes
    };
    const time = displayTime()
    
    
    return(
        <Box 
            sx={{
                bgcolor:'primary.setting',
                width: '300px',
                padding:'20px',
            }}
            borderRadius={"16px"}>
                
                
                <Box display={'flex'} flexDirection={'column'}>
                    {projectsList.projects[index][container[1]].map((item, itemIndex) => {
                        
                        return(
                            <Draggable 
                            key={item.uid} 
                            draggableId={item.uid} 
                            index={itemIndex} 
                            isDragDisabled={itemIndex === 0} >
                                
                                {(provided) => {
                                    return(
                                        <div  ref={provided.innerRef}
                                        {...provided.dragHandleProps}
                                        {...provided.draggableProps}>
                                            <Item 
                                                time={time}
                                                item={item} 
                                                itemIndex={itemIndex} 
                                                projectIndex={index} 
                                                container={container} />
                                            
                                        </div>
                                    )
                                }}
                            </Draggable>
                        )
                    })}
                    
                    <TextField 
                    id="outlined-basic" 
                    label="+ Add Item" 
                    size="small" 
                    variant='standard' 
                    onKeyDown={onEnterHandler}
                    onChange={onChangeHandler}
                    value={value}
                    
                    />
                </Box>
        </Box>
    )
};

export default ItemContainer;

