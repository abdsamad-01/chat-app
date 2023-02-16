import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { FcGoogle } from 'react-icons/fc'
import { auth, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";


const Login: React.FC = () => {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) navigate("/room");
    }, [user, loading]);

    return (
        <div>
            <button className="GoogleButton" type="button" onClick={signInWithGoogle}>
                <FcGoogle className="GoogleIcon" />
                <p> Log in With Google </p>
            </button>
        </div>
    )
}

export default Login

