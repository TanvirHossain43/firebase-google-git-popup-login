import React, { useState } from 'react';
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from '../../firebase/firebase.init';



const Login = () => {
    const [users, setUsers] = useState(null)

    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const gitProvider = new GithubAuthProvider()

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const user = result.user;
                console.log(user)
                setUsers(user)
            })
            .catch(error => {
                console.log(error)
            })

    }
    const handleGoogleSignOut = () => {
        signOut(auth)
            .then(user => {
                setUsers(user)
            })
            .catch(error => {
                console.log(error)
            })
    }
    const gitHubLogIn = () => {
        signInWithPopup(auth, gitProvider)
            .then(result => {
                const user = result.user;
                console.log(user)
                setUsers(user)
            })
            .catch(error => {
                console.log(error)
            })

    }
    return (
        <div>
            {users ? <button onClick={handleGoogleSignOut}>Sign Out</button>
                :
                <div>
                    <button onClick={handleGoogleSignIn}>Google login</button>
                    <button onClick={gitHubLogIn}>GitHub login</button>
                </div>
            }
            {
                users && <div>
                    <h3>{users.displayName}</h3>
                    <p>{users.email}</p>
                    <img src={users.photoURL} alt="" />
                </div>
            }
        </div>
    );
};

export default Login;