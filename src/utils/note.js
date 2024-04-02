const itemLists = {

    project1 : {
        projectInfo: {
            title: 'title',
            projectTotalTime: function () {
                return (this.thingsToDo.time + this.inProgress.time + this.complete.time)
            }
        },
        thingsToDo: {
            items: [
                ["Things To Do"],
                {
                    "item": "name of item1",
                    "note": "notes",
                    "time": 10
                },
                {
                    "item": "name of item2",
                    "note": "notes",
                    "time": 10
                },
                {
                    "item": "name of item3",
                    "note": "notes",
                    "time": 10
                }
        
            ],
            time: 30
        },
        inProgress: {
            items: [["In Progress"]],
            time: 0
        
        },
        complete: {
            item: [["Complete"]],
            time: 0
        },

        duplicateMap: {
            "name of item1": "exists",
            "name of item2": "exists",
            "name of item3": "exists",
        }
    },
};