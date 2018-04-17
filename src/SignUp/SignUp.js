import React, {Component} from 'react';
import {connect} from 'react-redux';
import {signup} from "../authentication/Actions";
import './SignUp.css';
import {Redirect} from 'react-router-dom';

const mapStateToProps = state => {
    return {
        isFetching: state.auth.isFetching,
        isRegistered: state.auth.isRegistered,
        isLoggedIn: state.auth.isLoggedIn,
        error: state.auth.error,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        signup: (username, password, email, firstname, lastname, pets, kids) => dispatch(signup(username, password, email, firstname, lastname, pets, kids)),
    }
};

class SignUp extends Component{

    constructor(props) {
        super(props);

        this.state = {
            firstname: {
                value: '',
                valid: false,
            },
            lastname: {
                value: '',
                valid: false,
            },
            username: {
                value: '',
                valid: false,
            },
            email: {
                value: '',
                valid: false,
            },
            password:{
                value: '',
                valid: false,
            },
            pets: {
                value: false,
                valid: true,
            },
            kids: {
                value: false,
                valid: true,
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
        switch(name){
            case 'password':
                return value.length > 7;
            case 'firstname':
                return value.length > 0;
            case 'lastname':
                return value.length > 0;
            case 'username':
                return value.length > 0;
            case 'email':
                let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(value).toLowerCase());
            default:
                return true;
        }
    };

    handleSubmit = () => {
        if(this.state.username.valid && this.state.password.valid && this.state.email.valid && this.state.firstname.valid && this.state.lastname.valid){
            this.props.signup(this.state.username.value, this.state.password.value, this.state.email.value, this.state.firstname.value, this.state.lastname.value, this.state.pets.value, this.state.kids.value);
        }
        else{
            alert("error");
        }
    };

    render() {
        let HAS_TOKEN = !!localStorage.getItem('userToken');
        if(HAS_TOKEN && this.props.isLoggedIn){
            return(
                <Redirect to={'/fleet'}/>
            )
        }

        return(
            <div className="SignUp">
                <header className="App-header">
                    <title >GreenFleet</title>
                </header>

                <body>
                <div className="nav">
                    <div className="logo" onClick={() => this.props.history.push("/home")}>GreenFleet</div>
                    <div className="navButton" onClick={() => this.props.history.push("/home")}>About</div>
                    <div className="navButton" onClick={() => this.props.history.push("/login")}>Log In</div>
                    <div className="navButton" onClick={() => this.props.history.push("/signup")}>Sign Up</div>
                </div>


                <div className="content">

                    <div className="top-sect"/>

                    <div className="form-sect">

                        <div className="left-form">
                             Begin building your Fleet today!

                        </div>

                        <div className="form">
                            <h2 className="sign-up-title"> Sign Up </h2>
                            <br />
                            <input value={this.state.firstname.value} onChange={this.handleChange} type="text" placeholder="First name" name="firstname" className={this.state.firstname.valid ? "validInput" : "invalidInput"} required/>
                            <br />
                            <input value={this.state.lastname.value} onChange={this.handleChange} type="text" placeholder="Last name" name="lastname" className ={this.state.lastname.valid ? "validInput" : "invalidInput"} required/>
                            <br />
                            <input value={this.state.username.value} onChange={this.handleChange} type="text" placeholder="Username" name="username" className ={this.state.username.valid ? "validInput" : "invalidInput"} required/>
                            <br />
                            <input value={this.state.email.value} onChange={this.handleChange} type="text" placeholder="Email Address" name="email" className ={this.state.email.valid ? "validInput" : "invalidInput"} required/>
                            <br />
                            <input value={this.state.password.value} onChange={this.handleChange} type="password" placeholder="Password (8+ characters)" name="password" className={this.state.password.valid ? "validInput" : "invalidInput"} required />
                            <br />

                            <div className="bottom-login">
                                <p>
                                    <input checked={this.state.kids.value} onChange={this.handleChange} type="checkbox" name="kids" className="remember" />
                                    <b /> <b />   I have children.
                                </p>
                                <p>
                                    <input checked={this.state.pets.value} onChange={this.handleChange} type="checkbox"  name="pets" className="remember" />
                                    <b /> <b />   I have pets.
                                </p>
                            </div>

                            <br />
                            <button className="submit" type="submit" onClick={this.handleSubmit}> Join Today </button>
                            <br />
                            <div className="register-error"> {this.props.error} </div>
                            <div className="register-success"> {this.props.isRegistered ? "User Added! Go to the Login Page to get started!" : ""} </div>

                        </div>

                        <div className="right-form"/>

                    </div>

                </div>

                </body>
            </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
