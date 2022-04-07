import {Link} from 'react-router-dom'
import React from "react";

function UserItem(props) {
    return (
        <tr>
            <td><Link to={`/user/${props.user.id}`}>{props.user.username}</Link></td>
            <td>{props.user.first_name}</td>
            <td>{props.user.last_name}</td>
            <td>{props.user.email}</td>
            <td>{props.user.is_active && String.fromCodePoint(parseInt("2714", 16))}</td>
        </tr>
    )
}


const UserList = ({users}) => {
    return (
        <div className="container">
            <div className="card-header"><h3
                className="text-center font-weight-light my-4">Пользователи</h3>
            </div>
            <table className="user-list table table-striped">
                <th>Username</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Email</th>
                <th>isActive</th>
                {users.map((user) => <UserItem user={user}/>)}
            </table>
        </div>
    )
}

export default UserList;

