import instance from "../api/api";
import {EnumTodoStatus, ITodo} from "../types/todo-item.interface";
import {Todo} from "../store/todo-store";


class TodoService {
    getTodos = async () => {
        try {
            const res: { data: Todo[] } = await instance.get('/todos')

            return res.data
        } catch (error) {
            console.error('Failed to fetch todos:', error);
            throw error;
        }
    }

    createTodo = async (todo: Pick<ITodo, "title" | "status">) => {
        try {

            console.log(todo)
            const response = await instance.post('/todos', todo);

            return response.data[0];
        } catch (error) {
            console.error('Failed to create todo:', error);
            throw error;
        }
    };

    deleteTodo = async (id: string) => {
        try {

            const response = await instance.delete(`/todos?id=eq.${id}`);

            console.log("Delete", response)

            return response.data[0];
        } catch (error) {
            console.error('Failed to create todo:', error);
            throw error;
        }
    };

    updateTodo = async (id: string, title: string) => {
        try {
            const response = await instance.put(`/todos?id=eq.${id}`, {id, title});

            console.log("Delete", response)

            return response.data[0];
        } catch (error) {
            console.error('Failed to create todo:', error);
            throw error;
        }
    };


    changeStatus = async (id: string, status: EnumTodoStatus) => {
        try {
            const response = await instance.patch(`/todos?id=eq.${id}`, {id, status});

            console.log("changeStatus", response)

            return response.data[0];
        } catch (error) {
            console.error('Failed to create todo:', error);
            throw error;
        }
    };

}



export const  todoService = new TodoService()