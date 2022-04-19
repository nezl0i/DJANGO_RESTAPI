import React from 'react';
import './App.css';
import './bootstrap/css/bootstrap.css'
import UserList from './components/UserList.js'
import ProjectList from './components/ProjectList.js'
import TodoList from './components/TodoList.js'
import UserProjectList from './components/UserProjectList.js'
import LoginForm from './components/LoginForm.js'
import ProjectForm from './components/ProjectForm.js'
import TodoForm from './components/TodoForm.js'
import axios from 'axios';
import {BrowserRouter, Route, Routes, Link, useLocation} from 'react-router-dom'
import {Navbar,Container, Nav} from "react-bootstrap";

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
            'todos': [],
            'token': ''

        }
    }

    getData() {
        let headers = this.getHeader()
        axios
            .get('http://127.0.0.1:8009/api/users/', {headers})
            .then(response => {
                const users = response.data
                this.setState({
                        'users': users
                    })
            })
            .catch(error => console.log(error))
        axios
            .get('http://127.0.0.1:8009/api/projects/', {headers})
            .then(response => {
                const projects = response.data

                this.setState({
                    'projects': projects
                })
            })
            .catch(error => console.log(error))
        axios
            .get('http://127.0.0.1:8009/api/todo/', {headers})
            .then(response => {
                const todos = response.data

                this.setState({
                    'todos': todos
                })
            })
            .catch(error => console.log(error))
    }


    componentDidMount() {
        let token = localStorage.getItem('token')
        this.setState({
            'token': token
        }, this.getData)
    }

    isAuth() {
        return !!this.state.token
    }

    getHeader() {
        if (this.isAuth()) {
            return {
                'Authorization': 'Token ' + this.state.token
            }
        }
        return {}
    }

    getToken(login, password) {
        console.log(login, password)
        axios
            .post('http://127.0.0.1:8009/api-auth-token/', {'username': login, 'password': password})
            .then(response => {
                const token = response.data.token
                console.log(token)
                localStorage.setItem('token', token)
                this.setState({
                    'token': token
                }, this.getData)
            })
            .catch(error => console.log(error))
    }

    newProject(name, users, repo) {
        let headers = this.getHeader()
        axios
            .post('http://127.0.0.1:8009/api/projects/', {'name': name, 'users': users, 'repository': repo}, {headers})
            .then(response => {
                this.getData()
            })
            .catch(error => {
                console.log(error)
            })
    }

    newTodo(projects, text, users) {
        let headers = this.getHeader()

        axios
            .post('http://127.0.0.1:8009/api/todo/', {'project': projects[0], 'text': text, 'creator': users[0]}, {headers})
            .then(response => {
                this.getData()
            })
            .catch(error => {
                console.log(error)
            })
    }

    deleteProject(id) {
        const headers = this.getHeader()
        console.log(id);
        axios
            .delete(`http://127.0.0.1:8009/api/projects/${id}`, {headers})
            .then(response => {
                this.setState({projects: this.state.projects.filter((item)=>item.id !== id)})
        }).catch(error => console.log(error))
    }

    deleteTodo(id) {
        const headers = this.getHeader()
        console.log(id);
        axios
            .delete(`http://127.0.0.1:8009/api/todo/${id}`, {headers})
            .then(response => {
                this.setState({todos: this.state.todos.filter((item)=>item.id !== id)})
        }).catch(error => console.log(error))
    }

    logout() {
        localStorage.setItem('token', '')
        this.setState({
            'token': ''
        }, this.getData)
    }


    render() {
                return (
            <div className="container">

                    <Navbar bg="dark" variant="dark">
                        <Container>
                            <Navbar.Brand href="#">Menu</Navbar.Brand>
                            <Nav className="me-auto">
                                <Nav.Link href="/">Users</Nav.Link>
                                <Nav.Link href="/projects">Projects</Nav.Link>
                                <Nav.Link href="/todo">TodoMark</Nav.Link>

                                { this.isAuth() ? <Nav.Link onClick={()=>this.logout()} >Logout</Nav.Link> : <Nav.Link href='/login'>Login</Nav.Link> }

                            </Nav>
                        </Container>
                    </Navbar>
                 <BrowserRouter>
                    <Routes>
                        <Route exact path='/' element = {<UserList users={this.state.users} />} />
                        <Route exact path='/projects' element = {<ProjectList projects={this.state.projects} deleteProject={(id) => this.deleteProject(id)}/>} />
                        <Route exact path='/projects/create' element = {<ProjectForm users={this.state.users} newProject={(name, users, repo) => this.newProject(name, users, repo)}/>} />
                        <Route exact path='/todo' element = {<TodoList todos={this.state.todos} deleteTodo={(id) => this.deleteTodo(id)}/>} />
                        <Route exact path='/todo/create' element = {<TodoForm projects={this.state.projects} users={this.state.users} newTodo={(projects, text, users) => this.newTodo(projects, text, users)}/>} />
                        <Route exact path='/login' element = {<LoginForm getToken={(login, password) => this.getToken(login, password)} />} />
                        <Route path='/user/:id' element = {<UserProjectList projects={this.state.projects} />} />
                        <Route path="*" element = {<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
