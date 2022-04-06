import React from 'react'
import '../bootstrap/css/bootstrap.css'

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'login': '',
            'password': ''
        }
    }

    handleSubmit(event) {
        this.props.getToken(this.state.login, this.state.password)
        event.preventDefault()
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
<main>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-5">
                        <div className="card shadow-lg border-0 rounded-lg mt-5">
                            <div className="card-header"><h3
                                className="text-center font-weight-light my-4">Авторизация</h3>
                            </div>
                            <div className="card-body">
                                <form onSubmit={(event) => this.handleSubmit(event)}>
                                    <div className="form-group">
                                        <label className="small mb-1">Имя пользователя</label>
                                        <input className="form-control" type="text" name="login" placeholder="login" onChange={(event) =>
                                            this.handleChange(event)} value={this.state.login}/>
                                    </div>
                                    <div className="form-group">
                                        <label className="small mb-3">Пароль</label>
                                        <input className="form-control" type="password" name="password" placeholder="password"
                                               onChange={(event) =>
                                                   this.handleChange(event)} value={this.state.password}/>

                                    </div>
                                    <div
                                        className="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                                        <a className="small" href="#">Забыли пароль?</a>
                                        <input className="btn btn-primary" type="submit" value="Авторизоваться"/>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </main>
        )
    }
}

export default LoginForm

