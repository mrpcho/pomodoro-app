import { useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { ItemsContext } from '../../contexts/items.context';
import Button from '@mui/material/Button';

import './board.styles.css'
import Project from '../project/project.component';



const Board = () => {
    const { projectsList, setProjectsList, addProject, setSelectItem } = useContext(ItemsContext)
    
    useEffect(() => {
        localStorage.setItem('myLocalStorage', JSON.stringify(projectsList));
    }, [projectsList])
    
    const handleDragDrop = (results) => {
        const {source, destination, type} = results;
        if (!destination) return;
        if (source.droppableId === destination.droppableId && source.index === destination.index) {return}
       
        // if drag and dropping projects
        if (type === 'group') {
            const reorderedProjects = [...projectsList.projects]
            const projectSourceIndex = source.index;
            const projectDestinationIndex = destination.index;

            const [removedProject] = reorderedProjects.splice(projectSourceIndex, 1);
            reorderedProjects.splice(projectDestinationIndex, 0, removedProject)
            return setProjectsList({...projectsList, projects: reorderedProjects})
        };

        // if drag and dropping items
        if (destination.index === 0) { return }
        const itemSourceIndex = source.index;
        const itemDestinationIndex = destination.index;
        
        const projectSourceContainer = source.droppableId.slice(15, );
        const projectDestinationContainer = destination.droppableId.slice(15,);
        
        // deselect selected item if item is being moved from inProgress to other container.
        if (projectSourceContainer === 'inProgress' && 
            (projectDestinationContainer === 'thingsToDo' || projectDestinationContainer === 'complete')) {
            setSelectItem({})
        }

        const projectSourceIndex = projectsList.projects.findIndex(
            (project) => project.projectInfo.projectId === source.droppableId.slice(0,15)
        );
        const projectDestinationIndex = projectsList.projects.findIndex(
            (project) => project.projectInfo.projectId === destination.droppableId.slice(0,15)
        );

        const newSourceItems = [...projectsList.projects[projectSourceIndex][projectSourceContainer]];
        const newDestinationItems = 
            source.droppableId !== destination.droppableId
                ? [...projectsList.projects[projectDestinationIndex][projectDestinationContainer]]
                : newSourceItems;
        const [deletedItem] = newSourceItems.splice(itemSourceIndex, 1);
        newDestinationItems.splice(itemDestinationIndex, 0, deletedItem);

        const newProjectsArray = {...projectsList};

        newProjectsArray.projects[projectSourceIndex][projectSourceContainer] = newSourceItems;
        newProjectsArray.projects[projectDestinationIndex][projectDestinationContainer] = newDestinationItems;
        setProjectsList(newProjectsArray);
    };


    return(
        <DragDropContext onDragEnd={handleDragDrop}>
            <Droppable droppableId='ROOT' type="group">
                {(provider) => {
                    return(
                        <Box 
                            ref={provider.innerRef} {...provider.droppableProps}
                            display={'flex'} 
                            flexDirection={'column'} 
                            flexWrap={'wrap'}
                            alignItems={'center'} 
                            justifyContent={'center'} 
                            gap={'5px'} 
                            maxWidth={'1050px'}
                            width={'100%'}
                            margin={'auto'}
                            marginBottom={'30px'}
                            >
                            <Box marginBottom={'20px'}>
                                <Button onClick={addProject} sx={{marginTop:'30px',}} variant='outlined'>+ Add Project</Button>
                            </Box>
                            {projectsList.numberOfProjects > 0 && 
                                projectsList.projects.map( (project, projectIndex) => {
                                    return(
                                       
                                        <Project key={project.projectInfo.projectId} project={project} projectIndex={projectIndex} />
                                    )})}
                
                            {provider.placeholder}
                            
                        </Box>
                    )
                }}

            </Droppable>
        </DragDropContext>
    )
}; 

export default Board;