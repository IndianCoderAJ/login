import React from 'react';
import { connect } from 'react-redux';
import { alertActions, userActions } from '../../_actions';

class HomePage extends React.Component {
    // componentDidMount() {
    //     this.props.clearAlerts();
    // }

    logout(){
      this.props.logout(this.props.history)
    }

    changePassword(){
        this.props.history.push("/changepassword");
    }

    render() {
        const {  users } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {users.fname}!</h1>
                <p>You're logged in 🙂!</p>
               
                   <p onClick={e => this.changePassword(e)}>Change password</p>
                    {/* <Link to="/changepassword"></Link> */}
                   <p onClick={e => this.logout(e)}>Logout</p>
            </div>
        );
    }
}
function mapState(state) {
    const { users } = state;
    // const { user } = authentication;
    return {  users };
}

const actionCreators = {
  logout:userActions.logout,
  clearAlerts: alertActions.clear,
  changePassword:userActions.changePassword
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };