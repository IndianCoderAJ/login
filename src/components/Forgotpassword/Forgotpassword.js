import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions, validEmail } from '../../_actions';


class Forgotpassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            submitted: false,
            error:{}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(e) {
        const { name, value } = e.target;
        this.validation(e)
        this.setState({ [name]: value });
    }


    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email,error } = this.state;

        if (email && !error.email) {
            let data = {
                email,
            }
            this.props.getOTP(data,this.props.history);
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
        let {loading} = this.props
        const { email,submitted,error } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
            <h2>Forgot password</h2>
            <form name="form" onSubmit={this.handleSubmit}>
                <div className={'form-group' + ((submitted && !email) || error.email? ' has-error' : '')}>
                    <label htmlFor="email">Email Id</label>
                    <input type="text" className="form-control" name="email" value={email} onChange={this.handleChange} />
                    {submitted && !email &&
                        <div className="help-block">Email id is required</div>
                    }
                    {error.email &&  email &&
                        <div className="help-block">{error.email}</div>
                     }
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">Get OTP</button>
                    {loading &&
                        <img alt='' src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    }
                </div>
            </form>
        </div>
        )
    }
}

function mapState(state) {
    const { alert,loading } = state;
    return { alert,loading };
}

const actionCreators = {
    getOTP:userActions.getOTP,
    validEmail:validEmail,
};

const forgotpasswordApp = connect(mapState, actionCreators)(Forgotpassword);
export { forgotpasswordApp as Forgotpassword };

