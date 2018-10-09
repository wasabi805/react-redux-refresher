import React from 'react';
import {Link} from 'react-router-dom'

const Login = ()=>{
    return(
        <section>
            <h2>this will be the <span><h1>Login</h1></span>page </h2>
            <input placeholder='user name:'/>
            <input placeholder='password:'/>
            <div className='button-container text-white'>
                <a className='btn bg-secondary'>Submit</a>
            </div>

            <h3>
                Dont have an account?
            </h3>
            <p>click register below</p>

            <div className='button-container'>
                <Link to='/register'><a className='btn bg-info text-white'>Register NOW</a></Link>
            </div>


        </section>
    )
};

export default Login;