import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions,alertActions, validEmail,minMaxLength } from '../../_actions';


class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        // this.props.logout();

        this.state = {
            email: '',
            password: '',
            submitted: false,
            error:{},
            FormValidate:true,
        };

        if(props.users.loggingIn){
              props.history.push('/')
        }

        // this.props.clearAlerts();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.validation = this.validation.bind(this)
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.validation(e);
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { email, password,error } = this.state;
        if (email && password && !error.email ) {
            let data = {
                email,
                password
            }
            this.props.login(data,this.props.history);
        }
    }

    validation(e){
        const { name, value } = e.target;
        if(name === 'email'){
            let emailval = validEmail(value)
                this.setState(prevState => ({
                    error:!emailval? {...prevState.error,email:'Email is Invalid'}:{...prevState.error,email:''}
                }))
        }

    }

    render() {
        const { loading } = this.props;
        const { email, password, submitted, error} = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Login</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + ((submitted && !email) || error.email ? ' has-error' : '')}>
                        <label htmlFor="email">Email Id</label>
                        <input type="text" className="form-control" name="email" value={email} onChange={this.handleChange} />
                        {submitted && !email &&
                            <div className="help-block">Email is required</div>
                        }
                        {error.email &&  <div className="help-block">{error.email}</div> }
                    </div>
                    <div className={'form-group' + ((submitted && !password)||error.password  ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                         {/* {error.password &&  <div className=" help-block" >{error.password}</div> } */}
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Login</button>
                        {loading &&
                            <img  alt='' src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <Link to="/register" className="btn btn-link">Register</Link>
                        <Link to="/forgotpass" className="btn btn-link">Forgot password</Link>
                    </div>
                </form>
            </div>
        );
    }
}


function mapState(state) {
    const { users ,loading } = state;
    return { users ,loading};
}

const actionCreators = {
    login:userActions.login,
    clearAlerts: alertActions.clear,
    validEmail:validEmail,
    minMaxLength:minMaxLength
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };