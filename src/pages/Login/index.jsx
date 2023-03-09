import React, {useContext, useState} from "react";
import './styles.css';
import {AuthContext, StudentContext} from "../../others/Context";
import {login} from "./helper";
import {Link, Navigate} from "react-router-dom";

export default function Login() {
    const {auth, dispatch} = useContext(AuthContext);
    const {dispatch: studentDispatch} = useContext(StudentContext);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState('');

    if (auth.user) return <Navigate to='/' />

    return (
        <>
            <section>
                <p className="lead">Welcome!. Please login to access the dashboard</p>
                <form>
                    <div className="form-group">
                        <label htmlFor="usernameInput">Username</label>
                        <input type="email" className="form-control" id="usernameInput" placeholder="Enter username"
                               value={username} onChange={e => setUsername(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordInput">Password</label>
                        <input type="password" className="form-control" id="passwordInput" placeholder="Password"
                               value={pwd} onChange={e => setPwd(e.target.value)}/>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="rememberCheck"/>
                        <label className="form-check-label" htmlFor="rememberCheck">Remember me</label>
                    </div>
                    <button
                        style={{marginRight: 10}}
                        type="submit"
                        className="btn btn-primary"
                        onClick={(e) => login(e, username, pwd, dispatch, studentDispatch, setError)}
                    >
                        Login
                    </button>
                    <Link to='/register'>
                        <button type="text" className="btn btn-primary">Register</button>
                    </Link>
                    {
                        error ? (
                            <p className='error-msg'>{error.message}</p>
                        ) : null
                    }
                </form>
            </section>
        </>
    );
}
