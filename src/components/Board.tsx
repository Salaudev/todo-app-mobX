import React, {FC, useState} from "react";
import {EnumTodoStatus} from "../types/todo-item.interface";
import TodoItem from "./TodoItem";
import {FaPlus, FaSave} from "react-icons/fa";
import {Input, Typography} from "antd";
import TodoStore from "../store/todo-store";
import {observer} from "mobx-react-lite";
import {IoMdClose} from "react-icons/io";

const {TextArea} = Input

const Board: FC<{ statusKey: keyof typeof EnumTodoStatus }> = observer(({statusKey}) => {

        const [taskValue, setTaskValue] = useState<string>('')
        const [isOpenArea, setIsOpenArea] = useState<boolean>(false)

        const {todos, addTodo, moveTodo} = TodoStore

        // creation new Task
        const saveTask = (value: string) => {

            if (!value) {
                alert('Title cannot be empty!!!')

                return null
            }
            addTodo(value, EnumTodoStatus[statusKey])
            setIsOpenArea(false)
            setTaskValue('')
        }

        // drag and drop
        const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
            e.dataTransfer.setData("id", id);
        };

        const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault(); // Necessary to allow the drop
        };

        const handleDrop = (e: React.DragEvent<HTMLDivElement>, newStatus: keyof typeof EnumTodoStatus) => {
            e.preventDefault(); // It's good practice to call preventDefault on drop as well
            const id = e.dataTransfer.getData("id");
            moveTodo(id, EnumTodoStatus[statusKey]);
        };


        return <div className='w-1/5 bg-white p-5 shadow' onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, statusKey)}>
            <h2 className='font-bold text-lg mb-2'>{EnumTodoStatus[statusKey]}</h2>
            {
                todos.filter(todo => todo.status === EnumTodoStatus[statusKey]).map(todo => (<div key={todo.id}>
                    {
                        todo.status === EnumTodoStatus[statusKey]
                            ?
                            <div draggable={true}
                                 onDragStart={(e) => handleDragStart(e, todo.id)}>
                                <TodoItem {...todo}/>
                            </div>
                            :
                            null
                    }
                </div>))
            }

            <div>
                {
                    isOpenArea ?
                        <div>
                            <TextArea value={taskValue} onChange={(e) => setTaskValue(e.target.value)}/>
                            <div
                                className='flex items-center w-full rounded mt-2 p-0.5 gap-1'>
                                <button onClick={() => saveTask(taskValue)}
                                        className={'flex bg-gray-300 pl-1 flex-1 items-center gap-2 rounded'}>
                                    <FaSave/> <span>Save</span>
                                </button>
                                <button onClick={() => setIsOpenArea(false)}>
                                    <IoMdClose/>
                                </button>
                            </div>

                        </div>
                        :
                        <button onClick={() => setIsOpenArea(true)}
                                className='flex w-full items-center gap-2 bg-gray-200 rounded p-0.5 cursor-pointer flex-1'>
                            <FaPlus/>
                            <Typography>
                                Add new Task
                            </Typography>
                        </button>
                }
            </div>


        </div>
    }
)
export default Board