import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');


    const handleRegister = async () => {
        try {
            const res = await axios.post('http://localhost:3000/register', { name, email, password });
            if (res.data.success) {
                alert('Registration successful!');
                navigate('/login');
            } else {
                alert('Registration failed.');
            }
        } catch (err) {
            alert('Error registering user.');
            console.error(err);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg p-8 rounded-2xl w-80">
                <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
                <input
                    type="text"
                    placeholder="Username"
                    className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    onClick={handleRegister}
                    className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
                >
                    Register
                </button>

                <p className="mt-4 text-center text-sm">
                    Already have an account?{' '}
                    <span
                        className="text-green-600 cursor-pointer hover:underline"
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Register;
