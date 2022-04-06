import {Link} from "react-router-dom";

const TodoItem = ({todo, deleteTodo}) => {
    return (
        <tr>
            <td align='center'>{todo.project}</td>
            <td align='center'>{todo.text}</td>
            <td align='center'>{todo.create}</td>
            <td align='center'>{todo.creator}</td>
            <td align='center'>{todo.is_active && String.fromCodePoint(parseInt("2714", 16))}</td>
            <td align='center'><button className="btn-light" onClick={()=>deleteTodo(todo.id)}>Delete</button></td>
        </tr>
    )
}


const TodoList = ({todos, deleteTodo}) => {
    return (
        <div className="container">
            <table className="table-light">
                <th>Project</th>
                <th>Text</th>
                <th>Create</th>
                <th>User</th>
                <th>Active</th>
                <th> </th>
                {todos.map((todo) => <TodoItem todo={todo} deleteTodo={deleteTodo}/>)}

            </table>
            <Link marginLeft="50" to='/todo/create'>Create</Link>
        </div>


    )
}

export default TodoList