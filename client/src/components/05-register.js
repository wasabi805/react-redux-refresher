import React, {Component} from 'react';
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

    };

   render(){
        // console.log( this.state);
       return(
           <section className='register-main'>
               <div className='container bg-light'>
                   <h1>REGISTER</h1>

                   <input name='name'  value={this.state.name}  onChange={this.onChange} className='d-block' placeholder='name: '/>
                   <input name='email' value={this.state.email} onChange={this.onChange} className='d-block' placeholder='email: : '/>
                   <input name='password'  value={this.state.password} onChange={this.onChange} className='d-block' placeholder='password: '/>
                   <input name="password2"  value={this.state.password2} onChange={this.onChange} className='d-block' placeholder='confirm password: '/>

                   <div className='submit-button-cont m-4'>
                       <div className='btn bg-info' onClick={this.onSubmit}>Submit</div>
                   </div>
                   <div className='spacer mb-5'></div>

               </div>
           </section>
       )
   }
}

export default Register