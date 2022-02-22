import React from 'react';
import './App.css';
import UserList from './components/UserList.js'
import axios from 'axios';
import {Button} from "@material-ui/core";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': []
        }
    }

    componentDidMount() {
        axios
            .get('http://127.0.0.1:8009/api/users/')
            .then(response => {
                const users = response.data
                this.setState({
                        'users': users
                    }
                )
            })
            .catch(error => console.log(error))
    }


    render() {
        return (
            <div>
                <div
                    style={{
                        marginLeft: "0%"
                    }}
                >
                    <Button
                        aria-controls='simple-menu'
                        aria-haspopup='true'
                        onClick={this.state}
                    >Menu</Button>
                </div>
                <div>
                    <UserList users={this.state.users}/>
                </div>
            </div>
        )
    }
}

export default App;
