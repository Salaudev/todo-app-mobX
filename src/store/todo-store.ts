import {EnumTodoStatus, ITodo} from "../types/todo-item.interface";
import {nanoid} from "nanoid";
import {configure, makeAutoObservable, reaction, runInAction} from "mobx";
import {todoService} from "../services/todo.service";

configure({
    enforceActions: "always",
})

export class Todo implements ITodo {
    id: string;
    title: string;
    status: EnumTodoStatus;
    createdat: Date;

    constructor(id: string, title: string, status: EnumTodoStatus = EnumTodoStatus.BACK_LOG, createdat:Date) {
        this.id = id;
        this.title = title;
        this.status = status;
        this.createdat = createdat
        makeAutoObservable(this)

        reaction(
            () => this.status,
            async (newStatus) => {
                try {
                    await todoService.changeStatus(this.id, newStatus);
                    console.log(`Status updated to ${newStatus} for Todo ${this.id}`);
                } catch (error) {
                    console.error(`Failed to sync status update with server for Todo ${this.id}:`, error);
                }
            }
        );
    }
}

class TodoStore {
    todos: Todo[] = [];

    constructor() {
        makeAutoObservable(this);
        this.fetchTodos();

    }

    fetchTodos = async () => {
        const fetchedTodos = await todoService.getTodos();
        runInAction(() => {
            this.todos = fetchedTodos.map(todoData => new Todo(todoData.id, todoData.title, todoData.status, todoData.createdat));
        });
    };

    addTodo = async (title: string, status: EnumTodoStatus) => {

        if (!title) {
            alert("Title cannot be empty!")
            return null
        }

        const todo = await todoService.createTodo({title, status})

        this.todos.push(new Todo(todo.id, todo.title, todo.status, todo.createdat));
    }

    removeTodo = async (id: string) => {
        this.todos = this.todos.filter(todo => todo.id !== id);
        await todoService.deleteTodo(id)
    }

    moveTodo = (id: string, status: EnumTodoStatus) => {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            runInAction(() => {
                todo.status = status;
            });
        }
    }

    editTodo = async (id: string, title: string, status?: EnumTodoStatus) => {
        const todo = this.todos.find(todo => todo.id === id);

        await todoService.updateTodo(id, title)

        if (todo) {
            if (title !== undefined) {
                todo.title = title;
            }
            if (status !== undefined) {
                todo.status = status;
            }
        }
    }
}

export default new TodoStore()