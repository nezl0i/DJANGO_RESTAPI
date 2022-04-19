import React from 'react'
import '../bootstrap/css/bootstrap.css'

class TodoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'project': 0,
            'text': '',
            'users': 0
        }
    }

    handleSubmit(event) {
        this.props.newTodo(this.state.projects, this.state.text, this.state.users)
        event.preventDefault()
    }

    handleTodoUsersChange(event) {
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

    handleTodoProjectsChange(event) {
        if (!event.target.selectedOptions) {
            return
        }
        let projects = []
        for (let i = 0; i < event.target.selectedOptions.length; i++) {
            let todoProject = parseInt(event.target.selectedOptions.item(i).value)
            projects.push(todoProject)
        }
        this.setState({
            'projects': projects
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
                                className="text-center font-weight-light my-4">Создание заметки</h3>
                            </div>
                            <div className="card-body">
                                <form onSubmit={(event) => this.handleSubmit(event)}>
                                    <div className="form-group">
                                        <label className="small mb-1">Проект</label>
                                        <select className="form-control"
                                                onChange={(event) => this.handleTodoProjectsChange(event)}>
                                            {this.props.projects.map((project) => <option
                                                value={project.id}>{project.name}</option>)}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="small mb-1">Пользователь</label>
                                        <select className="form-control"
                                                onChange={(event) => this.handleTodoUsersChange(event)}>
                                            {this.props.users.map((user) => <option
                                                value={user.id}>{user.username}</option>)}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="small mb-1">Описание</label>
                                        <textarea className="form-control"

                                                  name="text"
                                                  placeholder="text"
                                                  onChange={(event) => this.handleChange(event)}
                                                  value={this.state.text}
                                                  rows="10"
                                        />
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

export default TodoForm