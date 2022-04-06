import React from 'react'

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
        for (let i=0; i < event.target.selectedOptions.length; i++) {
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
        for (let i=0; i < event.target.selectedOptions.length; i++) {
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
            <form onSubmit={(event) => this.handleSubmit(event)} >
                <select onChange={(event) => this.handleTodoProjectsChange(event)}>
                    {this.props.projects.map((project) => <option value={project.id}>{project.name}</option>)}
                </select>

                <select onChange={(event) => this.handleTodoUsersChange(event)}>
                    {this.props.users.map((user) => <option value={user.id}>{user.username}</option>)}
                </select>

                <input
                    type="text"
                    name="text"
                    placeholder="text"
                    onChange={(event) => this.handleChange(event)}
                    value={this.state.text}
                />
                <input type="submit" value="Create" />
            </form>
        )
    }
}

export default TodoForm