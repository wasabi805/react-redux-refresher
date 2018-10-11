import React, {Component} from 'react';
import {connect} from 'react-redux';
import {registerUser} from "../actions/auth-actions";
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import classnames from 'classnames'


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

    //THIS IS THE MOST IMPORTANT  METHOD IN REGARDS TO enabling
    //this react component to fire off actions with redux in order to display the errors created in the back end:
    //For more info, check out this chart from react's official docs
    // http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
    componentDidUpdate(prevProps){
        if(this.props.errors !==prevProps.errors){
            this.setState({
                errors : this.props.errors
            })
        }
    };

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
        this.props.registerUser(newUser, this.props.history)
        //this allows us to redirect from within the onSubmit action
    };

   render(){
        // console.log( this.state, 'this.state');
        // console.log(this.props, 'this.props for register comp');
       const {errors} = this.state;
        console.log(errors);


       return(
           <section className='register-main'>
               <div className='container form-container bg-light'>
                   <h1>REGISTER</h1>

                   <input type='text' name='name'  value={this.state.name}  onChange={this.onChange} className={classnames('form-input form-control' , {'is-invalid' : errors.name} )} placeholder='name: '/>
                   {errors.name && (<small className='invalid-feedback'>{errors.name}</small>)}

                   <input type='text' name='email' value={this.state.email} onChange={this.onChange} className={classnames('form-input form-control' , {'is-invalid' : errors.email} )}  placeholder='email: : '/>
                   {errors.email && (<small className='invalid-feedback'>{[errors.email]}</small>)}

                   <input type='text' name='password'  value={this.state.password} onChange={this.onChange} className={classnames('form-input form-control' , {'is-invalid' : errors.password} )}  placeholder='password: '/>
                   {errors.password && (<small className='invalid-feedback'>{errors.password}</small>)}

                   <input type='text' name="password2"  value={this.state.password2} onChange={this.onChange} className={classnames('form-input form-control' , {'is-invalid' : errors.password2} )}  placeholder='confirm password: '/>
                   {errors.password2 && (<small className='invalid-feedback'>{errors.password2}</small>)}

                   <div className='button-wrapper'>
                       <div className='btn bg-info button' onClick={this.onSubmit}>Submit</div>
                   </div>
                   <div className='spacer mb-5'>
                   </div>

               </div>
           </section>
       )
   }
}
Register.propTypes = {
    auth: PropTypes.object.isRequired,
    registerUser: PropTypes.func.isRequired,
    errors: PropTypes.func.isRequired,
};


const mapStateToProps = (state)=>({
    auth: state.auth,
    errors: state.errors,
});

export default connect(mapStateToProps, {registerUser}) (withRouter(Register))