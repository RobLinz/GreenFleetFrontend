import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';


const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
    }
};

const AuthenticatedRoute = ({isLoggedIn, component: Component, ...otherProps}) => {

    /* !! makes it a boolean   */
    let HAS_TOKEN = !!localStorage.getItem('userToken') && localStorage.getItem('userToken') !== undefined;
    return (
        <div data-state={isLoggedIn}>
            <Route
                {...otherProps} render={props => (
                HAS_TOKEN && isLoggedIn ? <Component {...props} /> : <Redirect to={{
                    pathname: '/home',
                    state: {from: props.location}
                }}/>
            )}
            />
        </div>
    )
};

export default connect(mapStateToProps)(AuthenticatedRoute);