import {useParams} from 'react-router-dom'


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
        <table>
            <th>Name</th>
            <th>User</th>
            <th>Repository</th>
            {filteredProjects.map((project) => <ProjectItem project={project} />)}
        </table>
    )
}

export default UserProjectList