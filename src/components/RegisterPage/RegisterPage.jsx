import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions,alertActions, validEmail, minMaxLength } from '../../_actions';


class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
   
        this.state = {
            user: {
                email:'',
                fname: '',
                lname: '',
                password: '',
               
            },
            error:{},
            submitted: false
        };
        
        this.props.clearAlerts();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.validation(event);
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { user } = this.state;
        console.log(user);
        let anyError = this.fromValidation()
        if (user.fname && user.lname && user.email && user.password && !this.props.emailtaken && !anyError ) {
            this.props.register(user,this.props.history);
        }
    }

    emailtaken(e) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.props.getEmailValid(this.state.user.email)
        }, 1000);
    }

    fromValidation(){
        if(this.state.error.email){
            return true
        }else if( this.state.error.password){
            return true
        }
        else if(this.state.error.lname){
            return true
        }
        else if(this.state.error.fname){
             return true
        }else {
            return false
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

        if(name === 'password'){
         let passVal = minMaxLength(value,5,10);
            this.setState(prevState =>({
                error:!passVal ? {...prevState.error,password:'Password should be  minimum 5 to maximum 10 digits long'} :{...prevState.error,password:''}
            }))
        }

        if(name === 'fname'){
            this.setState(prevState =>({
                error:value.length > 12 ? {...prevState.error,fname:'first name should not be too long'} :{...prevState.error,fname:''}
            }))
        }

        if(name === 'lname'){
            this.setState(prevState =>({
                error:value.length > 12 ? {...prevState.error,lname:'Last name should not be too long'} :{...prevState.error,lname:''}
            }))
        }
    }


    render() {
        const { emailtaken,loading  } = this.props;
        const { user, submitted,error } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Register</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + ((submitted && !user.email)||error.email || emailtaken ? ' has-error' : '')}>
                        <label htmlFor="username">Email ID</label>
                        <input type="text" className="form-control" name="email" value={user.email} onChange={e => {
                            this.handleChange(e)
                            this.emailtaken(e) 
                        }} />
                        { emailtaken && <div className="help-block">Email id is already available.</div> }
                        {error.email &&  <div className="help-block">{error.email}</div> }
                        
                        {submitted && !user.email &&
                            <div className=" help-block">Email Id is required</div>
                        }
                    </div>
                    <div className={'form-group' + ((submitted && !user.fname) || error.fname? ' has-error' : '')}>
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" className="form-control" name="fname" value={user.fname} onChange={this.handleChange} />
                        {submitted && !user.fname &&
                            <div className="help-block">First Name is required</div>
                        }
                        {error.fname &&  <div className="help-block">{error.fname}</div> }
                    </div>
                    <div className={'form-group' + ((submitted && !user.lname) ||error.fname ? ' has-error' : '')}>
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" className="form-control" name="lname" value={user.lname} onChange={this.handleChange} />
                        {submitted && !user.lname &&
                            <div className="help-block">Last Name is required</div>
                        }
                        {error.lname &&  <div className="help-block">{error.lname}</div> }
                    </div>
          
                    <div className={'form-group' + ((submitted && !user.password)||error.password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                        {submitted && !user.password &&
                            <div className="help-block">Password is required</div>
                        }
                        {error.password &&  <div className="help-block">{error.password}</div> }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Register</button>
                        {loading && 
                            <img alt='' src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <Link to="/login" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}


function mapState(state) {
    const { loading }  = state
    const { registering,emailtaken } = state.registration;
    return { registering,emailtaken,loading };
}

const actionCreators = {
    register: userActions.register,
    clearAlerts: alertActions.clear,
    getEmailValid:userActions.getEmailValid,
    validEmail:validEmail,
    minMaxLength:minMaxLength
}

const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
export { connectedRegisterPage as RegisterPage };