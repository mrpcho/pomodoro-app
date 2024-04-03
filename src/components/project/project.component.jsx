import { useState, useContext } from 'react';
import { ItemsContext } from '../../contexts/items.context';
import Box from '@mui/material/Box';
import ItemContainer from '../item-container/item-container.component';
import TextField from '@mui/material/TextField';
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded';import EditIcon from '@mui/icons-material/Edit';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import './project.styles.css';

const containers = [ 
    ['Things to do', 'thingsToDo'], 
    ['In progress', 'inProgress'], 
    ['Complete', 'complete'], 
];

const Project = ({project, projectIndex}) => {
    const [ minimize, setMinimize ] = useState(false)
    const [projectName, setProjectName] = useState(project.projectInfo.projectTitle)
    const [edit, setEdit] = useState(false)
    const {removeProject, editProjectName, minimizeProject} = useContext(ItemsContext);
 
    const removeProjectHandler = () => {
        if (window.confirm('Are you sure you want to delete this project?'))
        {removeProject(projectIndex)}
        else { return }
    };

    const onMinimizeHandler = () => {
        minimizeProject(projectIndex)
        ! minimize ? setMinimize(true) : setMinimize(false);
    };

    const onChangeHandler = (event) => {
        setProjectName(event.target.value)
    };

    const onEnterHandler = (event) => {
        if (event.key === 'Enter') {
            editProjectName(projectIndex, event.target.value)
            setEdit(false)
        };
    };

    const onEditHandler = () => {
        ! edit ? setEdit(true) : setEdit(false)
    };

    return(
        <Draggable draggableId={project.projectInfo.projectId} index={projectIndex}>
            {(provided) => {
                return(
                    <Box 
                    ref={provided.innerRef} 
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    bgcolor={'primary.project'}
                    margin={'auto'}
                    marginTop={'5px'}
                    marginBottom={'20px'}
                    borderRadius={'20px'}
                    maxWidth={'1050px'}
                    width={'100%'}
                    padding={'30px'}
                    paddingTop={'0px'}
                    paddingBottom={'20px'}>
                        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} >
                            
                            {! project.projectInfo.projectTitle ||  edit ?
                            <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={'20px'} maxWidth={'500px'} width={'100%'} margin={'20px'} marginLeft={'0'}>
                                    
                                    <TextField placeholder={project.projectInfo.projectTitle ?
                                    project.projectInfo.projectTitle :
                                    'What project are you working on?'} onKeyDown={onEnterHandler} onChange={onChangeHandler} value={projectName} fullWidth variant='standard' 
                                    inputProps={{style: {fontSize: '150%'}}} />
                                </Box>:
                                
                                
                                <h2 className='mouseTypeButtons'>
                                    {project.projectInfo.projectTitle}  
                                    <EditIcon onClick={onEditHandler} />
                                    {project.time && `  (${Math.floor(project.time / 60)} min)`}

                                </h2>}
                                
                            
                            <Box id={project.projectInfo.uid} 
                                className='mouseTypeButtons'
                                display={'flex'}
                                alignItems={'center'}>
                                <HorizontalRuleRoundedIcon onClick={onMinimizeHandler} cursor={'default'} />
                                <span onClick={removeProjectHandler}>&#10005;</span>
                            </Box>
                        </Box>

                        {! project.projectInfo.minimize ?

                        <Box 
                            display={'flex'}
                            flexDirection={'row'}
                            flexWrap={'wrap'}
                            gap={'40px'}
                            alignItems={'flex-start'}
                            >
                            {containers.map( (container) => {
                                return(
                                    <Droppable droppableId={`${project.projectInfo.projectId + container[1]}`} key={container[0]} >
                                        {(provider) => {
                                            return(
                                                <div ref={provider.innerRef} {...provider.droppableProps} className='mouseType'>
                                                    <ItemContainer key={container[1]} container={container} project={project} index={projectIndex}/>
                                                    {provider.placeholder}
                                                </div>
                                            )
                                        }}
                                    </Droppable>
                                    
                                )
                            } )}
                        </Box>
                        : 
                        <Box width={'100%'}></Box>}
                    </Box>        
                 )
            }}

        </Draggable>

    )
};

export default Project

