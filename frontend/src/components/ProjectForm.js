import React from 'react'

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
    }

    handleUsersChange(event) {
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

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        this.handleChange = this.handleChange.bind(this)
        return (
            <form onSubmit={(event) => this.handleSubmit(event)} >
                <input
                    type="text"
                    name="name"
                    placeholder="name"
                    onChange={(event) => this.handleChange(event)}
                    value={this.state.name}
                />
                <input
                    type="url"
                    name="repository"
                    placeholder="repository"
                    onChange={(event) => this.handleChange(event)}
                    value={this.state.repository}
                />
                <select multiple onChange={(event) => this.handleUsersChange(event)}>
                    {this.props.users.map((user) => <option value={user.id}>{user.username}</option>)}
                </select>

                <input type="submit" value="Create" />
            </form>
        )
    }
}

export default ProjectForm