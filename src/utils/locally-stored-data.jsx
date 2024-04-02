const retrievedData = localStorage.getItem('myLocalStorage');


export const parsedData = retrievedData ? JSON.parse(retrievedData) : {
    projects: [],
    numberOfProjects: 0,
}


// export const parsedData = retrievedData ? JSON.parse(retrievedData) : {
//     project1: {
//         projectInfo: {
//             projectTitle: '',
//         }
//         thingsToDo: [['Things To Do']],
//         inProgress: [['In Progress']],
//         complete: [['Complete']],
//         duplicateMap: {},
//     }
// }





// export const parsedData = {
//     projects: [
//         {project: {
//             projectInfo: {
//                 projectTitle: '',
//                 projectId: '',
//             },

//             thingsToDo: [
//                 [
//                     "Things To Do"
//                 ],
//         ],
//             inProgress: [
//                 [
//                     "In Progress"
//                 ],
//             ],
//             complete: [
//                 [
//                     "Complete"
//                 ],
//             ],
//             duplicateMap: {

//             }
//         }}
//     ],

//     numberOfProjects: 1
// }