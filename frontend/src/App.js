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
            .get('http://127.0.0.1:8008/api/users/')
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
            <div
                style={{
                    marginLeft: "40%"
                }}
            >
                <Button
                    aria-controls='simple-menu'
                    aria-haspopup='true'
                    onClick={this.state}
                    >Menu</Button>
                <UserList users={this.state.users}/>
            </div>
    )
    }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
