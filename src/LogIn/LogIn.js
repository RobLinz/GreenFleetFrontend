import React, {Component} from 'react';
import {connect} from 'react-redux';
import './LogIn.css';
import {login} from "../authentication/Actions";
import {Glyphicon} from 'react-bootstrap';
import loginIcon from '../Assets/cactusIcon.png';
import {Redirect} from 'react-router-dom';

const mapStateToProps = state => {
    return {
        isFetching: state.auth.isFetching,
        isLoggedIn: state.auth.isLoggedIn,
        error: state.auth.error,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        login: (username, password) => dispatch(login(username, password)),
    }
};

class LogIn extends Component {

    constructor(props) {
        super(props);
        //setting the initial state
        this.state = {
            username: {
                value: '',
                valid: false,
            },
            password: {
                value: '',
                valid: false,
            },
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    /*event handler for input element*/
    handleChange = e => this.setState({
        [e.target.name]: {
            value: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
            valid: this.validate(e.target.name, e.target.value),
        }
    });

    validate = (name, value) => {
        switch (name) {
            case 'password':
                return value.length > 7;
            case 'username':
                return value.length > 0;
            default:
                return true;
        }
    };

    handleSubmit = async event => {
        event.preventDefault();
        if (this.state.username.valid && this.state.password.valid) {
            await this.props.login(this.state.username.value, this.state.password);

            if (this.props.isLoggedIn) {
                this.props.history.push("/fleet");
            }
        }
        else {
            alert("error");
        }
    };

    render() {

        let HAS_TOKEN = !!localStorage.getItem('userToken');
        if (HAS_TOKEN && this.props.isLoggedIn) {
            return (
                <Redirect to={'/fleet'}/>
            )
        }

        return (
            <div className="LogIn">

                <div className="nav">
                    <div className="logo" onClick={() => this.props.history.push("/home")}>GreenFleet</div>
                    <div className="navButton" onClick={() => this.props.history.push("/home")}>About</div>
                    <div className="navButton" onClick={() => this.props.history.push("/login")}>Log In</div>
                    <div className="navButton" onClick={() => this.props.history.push("/signup")}>Sign Up</div>
                </div>

                <div className="content">

                    <div className="top-sect"/>

                    <div className="form-sect">

                        <div className="left-form"/>

                        <div className="login-box">
                            <div className="loginInfo">
                                <div className="log"> Log In</div>
                                <div className="loginImage">
                                    <img src={loginIcon}/>
                                </div>

                                <div className="loginForm">

                                    <input value={this.state.username.value} onChange={this.handleChange}
                                           name="username" type="text" placeholder="Enter Username" className="username"
                                           required/>
                                    <br/>
                                    <input value={this.state.password.value} onChange={this.handleChange}
                                           name="password" type="password" placeholder="Enter Password"
                                           className="password" required/>
                                    <br/>
                                    <div className="sign-up-here" onClick={() => this.props.history.push("/signup")}>No
                                        account? No Problem! Sign up here.
                                    </div>
                                    <br/>
                                    <button className="submit" type="submit" onClick={this.handleSubmit}> Login</button>
                                    <div className="register-error"> {this.props.error} </div>

                                </div>

                            </div>
                        </div>

                        <div className="right-form">
                            Welcome back to
                            <br/>
                            your Fleet!
                        </div>

                    </div>

                </div>

            </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
