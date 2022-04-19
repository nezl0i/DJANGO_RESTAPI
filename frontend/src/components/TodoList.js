import {Link} from "react-router-dom";
import React from "react";

const TodoItem = ({todo, deleteTodo}) => {
    return (
        <tr>
            <td>{todo.id}</td>
            <td>{todo.text}</td>
            <td>{todo.create}</td>
            <td>{todo.creator}</td>
            <td>{todo.is_active && String.fromCodePoint(parseInt("2714", 16))}</td>
            <td><button className="btn btn-danger" onClick={()=>deleteTodo(todo.id)}>Delete</button></td>
        </tr>
    )
}


const TodoList = ({todos, deleteTodo}) => {
    return (
        <div className="container">
            <div className="card-header"><h3
                className="text-center font-weight-light my-4">Заметки</h3>
            </div>
            <table className="table table-striped">
                <th>ID</th>
                <th>Project</th>
                <th>Create</th>
                <th>User</th>
                <th>Active</th>
                <th> </th>
                {todos.map((todo) => <TodoItem todo={todo} deleteTodo={deleteTodo}/>)}

            </table>
            <div className="card">
                <a href="/todo/create" className="text-center btn btn-secondary btn-block">Create</a>
            </div>

        </div>


    )
}

export default TodoList