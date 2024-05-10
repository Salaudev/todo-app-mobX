import React, {FC} from 'react';
import './styles/App.css';
import {EnumTodoStatus} from "./types/todo-item.interface";
import Board from "./components/Board";
import {Typography} from "antd";


const { Title } = Typography;

const App: FC = () => {
    return (
        <div className="App">
            <header>
                <Title level={3}>Salauat | Todo app using React , typescript , mobx</Title>
            </header>
            <div className='capitalize flex gap-2 px-5 mt-2'>
                {Object.keys(EnumTodoStatus).map((key) => {
                    const statusKey = key as keyof typeof EnumTodoStatus;
                    return (
                        <Board key={key} statusKey={statusKey}/>
                    );
                })}
            </div>
        </div>
    );
}
export default App;
