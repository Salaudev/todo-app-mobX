export interface ITodo {
    id: string
    title: string
    status: EnumTodoStatus
    createdat?: Date
}


export enum EnumTodoStatus {
    BACK_LOG = 'Backlog',
    TODO = 'Todo',
    IN_PROGRESS = 'In progress',
    TEST = 'Test',
    DONE = 'Done',
}