import React, {Component} from 'react';
import {connect} from 'react-redux';
import {registerUser} from "../actions/auth-actions";
import PropTypes from 'prop-types'

class Register extends Component{
    constructor(props){
        super(props);
            this.state={
                name: '',
                email: '',
                password: '',
                password2: '',
                errors: {},
            };
            this.onChange = this.onChange.bind(this);
            this.onSubmit = this.onSubmit.bind(this);

    }
    onChange(event){
        this.setState({ [event.target.name]: event.target.value })
    };

    onSubmit(event){
        event.preventDefault();
        //We'll send the newUser obj to redux later
        const newUser ={
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        console.log(newUser);
        this.props.registerUser(newUser)

    };

   render(){
        // console.log( this.state);
       const {errors} = this.state;
       const { user } = this.props.auth; //*NOTE remember that { user  } came from the empty obj initially set up in the auth reducer


       return(
           <section className='register-main'>
               <div className='container form-container bg-light'>
                   <h1>REGISTER</h1>

                   <input name='name'  value={this.state.name}  onChange={this.onChange} className='form-input' placeholder='name: '/>
                   <input name='email' value={this.state.email} onChange={this.onChange} className='form-input' placeholder='email: : '/>
                   <input name='password'  value={this.state.password} onChange={this.onChange} className='form-input' placeholder='password: '/>
                   <input name="password2"  value={this.state.password2} onChange={this.onChange} className='form-input' placeholder='confirm password: '/>

                   <div className='button-wrapper'>
                       <div className='btn bg-info button' onClick={this.onSubmit}>Submit</div>
                   </div>
                   <div className='spacer mb-5'>
                       <div className='bg-light'>{user ? user.name : null }</div>
                   </div>

               </div>
           </section>
       )
   }
}
Register.propTypes = {
    auth: PropTypes.object.isRequired,
    registerUser: PropTypes.func.isRequired
};


const mapStateToProps = (state)=>({
    auth: state.auth
});

export default connect(mapStateToProps, {registerUser})(Register)