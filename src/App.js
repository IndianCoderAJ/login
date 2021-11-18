import React from 'react'
import { LoginPage } from './components/LoginPage';
import  {RegisterPage}  from './components/RegisterPage/RegisterPage';
import { HomePage } from './components/HomePage';
import { Route,Redirect, Switch, BrowserRouter as Router } from 'react-router-dom'  
import { PrivateRoute } from './components/PrivateRoute';
import { connect } from 'react-redux';
import { alertActions } from './_actions';
import {ChangePassword} from './components/ChangePasswordPage';
import { Forgotpassword, NewPassword, Otp } from './components/Forgotpassword';




class App extends React.Component {

    render() {
        const { alert } = this.props;
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert.message && 
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router>
                        <Switch>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <PrivateRoute exact path="/changepassword" component={ChangePassword} />
                                <Route  path="/login" component={LoginPage} />
                                <Route  path="/register" component={RegisterPage} />
                                <Route  path="/forgotpass" component={Forgotpassword} />
                                <Route  path="/optVerification" component={Otp} />
                                 <Route  path="/newpassword" component={NewPassword} />
                                {/* <PrivateRoute  path="/forgotpass" component={forgotpassword} /> */}
                                <Redirect from="*" to="/login" />
                                </Switch>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { alert } = state;
    return { alert };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };

