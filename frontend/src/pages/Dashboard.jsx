import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen   bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <h1 className="text-4xl font-bold mb-4">Welcome to your Dashboard </h1>
            <p className="text-lg mb-6">You’re successfully logged in!</p>
            <button
                onClick={handleLogout}
                className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-full hover:bg-gray-200 transition duration-300"
            >
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
