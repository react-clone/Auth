import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const res = await axios.post('http://localhost:3000/login', { email, password });
            if (res.data.success) {
                localStorage.setItem('token', res.data.token);
                navigate('/dashboard');
            } else {
                alert('Invalid credentials');
            }
        } catch (err) {
            alert('Login failed. Please try again.');
            console.error(err);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg p-8 rounded-2xl w-80">
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    Login
                </button>

                <p className="mt-4 text-center text-sm">
                    Don’t have an account?{' '}
                    <span
                        className="text-blue-600 cursor-pointer hover:underline"
                        onClick={() => navigate('/register')}
                    >
                        Register
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
