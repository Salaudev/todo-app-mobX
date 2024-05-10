import {FC, useState} from "react";
import {EnumTodoStatus, ITodo} from "../types/todo-item.interface";
import {Card, Typography, Tooltip, Input} from "antd";
import {FaEdit, FaSave, FaTrash} from "react-icons/fa";
import TodoStore from "../store/todo-store";
import moment from "moment";

const {TextArea} = Input

const TodoItem: FC<ITodo> = ({id, status, title, createdat}) => {
    const {editTodo, removeTodo} = TodoStore
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [taskValue, setTaskValue] = useState<string>(title)

    const ClickHandler = (newTitle: string, todoId: string) => {
        console.log("Click handling ...")
        if (isEditing) {
            console.log(newTitle)
            editTodo(todoId, newTitle)
            setIsEditing(false)
        } else {
            console.log('Editing...')
            setIsEditing(true)
        }
    }


    return <Card size="small" className='w-full mb-2 bg-gray-100 shadow'>
        <div className={'flex items-center'}>
            <div className='flex-1'>
                {
                    isEditing
                        ?
                        <TextArea
                            size={'large'}
                            value={taskValue}
                            onChange={(e) => setTaskValue(e.target.value)}/>
                        :
                        <div>
                            <Typography.Text strong>{title}</Typography.Text>
                            {
                                createdat && <div>
						<span
				    className={'text-stone-500 text-xs'}>{moment(createdat).format('MMMM Do YYYY, h:mm:ss a')}</span>
					  </div>
                            }
                        </div>
                }
            </div>
            <div className='ml-1 flex gap-1'>
                <Tooltip title="Edit Task" placement="top">
                    <button onClick={() => ClickHandler(taskValue, id)}
                            className="text-orange-500 hover:text-orange-700 transition-colors">
                        {
                            isEditing ? <FaSave/> : <FaEdit/>
                        }
                    </button>
                </Tooltip>

                <Tooltip title="Delete Task" placement="top">
                    <button onClick={() => removeTodo(id)}
                            className="text-red-500 hover:text-red-600 transition-colors">
                        <FaTrash/>
                    </button>
                </Tooltip>
            </div>
        </div>
    </Card>
}

export default TodoItem