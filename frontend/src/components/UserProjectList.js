import {useParams} from 'react-router-dom'
import React from "react";


const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>{project.name}</td>
            <td>{project.users}</td>
            <td>{project.repository}</td>
        </tr>
    )
}


const UserProjectList = ({projects}) => {
    let {id} = useParams()
    let filteredProjects = projects.filter((project) => project.users.includes(parseInt(id)))

    return (
        <div className="container">
            <div className="card-header"><h3
                className="text-center font-weight-light my-4">Заметки пользователя</h3>
            </div>
            <table className="table table-striped">
                <th>Name</th>
                <th>User</th>
                <th>Repository</th>
                {filteredProjects.map((project) => <ProjectItem project={project} />)}
            </table>
                </div>
    )
}

export default UserProjectList