import { createContext, useState } from 'react';
import { parsedData } from '../utils/locally-stored-data';


export const ItemsContext = createContext({
    itemLists: {},
    setItemLists: () => {},
    addItem: () => {},
    removeItem: () => {},
    selectItem: null,
    setSelectItem: () => {},
    isSelected: false,
    setIsSelected: () => {},
    updateTime: () => {},
    addProject: () => {},
    removeProject: () => {},
    editProjectName: () => {},
    editItem: () => {},
    minimizeProject: () => {},
});

export const ItemsProvider = ({children}) => {
    
    const [projectsList, setProjectsList] = useState(parsedData);
    const [selectItem, setSelectItem] = useState({
        itemId: null,
        index: 0,
        container: '',
    });
    const [isSelected, setIsSelected] = useState(false);

    const addProject = () => {
        const uid = `id${Date.now()}`;
        const newProjectsArray = [...projectsList.projects];
        newProjectsArray.unshift({
            projectInfo: {
                projectTitle: '',
                projectId: uid,
                minimize: false,
            },
            thingsToDo: [ {item: "Things To Do", uid: `${uid+'thingsToDo'}`, time: 0}, ],
            inProgress: [ {item: "In Progress", uid: `${uid+'inProgress'}`, time: 0}, ],
            complete: [ {item: "Complete", uid: `${uid+'complete'}`, time: 0}, ],
            duplicateMap: {}
        });

        const newNumberOfProjects = projectsList.numberOfProjects + 1
        const newProjectsList = {...projectsList, projects: newProjectsArray, numberOfProjects: newNumberOfProjects}
        setProjectsList(newProjectsList)
    };

    const removeProject = (index) => {
        const newProjectsArray = [...projectsList.projects];
        newProjectsArray.splice(index, 1);
        const newNumberOfProjects = projectsList.numberOfProjects - 1
        setProjectsList({...projectsList, projects: newProjectsArray, numberOfProjects: newNumberOfProjects})

    };

    const editProjectName = (index, projectName) => {
        const newProjectsArray = [...projectsList.projects];
        newProjectsArray[index].projectInfo.projectTitle = projectName;
        setProjectsList({...projectsList, projects: newProjectsArray})
    };

    const minimizeProject = (index) => {
        const newProjectsArray = [...projectsList.projects];
        if (! newProjectsArray[index].projectInfo['minimize'] ){
            newProjectsArray[index].projectInfo['minimize'] = true
        } else {
            newProjectsArray[index].projectInfo['minimize'] = false
        };
        setProjectsList({...projectsList, projects: newProjectsArray})
        
    };
 
    const addItem = (index, container, newItem, time) => {
        let isDuplicate = false;
        if (projectsList.projects[index].duplicateMap[newItem]) {
            isDuplicate = true;
            alert("You already have this task in your project's list. Delete one if you need to.")
        }
        const uid = `id${Date.now()}`;
        const newProjectArray = [...projectsList.projects];
        newProjectArray[index][container].push({item: newItem, time, uid});
        if (! isDuplicate) {
            newProjectArray[index].duplicateMap[newItem] = "exists";
        }
        setProjectsList({...projectsList, projects: newProjectArray})
    };

    const removeItem = (index, container, uid) => {
        let itemName = '';
        const newProjectArray = [...projectsList.projects];
        newProjectArray[index][container] = newProjectArray[index][container].reduce((result, item) => {
            if (item.uid === uid) {
                itemName = item.item
                delete newProjectArray[index].duplicateMap[itemName]
                
            } else {
                result.push(item)
            }
            return result;
        }, []);
        setProjectsList({...projectsList, projects: newProjectArray})
    };

    const editItem = (index, container, uid, newItemName) => {
        const newProjectArray = [...projectsList.projects];
        newProjectArray[index][container] = newProjectArray[index][container].map((item) => {
            if (item.uid === uid) {
                return {...item, item: newItemName}
            } else { return item }
        })
        setProjectsList({...projectsList, projects: newProjectArray})
    };

    const updateTime = (trackedTime) => {
        const {itemId, index, container} = selectItem
        if (! itemId) {return}
        const newProjectArray = [...projectsList.projects];
        
        newProjectArray[index][container] = newProjectArray[index][container].map((item) => {
            if ( item.uid === itemId) {
                return {...item, time: item.time + trackedTime}
            } else { return item }
        });

        newProjectArray[index]['time'] = newProjectArray[index][container].reduce((acc, item) => {
            return item.time >= 0 ? acc + item.time : 0
        }, 0)

        setProjectsList({...projectsList, projects: newProjectArray})
       
    };

    const value = {
        projectsList, setProjectsList, 
        addItem,
        removeItem, 
        selectItem, setSelectItem, 
        addProject,
        removeProject,
        isSelected, setIsSelected,
        updateTime,
        editProjectName,
        editItem,
        minimizeProject,
    };

    return(
        <ItemsContext.Provider value={value}>
            {children}
        </ItemsContext.Provider>
    )

};

