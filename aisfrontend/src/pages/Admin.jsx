import { useState, useEffect } from 'react';
import axios from 'axios';

function LoginForm({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post('http://localhost:5000/api/admin/login', {
                username,
                password
            });
            localStorage.setItem('token', res.data.token);
            onLogin();
        } catch (err) {
            setError('Invalid username or password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-black min-h-screen">
            <section className="relative w-full h-[60vh]">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/adminhero.png')" }}
                />
                <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.9) 100%)" }}
                />
                <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to bottom, transparent 50%, black 100%)" }}
                />
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-8 pt-16">
                    <span className="text-gray-400 text-sm font-medium tracking-widest uppercase mb-4 block">
                        Admin Area
                    </span>
                    <h1 className="text-white text-6xl font-bold leading-tight mb-6">
                        Welcome Back
                    </h1>
                    <p className="text-gray-300 text-xl leading-relaxed max-w-2xl">
                        Sign in to access the AI Solutions admin dashboard.
                    </p>
                </div>
            </section>

            <section className="relative py-24 px-8">
                <div
                    className="absolute inset-0"
                    style={{ background: "radial-gradient(ellipse at center, rgba(255,255,255,0.05) 0%, transparent 70%)" }}
                />
                <div className="relative z-10 max-w-md mx-auto">
                    <div className="rounded-2xl p-10"
                        style={{
                            background: "rgba(255,255,255,0.05)",
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            boxShadow: "0 0 40px rgba(255,255,255,0.05), 0 0 80px rgba(255,255,255,0.02)"
                        }}>
                        <h2 className="text-white text-3xl font-bold mb-2 text-center">
                            Admin Login
                        </h2>
                        <p className="text-gray-400 text-center mb-10">
                            Enter Your Credentials
                        </p>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-gray-400 text-sm uppercase tracking-widest">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    placeholder="Enter your username"
                                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition duration-200"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-gray-400 text-sm uppercase tracking-widest">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="Enter your password"
                                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition duration-200"
                                />
                            </div>

                            {error && (
                                <p className="text-red-400 text-sm text-center">{error}</p>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-white text-black py-4 rounded-full font-medium text-lg hover:bg-gray-200 transition duration-200 mt-2"
                            >
                                {loading ? 'Signing In...' : 'Sign In'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
        
function Dashboard({ onLogout }) {
    const [stats, setStats] = useState(null);
    const [inquiries, setInquiries] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [activeTab, setActiveTab] = useState('inquiries');
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem('token');
    const headers = { authorization: token };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [statsRes, inquiriesRes, reviewsRes] = await Promise.all([
                axios.get('http://localhost:5000/api/admin/stats', { headers }),
                axios.get('http://localhost:5000/api/admin/inquiries', { headers }),
                axios.get('http://localhost:5000/api/admin/reviews', { headers })
            ]);
            setStats(statsRes.data);
            setInquiries(inquiriesRes.data);
            setReviews(reviewsRes.data);
        } catch (err) {
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/admin/reviews/${id}/approve`, {}, { headers });
            fetchData();
        } catch (err) {
            console.error('Error Approving Review:', err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this review?')) return;
        try {
            await axios.delete(`http://localhost:5000/api/admin/reviews/${id}`, { headers });
            fetchData();
        } catch (err) {
            console.error('Error deleting review:', err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        onLogout();
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    if (loading) return (
        <div className="bg-black min-h-screen flex items-center justify-center">
            <p className="text-white text-xl">Loading Dashboard⌛...</p>
        </div>
    );
    return (
        <div className="bg-black min-h-screen pt-24 px-8 pb-16">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-white text-4xl font-bold mb-2">
                            Admin Dashboard
                        </h1>
                        <p className="text-gray-400">
                            Manage Inquiries and Reviews for AI Solutions
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="text-white border border-white/30 px-6 py-3 rounded-full hover:bg-white/10 transition duration-200"
                    >
                        Logout
                    </button>
                </div>

                {stats && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="p-8 rounded-2xl text-center"
                            style={{
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid rgba(255,255,255,0.1)"
                            }}>
                            <div className="text-white text-5xl font-bold mb-2">
                                {stats.total_inquiries}
                            </div>
                            <p className="text-gray-400 uppercase tracking-widest text-sm">
                                Total Inquiries
                            </p>
                        </div>
                        <div className="p-8 rounded-2xl text-center"
                            style={{
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid rgba(255,255,255,0.1)"
                            }}>
                            <div className="text-green-400 text-5xl font-bold mb-2">
                                {stats.approved_reviews}
                            </div>
                            <p className="text-gray-400 uppercase tracking-widest text-sm">
                                Approved Reviews
                            </p>
                        </div>
                        <div className="p-8 rounded-2xl text-center"
                            style={{
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid rgba(255,255,255,0.1)"
                            }}>
                            <div className="text-yellow-400 text-5xl font-bold mb-2">
                                {stats.pending_reviews}
                            </div>
                            <p className="text-gray-400 uppercase tracking-widest text-sm">
                                Pending Reviews
                            </p>
                        </div>
                    </div>
                )}

                <div className="flex justify-center mb-12">
                    <div className="flex rounded-2xl p-1"
                        style={{
                            background: "rgba(255,255,255,0.05)",
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(255,255,255,0.1)"
                        }}>
                        <button
                            onClick={() => setActiveTab('inquiries')}
                            className={`px-8 py-3 rounded-xl text-sm font-medium tracking-widest uppercase transition duration-200 ${
                                activeTab === 'inquiries'
                                    ? 'bg-white text-black'
                                    : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            Inquiries
                        </button>  
                        <button
                            onClick={() => setActiveTab('reviews')}
                            className={`px-8 py-3 rounded-xl text-sm font-medium tracking-widest uppercase transition duration-200 ${
                                activeTab === 'reviews'
                                    ? 'bg-white text-black'
                                    : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            Reviews
                        </button>
                    </div>
                </div>

                {activeTab === 'inquiries' && (
                    <div className="rounded-2xl overflow-hidden"
                        style={{
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.1)"
                        }}>
                        {inquiries.length === 0 ? (
                            <div className="text-center py-16">
                                <p className="text-gray-500 text-xl">No inquiries yet.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                                            <th className="text-left text-gray-400 text-xs uppercase tracking-widest px-6 py-4">Name</th>
                                            <th className="text-left text-gray-400 text-xs uppercase tracking-widest px-6 py-4">Email</th>
                                            <th className="text-left text-gray-400 text-xs uppercase tracking-widest px-6 py-4">Phone</th>
                                            <th className="text-left text-gray-400 text-xs uppercase tracking-widest px-6 py-4">Company</th>
                                            <th className="text-left text-gray-400 text-xs uppercase tracking-widest px-6 py-4">Country</th>
                                            <th className="text-left text-gray-400 text-xs uppercase tracking-widest px-6 py-4">Job Title</th>
                                            <th className="text-left text-gray-400 text-xs uppercase tracking-widest px-6 py-4">Job Details</th>
                                            <th className="text-left text-gray-400 text-xs uppercase tracking-widest px-6 py-4">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {inquiries.map((inquiry, i) => (
                                            <tr key={i}
                                                style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                                                className="hover:bg-white/5 transition duration-200">
                                                <td className="text-white px-6 py-4 text-sm">{inquiry.name}</td>
                                                <td className="text-gray-400 px-6 py-4 text-sm">{inquiry.email}</td>
                                                <td className="text-gray-400 px-6 py-4 text-sm">{inquiry.phone}</td>
                                                <td className="text-gray-400 px-6 py-4 text-sm">{inquiry.company_name}</td>
                                                <td className="text-gray-400 px-6 py-4 text-sm">{inquiry.country}</td>
                                                <td className="text-gray-400 px-6 py-4 text-sm">{inquiry.job_title}</td>
                                                <td className="text-gray-400 px-6 py-4 text-sm max-w-xs truncate">{inquiry.job_details}</td>
                                                <td className="text-gray-400 px-6 py-4 text-sm">{formatDate(inquiry.created_at)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'reviews' && (
                    <div className="flex flex-col gap-4">
                        {reviews.length === 0 ? (
                            <div className="text-center py-16">
                                <p className="text-gray-500 text-xl">No reviews yet.</p>
                            </div>
                        ) : (
                            reviews.map((review, i) => (
                                <div key={i}
                                    className="flex items-start justify-between gap-6 p-6 rounded-2xl"
                                    style={{
                                        background: "rgba(255,255,255,0.03)",
                                        border: `1px solid ${review.is_approved ? 'rgba(74,222,128,0.2)' : 'rgba(255,255,255,0.1)'}`
                                    }}>

                                    <div className="flex-grow">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-white font-bold">
                                                {review.customer_name}
                                            </h3>
                                            <span className="text-gray-500 text-sm">
                                                {review.company_name}
                                            </span>
                                            <span className={`text-xs px-3 py-1 rounded-full ${
                                                review.is_approved
                                                    ? 'bg-green-400/20 text-green-400'
                                                    : 'bg-yellow-400/20 text-yellow-400'
                                            }`}>
                                                {review.is_approved ? 'Approved' : 'Pending'}
                                            </span>
                                        </div> 
                                        <div className="text-yellow-400 mb-2">
                                            {'★'.repeat(review.rating)}{'★'.repeat(5 - review.rating).replace(/★/g, '☆')}
                                        </div>
                                        <p className="text-gray-400 text-sm leading-relaxed mb-2">
                                            "{review.feedback}"
                                        </p>
                                        <p className="text-gray-600 text-xs">
                                            {formatDate(review.created_at)}
                                        </p>
                                    </div> 

                                    <div className="flex flex-col gap-2 flex-shrink-0">
                                        {!review.is_approved && (
                                            <button
                                                onClick={() => handleApprove(review.id)}
                                                className="bg-green-400/20 text-green-400 border border-green-400/30 px-4 py-2 rounded-full text-sm hover:bg-green-400/30 transition duration-200"
                                            >
                                                ✅ Approve
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(review.id)}
                                            className="bg-red-400/20 text-red-400 border border-red-400/30 px-4 py-2 rounded-full text-sm hover:bg-red-400/30 transition duration-200"
                                        >
                                            🗑️ Delete
                                        </button> 
                                     </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}

function Admin() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

    const handleLogin = () => setIsLoggedIn(true);
    const handleLogout = () => setIsLoggedIn(false);

    return isLoggedIn
        ? <Dashboard onLogout={handleLogout} />
        : <LoginForm onLogin={handleLogin} />;
}

export default Admin;
