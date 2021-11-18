import React, { Component } from 'react'
import { connect } from 'react-redux';
import { minMaxLength, userActions } from '../../_actions';



class NewPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            password: '',
            submitted: false,
            error:''
        };

        if(!props.email && !props.token){
            props.history.push('/')
         }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(e) {
        debugger
        const { name, value } = e.target;
        this.validation(e)
        this.setState({ [name]: value });
    }

    validation(e){
        debugger
        const { name, value } = e.target;
        if(name === 'password'){
            let password = minMaxLength(value,5,10)
            this.setState({
                error:!password ?'Password should be  minimum 5 to maximum 10 digits long':''
            })
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { password,error } = this.state;

        console.log(error);
        if (password && !error) {
            let data = {
                password,
                token:this.props.token
            }
            this.props.resetPassword(data,this.props.history);
        }
    }


    render() {
        let  { loading } = this.props;
        const { password, submitted ,error } = this.state;
        return (
     <div>
        <div className="col-md-6 col-md-offset-3">
            <h2>Reset Password</h2>
              <form name="form" onSubmit={this.handleSubmit}>
                <div className={'form-group' + ((submitted && !password) || error ? ' has-error' : '')}>
                    <label htmlFor="password">New Password</label>
                    <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                    {submitted && !password &&
                        <div className="help-block">New password is required</div>
                    }
                    {error && 
                       <div className="help-block">{error}</div>
                    }
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">Change Password</button>
                    {loading && 
                        <img alt='' src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    }
                </div>
            </form>
            </div>
        </div>
        )
    }
}


function mapState(state) {
    let { loading } = state;
    const { email,token } = state.forgotpass;
    return {email,token,loading };
}

const actionCreators = {
    resetPassword:userActions.resetPassword,
    minMaxLength:minMaxLength
};


const newPasswordApp = connect(mapState, actionCreators)(NewPassword);
export { newPasswordApp as NewPassword };


