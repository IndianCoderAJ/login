import React, { Component } from 'react'
import { connect } from 'react-redux'
import { userActions } from '../../_actions'
import './otp.css'



 class Otp extends Component {
     constructor(props){
         super(props)

         this.state = {
            ssn1: '',
            ssn2: '',
            ssn3: '',
            ssn4: '',
            ssn5: '',
            ssn6: '',
            submitted:false,
            error:''
         }

         if(!props.email){
            props.history.push('/')
         }

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
     }


    handleChange = e => {
        const { maxLength, value, name } = e.target;
        const [fieldName, fieldIndex] = name.split("-");
        
        // Check if they hit the max character length
        if (value.length >= maxLength && fieldName) {
          // Check if it's not the last input field
          if (parseInt(fieldIndex, 10) < 6) {
            // Get the next input field
            const nextSibling = document.querySelector(
              `input[name=ssn-${parseInt(fieldIndex, 10) + 1}]`
            );
      
            // If found, focus the next field
            if (nextSibling !== null) {
              nextSibling.focus();
            }
          }
        }
    
        this.setState({  [`ssn${fieldIndex}`]: value});
      }
     
    handleSubmit(e) {
        e.preventDefault();
        
        this.setState({ submitted: true });
        const { email } = this.props;
        if (email && this.checkValidation()) {
            let data = {
                email,
                otp:this.state.ssn1 + this.state.ssn2 + this.state.ssn3 + this.state.ssn4 + this.state.ssn5 + this.state.ssn6
             }
            this.props.otpVerification(data,this.props.history);
        }
    }

    checkValidation(){
      let { ssn1,ssn2,ssn3,ssn4,ssn5,ssn6} = this.state;
      if(!ssn1 ||!ssn2||!ssn3||!ssn4||!ssn5||!ssn6){
        this.setState({ error:'OTP should not be empty.'});   
        return false    
      } else{
        this.setState({ error:''}); 
        return true
      }
     
    }

    render() {
        let { loading,OTP } = this.props;
        let { ssn1,ssn2,ssn3,ssn4,ssn5,ssn6,error,submitted} = this.state;

        return (
            <div>
             <form name="form" onSubmit={this.handleSubmit}>
             <h6>Please enter the one time password  to reset the password</h6>
             <div className={'form-group' + (submitted && error ? ' has-error' : '')}>
             <div id="otp" className="inputs "> 
                <input className="m-2 text-center form-control rounded oneline" value={ssn1} type="text" name="ssn-1" maxLength="1"  onChange={this.handleChange}/> 
                <input className="m-2 text-center form-control rounded oneline"  value={ssn2}type="text" name="ssn-2" maxLength="1" onChange={this.handleChange}/>
                <input className="m-2 text-center form-control rounded oneline" value={ssn3} type="text" name="ssn-3" maxLength="1" onChange={this.handleChange}/> 
                <input className="m-2 text-center form-control rounded oneline"  value={ssn4} type="text" name="ssn-4" maxLength="1" onChange={this.handleChange}/> 
                <input className="m-2 text-center form-control rounded oneline" value={ssn5} type="text" name="ssn-5" maxLength="1" onChange={this.handleChange}/> 
                <input className="m-2 text-center form-control rounded oneline"  value={ssn6} type="text" name="ssn-6" maxLength="1" onChange={this.handleChange}/> 
                {error &&
                    <div className="help-block">{error}</div>
                }
             </div>
                     
             </div>
                <div className="form-group">
                    <button className="btn btn-primary">Validate</button>
                    {loading &&
                        <img alt='' src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    }
                </div>
                <h6>Resend the OTP <b onClick={e => this.resendOTP(e)}>here </b>?</h6>
                <h6>OTP is {OTP} (Note* For thesting purpose.)</h6>
            </form>
            </div>
        )
    }
}



function mapState(state) {
    const { email,OTP } = state.forgotpass;
    return {email,OTP };
}

const actionCreators = {
    otpVerification:userActions.otpVerification
};

const otpApp = connect(mapState, actionCreators)(Otp);
export { otpApp as Otp };
