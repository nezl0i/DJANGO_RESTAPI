import {Link} from 'react-router-dom'

function UserItem(props) {
    return (
        <tr>
            <td align='center'><Link  to={`/user/${props.user.id}`} >{props.user.username}</Link></td>
            <td align='center'>{props.user.first_name}</td>
            <td align='center'>{props.user.last_name}</td>
            <td align='center'>{props.user.email}</td>
            <td align='center'>{props.user.is_active && String.fromCodePoint(parseInt("2714", 16))}</td>
        </tr>
    )
}


const UserList = ({users}) => {
    return (
        <div className="container">
            <table className="user-list table table-striped">
                <th>Username</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Email</th>
                <th>isActive</th>
                {users.map((user) => <UserItem user={user} />)}
            </table>
        </div>
    )
}

export default UserList;

