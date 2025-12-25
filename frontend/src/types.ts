type TPriority =
    "low" |
    "medium" |
    "high"

type bool = boolean    

interface ITask {
    id: string
    name: string
    date: Date
    priority: TPriority
    completed: bool
}

export type {
    ITask, 
    TPriority, 
    bool
}