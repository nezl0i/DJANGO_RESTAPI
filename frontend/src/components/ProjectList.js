import React, {useState} from "react";


const ProjectItem = ({project, deleteProject}) => {
    return (
        <tr>
            <td>{project.name}</td>
            <td>{project.users}</td>
            <td>{project.repository}</td>
            <td>
                <button className="btn btn-danger" onClick={() => deleteProject(project.id)}>Delete</button>
            </td>
        </tr>
    )
}


const ProjectList = ({projects, deleteProject}) => {

    const [value, setValue] = useState('')

    const filteredProjects = projects.filter(project => {
        return project.name.includes(value)
    })

    return (
        <div className="container">
            <div className="card-header"><h3
                className="text-center font-weight-light my-4">Проекты</h3>
            </div>
            <div className="form-control">
                <form className="search-form">
                    <input
                        type="text"
                        className="search-input form-control"
                        placeholder="Search project"
                        onChange={(event) => setValue(event.target.value)}
                    />
                </form>
            </div>

            <table className="table table-striped">
                <th>Name</th>
                <th>Users</th>
                <th>Repository</th>
                <th> </th>
                {filteredProjects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}

            </table>
            <div className="card">
                <a href="/projects/create" className="text-center btn btn-secondary btn-block">Create</a>
            </div>
        </div>
    )
}

export default ProjectList

