import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {createSession} from 'redux-session';
import {Provider} from 'react-redux';
import {ConnectedRouter, routerMiddleware, routerReducer} from 'react-router-redux';
import thunk from 'redux-thunk';
import _ from 'lodash';

import './App.css';
import Debugger from './general/Debugger';
import Reducers from './Reducer';
import HomePage from './MainPage/Home';
import LogIn from './LogIn/LogIn';
import SignUp from './SignUp/SignUp';
import MainFleet from './Fleet/MainFleet';
import AuthenticatedRoute from './authentication/AuthenticatedRoute';

const history = createHistory();
const middleware = routerMiddleware(history);

const session = createSession({
    ns: '9e0574a83e6d4a04b67da61749338270',
    selectState(state) {
        return {
            auth: state.auth,
        }
    }
});

const store = createStore(
    combineReducers({
        ...Reducers,
        router: routerReducer
    }),
    compose(
        applyMiddleware(middleware, thunk, session),
        Debugger.instrument()
    )
);

const App = () => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <Debugger />
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route path="/login" component={LogIn} />
                    <Route path="/signup" component={SignUp} />
                    <AuthenticatedRoute path="/fleet" component={MainFleet} />
                    <Redirect from="/" to="/home" />
                    <Route component={HomePage} />
                </Switch>
            </div>
        </ConnectedRouter>
    </Provider>
);

export default App;









/*ADDED PACKAGES
API -> router & redux
yarn add react-redux
yarn add react-router (uses url in browser to determine what components to show)
yarn add react-router-dom
yarn add react-router-redux
yarn add redux
yarn add redux-session (can save the state when someone closes a page and opens it again)
yarn add redux-thunk (asynchronous state changes)
yarn add redux-devtools --dev
yarn add history
 */