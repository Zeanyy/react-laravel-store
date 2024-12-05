import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { signOut } from "../services/AuthService";

const SignOut = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { setIsAuthenticated } = useAuth()

    useEffect(() => {
        const logOut = async () => {
            setLoading(true);
            const token = localStorage.getItem('token');

            try {
                const response = await signOut(token)
                console.log(response.message);
            } catch (error) {
                console.error('Error during logout', error);
            } finally {
                setLoading(false);
                localStorage.removeItem('token');
                setIsAuthenticated(false);
                navigate('/');
            }
        };

        logOut();

    }, [navigate, setIsAuthenticated]);

    return (
        <div className="container mx-auto p-8">
            <div className="bg-white p-10 rounded-lg text-center">
                {loading ? (
                    <p>Logging out...</p>
                ) : (
                    <p>Redirecting...</p>
                )}
            </div>
        </div>
    )
}

export default SignOut
