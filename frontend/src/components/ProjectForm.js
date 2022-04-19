import React from 'react'
// import {useHistory} from 'react-router-dom'
//
// const history = useHistory()


class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'name': '',
            'users': 0,
            'repository': ''
        }
    }

    handleSubmit(event) {
        this.props.newProject(this.state.name, this.state.users, this.state.repository)
        event.preventDefault()
        // history.push("/");
        // this.event.history.push('/projects');
    }

    handleSuccess = (props) => {
        this.setState({
            name: this.state.name,
            users: this.state.users,
            repository: this.state.repository
        });
        props.history.push('/projects');
    }


    handleUsersChange(event) {
        if (!event.target.selectedOptions) {
            return
        }

        let users = []
        for (let i = 0; i < event.target.selectedOptions.length; i++) {
            let iUser = parseInt(event.target.selectedOptions.item(i).value)
            users.push(iUser)
        }

        this.setState({
            'users': users
        })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-5">
                        <div className="card shadow-lg border-0 rounded-lg mt-2">
                            <div className="card-header"><h3
                                className="text-center font-weight-light my-4">Создание проекта</h3>
                            </div>
                            <div className="card-body">
                                <form onSubmit={(event) => this.handleSubmit(event)}>
                                    <div className="form-group">
                                        <label className="small mb-1">Проект</label>
                                        <input className="form-control"
                                               type="text"
                                               name="name"
                                               placeholder="name"
                                               onChange={(event) => this.handleChange(event)}
                                               value={this.state.name}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="small mb-1">Репозиторий</label>
                                        <input className="form-control"
                                               type="url"
                                               name="repository"
                                               placeholder="repository"
                                               onChange={(event) => this.handleChange(event)}
                                               value={this.state.repository}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="small mb-1">Пользователь</label>
                                        <select className="form-control" multiple
                                                onChange={(event) => this.handleUsersChange(event)}>
                                            {this.props.users.map((user) => <option
                                                value={user.id}>{user.username}</option>)}
                                        </select>
                                    </div>
                                    <div className="card">
                                        <input className="text-center btn-success btn-secondary " type="submit"
                                               value="Create"/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProjectForm