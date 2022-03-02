import React from 'react';
import './App.css';
import UserList from './components/UserList.js'
import ProjectList from './components/ProjectList.js'
import TodoList from './components/TodoList.js'
import UserProjectList from './components/UserProjectList.js'
import axios from 'axios';
import {BrowserRouter, Route, Routes, Link, useLocation} from 'react-router-dom'


const NotFound = () => {
    let location = useLocation()
    return (
        <div> Page {location.pathname} not found </div>
    )
}


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todos': []

        }
    }

    componentDidMount() {
        axios
            .get('http://127.0.0.1:8009/api/users/')
            .then(response => {
                const users = response.data
                this.setState({
                        'users': users
                    })
            })
            .catch(error => console.log(error))
        axios
            .get('http://127.0.0.1:8009/api/projects/')
            .then(response => {
                const projects = response.data

                this.setState({
                    'projects': projects
                })
            })
            .catch(error => console.log(error))
        axios
            .get('http://127.0.0.1:8009/api/todo/')
            .then(response => {
                const todos = response.data

                this.setState({
                    'todos': todos
                })
            })
            .catch(error => console.log(error))
    }


    render() {
                return (
            <div>
                <BrowserRouter>
                    <nav>
                        <li><Link to='/'>Users</Link></li>
                        <li><Link to='/projects'>Projects</Link></li>
                        <li><Link to='/todo'>Todo_User</Link></li>
                    </nav>
                    <Routes>
                        <Route exact path='/' element = {<UserList users={this.state.users} />} />
                        <Route exact path='/projects' element = {<ProjectList projects={this.state.projects} />} />
                        <Route exact path='/todo' element = {<TodoList todos={this.state.todos} />} />
                        <Route path='/user/:id' element = {<UserProjectList projects={this.state.projects} />} />
                        <Route path="*" element = {<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
