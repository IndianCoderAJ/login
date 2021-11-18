

import React, { Component } from 'react'
import { connect } from 'react-redux';
import { minMaxLength, userActions } from '../../_actions';


class ChangePassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newPassword: '',
            currPassword: '',
            submitted: false,
            error:{}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(e) {
        const { name, value } = e.target;
        this.validation(e);
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { newPassword, currPassword,error } = this.state;
        if (newPassword && currPassword && !error.password) {
            let data = {
                newPassword,
                currPassword
            }
            this.props.changePass(data,this.props.history);
        }
    }

    validation(e){
        const { name, value } = e.target;
        if(name === 'newPassword'){
            let passVal = minMaxLength(value,5,10);
            this.setState(prevState =>({
                error:!passVal ? {...prevState.error,password:'Password should be  minimum 5 to maximum 10 digits long'} :{...prevState.error,password:''}
            }))
        }
    }


    render() {
        let { loading }  = this.props;
        const { newPassword, currPassword, submitted,error } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
            <h2>Change Password</h2>
            <form name="form" onSubmit={this.handleSubmit}>
                <div className={'form-group' + ((submitted && !currPassword)  || error.password? ' has-error' : '')}>
                    <label htmlFor="password">Current Password</label>
                    <input type="password" className="form-control" name="currPassword" value={currPassword} onChange={this.handleChange} />
                    {submitted && !currPassword &&
                        <div className="help-block">Current password is required</div>
                    }
                </div>
                <div className={'form-group' + ((submitted && !newPassword) || error.password? ' has-error' : '')}>
                    <label htmlFor="password">New Password</label>
                    <input type="password" className="form-control" name="newPassword" value={newPassword} onChange={this.handleChange} />
                    {submitted && !newPassword &&
                        <div className="help-block">New password is required</div>
                    }
                    {error.password && 
                         <div className="help-block">{error.password}</div>
                    }
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">Change Password</button>
                    {loading && 
                        <img  alt='' src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    }
                </div>
            </form>
        </div>
        )
    }
}

function mapState(state) {
    const { loading  } = state;
    return { loading  };
}

const actionCreators = {
    changePass:userActions.changePass,
    minMaxLength:minMaxLength
};

const connectedChangPasswordPage = connect(mapState, actionCreators)(ChangePassword);

export { connectedChangPasswordPage as ChangePassword };
