import React, {Component} from 'react';
import './Home.css';
import {connect} from 'react-redux';
import {Glyphicon} from 'react-bootstrap';
import photoZero from '../Assets/housePlant.png';
import photoOne from '../Assets/plants.png';
import photoTwo from '../Assets/windowPlants.png';
import {Redirect} from 'react-router-dom';


const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
    }
};

class HomePage extends Component{

    constructor(props) {
        super(props);
        this.prevImage = this.prevImage.bind(this);
        this.nextImage = this.nextImage.bind(this);
        //setting the initial state
        this.state = {
            curImage: 0
        };
    }

    prevImage = () => {
        this.setState({curImage: this.state.curImage === 0 ? 2 : this.state.curImage - 1});
        console.log(this.state.curImage);
    };

    nextImage = () => {
        this.setState({curImage: this.state.curImage === 2 ? 0 : this.state.curImage + 1});
        console.log(this.state.curImage);
    };


    render() {

        let HAS_TOKEN = !!localStorage.getItem('userToken');
        if(HAS_TOKEN && this.props.isLoggedIn){
            return(
                <Redirect to={'/fleet'}/>
            )
        }

        return(
            <div className="Home">
                <header className="App-header">
                    <title onClick={() => this.props.history.push("/home")}>GreenFleet</title>
                </header>

                <body>
                    <div className="nav">
                        <div className="logo">GreenFleet</div>
                        <div className="navButton" onClick={() => this.props.history.push("/home")}>About</div>
                        <div className="navButton" onClick={() => this.props.history.push("/login")}>Log In</div>
                        <div className="navButton" onClick={() => this.props.history.push("/signup")}>Sign Up</div>
                    </div>


                    <div className="content">
                            <div className="imgSlider" style={{backgroundImage:`url(${this.state.curImage === 0 ? photoZero : this.state.curImage === 1 ? photoOne : photoTwo})`}} />

                            <div className="chevron-left" onClick={this.prevImage} >
                                <Glyphicon glyph="chevron-left" />
                            </div>

                            <div className="chevron-right" onClick={this.nextImage} >
                                <Glyphicon glyph="chevron-right" />
                            </div>
                    </div>

                </body>
            </div>
        )
    }

}

export default connect(mapStateToProps)(HomePage);