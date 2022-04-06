import {Link} from 'react-router-dom'

function ProjectItem(props, deleteProject) {
    return (
        <tr>
            <td>{props.project.name}</td>
            <td>{props.project.users}</td>
            <td>{props.project.repository}</td>
            <td>
                <button onClick={() => deleteProject(props.project.id)}>Delete</button>
            </td>
        </tr>
    )
}


function ProjectList (props, deleteProject) {
    return (
        <table>
            <th>Name</th>
            <th>Users</th>
            <th>Repository</th>
            <th> </th>
            {props.projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}
            <Link to='/projects/create'>Create</Link>
        </table>
    )
}

export default ProjectList

