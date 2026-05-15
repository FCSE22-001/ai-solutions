import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//star rating comp
function StarRating({ rating, onRate, interactive = false }) {
    const [hovered, setHovered] = useState(0);

    return (
        <div className="flex gap-1">
            {Array.from({ length: 5 }, (_, i) => (
                <span
                    key={i}
                    className={`text-2xl cursor-${interactive ? 'pointer' : 'default'} transition duration-200 ${
                        i < (interactive ? (hovered || rating) : rating)
                            ? 'text-yellow-400'
                            : 'text-gray-600'
                    }`}
                     onMouseEnter={() => interactive && setHovered(i + 1)}
                    onMouseLeave={() => interactive && setHovered(0)}
                    onClick={() => interactive && onRate && onRate(i + 1)}
                >
                    ★
                </span>
            ))}
        </div>
    );
}

//review comp
function ReviewForm({ onSubmitted }) {
    const [formData, setFormData] = useState({
        customer_name: '',
        company_name: '',
        feedback: '',
        rating: 0
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.rating === 0) {
            setError('Please Select a STAR Rating.');
            return;
        }
        try {
            setLoading(true);
            await axios.post('http://localhost:5000/api/reviews', {
                ...formData,
                solution_id: 1
            });
            onSubmitted();
        } catch (err) {
            setError('Something Went Wrong. Please Try Again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rounded-2xl p-10 mt-8"
            style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 0 40px rgba(255,255,255,0.05), 0 0 80px rgba(255,255,255,0.02)"
            }}>

            <h3 className="text-white text-2xl font-bold mb-2">Leave a Review</h3>
            <p className="text-gray-400 mb-8">Share Your Experience With TaskeroSuite & Our Solutions</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-400 text-sm uppercase tracking-widest">
                            Your Name *
                        </label>   
                        <input
                            type="text"
                            value={formData.customer_name}
                            onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                            required
                            placeholder="John Doe"
                            className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition duration-200"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-400 text-sm uppercase tracking-widest">
                            Company Name *
                        </label>
                        <input
                            type="text"
                            value={formData.company_name}
                            onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                            required
                            placeholder="Your Company Ltd"
                            className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition duration-200"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-gray-400 text-sm uppercase tracking-widest">
                        Your Rating *
                    </label>
                    <StarRating
                        rating={formData.rating}
                        onRate={(rating) => setFormData({ ...formData, rating })}
                        interactive={true}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-gray-400 text-sm uppercase tracking-widest">
                        Your Review *
                    </label>
                    <textarea
                        value={formData.feedback}
                        onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                        required
                        placeholder="Tell us about your experience with TaskeroSuite..."
                        rows={5}
                        className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition duration-200 resize-none"
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
                    {loading ? 'Submitting...' : 'Submit Review'}
                </button>
            </form>
        </div>
    );
}


function TaskeroSuite() {
    const [reviews, setReviews] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [reviewSubmitted, setReviewSubmitted] = useState(false);
    const [activeImage, setActiveImage] = useState(0);
    const [showAllReviews, setShowAllReviews] = useState(false);

    const screenshots = [
        '/suite1.png', '/suite2.png', '/suite3.png', '/suite4.png', '/suite5.png',
        '/suite6.png', '/suite7.png', '/suite8.png', '/suite9.png', '/suite10.png'
    ];

    const highlights = [
        {  
            icon: (
        <       img src="/task.png" alt="Task Management" className="w-8 h-8 opacity-70" />
             ),
            title: 'Task Management',
            description: 'Organise, assign and track tasks with ease'
        },
        {  
            icon: (
        <       img src="/chat.png" alt="Task Chat" className="w-8 h-8 opacity-70" />
             ),
            title: 'Team Chat',
           description: 'Real time messaging for seamless team communication'
        },
        {  
            icon: (
        <       img src="/workspace.png" alt="Shared Workspaces" className="w-8 h-8 opacity-70" />
             ),
            title: 'Shared Workspaces',
           description: 'Centralised spaces for teams to collaborate and share'
        },
        {  
            icon: (
        <       img src="/calender.png" alt="Calendar Integration" className="w-8 h-8 opacity-70" />
             ),
            title: 'Calendar Integration',
           description: 'Sync schedules and never miss an important meeting'
        },
        {  
            icon: (
        <       img src="/summary.png" alt="Meeting Summaries" className="w-8 h-8 opacity-70" />
             ),
            title: 'Meeting Summaries',
           description: 'Automatically generated summaries after every meeting'
        },
        {  
            icon: (
        <       img src="/document.png" alt="Document Collaboration" className="w-8 h-8 opacity-70" />
             ),
            title: 'Document Collaboration',
           description: 'Edit and share documents together in real time'
        },
        {  
            icon: (
        <       img src="/transcript.png" alt="Meeting Transcription" className="w-8 h-8 opacity-70" />
             ),
            title: 'Meeting Transcription',
           description: 'AI-powered live transcription for every meeting'
        },
        {  
            icon: (
        <       img src="/action.png" alt="Action Item Extraction" className="w-8 h-8 opacity-70" />
             ),
            title: 'Action Item Extraction',
           description: 'AI automatically identifies and assigns action items'
        },
        {  
            icon: (
        <       img src="/reminder.png" alt="Smart Reminders" className="w-8 h-8 opacity-70" />
             ),
            title: 'Smart Reminders',
           description: 'Intelligent reminders that keep your team on track'
        },
    ];

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = () => {
        axios.get('http://localhost:5000/api/solutions/1/reviews')
            .then(res => setReviews(res.data))
            .catch(err => console.error('Error fetching reviews:', err));
    };

    const handleReviewSubmitted = () => {
        setReviewSubmitted(true);
        setShowForm(false);
        fetchReviews();
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    return (
        <div className="bg-black min-h-screen">
             <section className="relative w-full h-[70vh]">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/taskerosuite.png')" }}
                />
                <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.9) 100%)" }}
                />
                <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to bottom, transparent 40%, black 100%)" }}
                />
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-8 pt-16">
                    <span className="text-gray-400 text-sm font-medium tracking-widest uppercase mb-4 block">
                        AI Solutions — Productivity Suite & Collaboration Suite
                    </span>
                    <h1 className="text-white text-7xl font-bold leading-tight mb-6">
                        Taskero
                    </h1>
                    <p className="text-gray-300 text-xl leading-relaxed max-w-2xl">
                        The All-In-One productivity and collaboration platform built for the modern workforce.
                    </p>
                </div>
            </section>

            <section className="py-24 px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-gray-500 text-sm font-medium tracking-widest uppercase mb-4 block">
                            What's Included
                        </span>
                        <h2 className="text-white text-4xl font-bold mb-4">
                            Solution Highlights
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Everything your team needs to collaborate, communicate and deliver — all in one place.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {highlights.map((highlight, i) => (
                            <div key={i}
                                className="flex items-start gap-4 p-6 rounded-2xl transition duration-300 hover:bg-white/5"
                                style={{
                                    background: "rgba(255,255,255,0.03)",
                                    border: "1px solid rgba(255,255,255,0.08)"
                                }}>
                                <div className="text-white opacity-70 flex-shrink-0">
                                    {highlight.icon}
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold text-lg mb-1">
                                        {highlight.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {highlight.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/*solution description*/}
            <section className="py-16 px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="text-gray-500 text-sm font-medium tracking-widest uppercase mb-4 block">
                        About TaskeroSuite
                    </span>
                     <h2 className="text-white text-4xl font-bold mb-8">
                        Built For The Modern Workforce
                    </h2>
                    <p className="text-gray-400 text-xl leading-relaxed mb-6">
                        TaskeroSuite is a powerful All-In-One productivity and collaboration platform designed to transform the digital employee experience. Built for modern teams, it combines intelligent task management, seamless communication tools, and AI-powered features to help your workforce achieve more, TOGETHER.
                    </p>
                    <p className="text-gray-400 text-xl leading-relaxed">
                        Whether your team is in the office, working remotely, or spread across the globe, TaskeroSuite keeps everyone connected, aligned, and productive. From smart reminders to AI-powered meeting transcriptions, every feature is designed with one goal in mind, EMPOWERING your team to do their best work.
                    </p>
                </div>
            </section>

            <section className="py-16 px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="text-gray-500 text-sm font-medium tracking-widest uppercase mb-4 block">
                            Take A Sneak Peek 
                        </span>
                        <h2 className="text-white text-4xl font-bold mb-4">
                            Screenshots
                        </h2>
                    </div>

                    <div className="rounded-2xl overflow-hidden mb-6 shadow-2xl">
                        <img
                            src={screenshots[activeImage]}
                            alt={`TaskeroSuite screenshot ${activeImage + 1}`}
                            className="w-full h-[500px] object-cover"
                        />
                    </div>

                    <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                        {screenshots.map((screenshot, i) => (
                            <div
                                key={i}
                                onClick={() => setActiveImage(i)}
                                className={`flex-shrink-0 w-32 h-20 rounded-lg overflow-hidden cursor-pointer transition duration-200 ${
                                    activeImage === i
                                        ? 'ring-2 ring-white opacity-100'
                                        : 'opacity-50 hover:opacity-80'
                                }`}
                            >
                                <img
                                    src={screenshot}
                                    alt={`Thumbnail ${i + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/*Reviews*/}
            <section className="py-16 px-8">
                <div className="max-w-4xl mx-auto">

                    <div className="flex justify-between items-center mb-12">
                        <div>
                            <span className="text-gray-500 text-sm font-medium tracking-widest uppercase mb-4 block">
                                Client Feedback
                            </span>
                            <h2 className="text-white text-4xl font-bold">
                                Reviews
                            </h2>
                        </div>
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition duration-200"
                        >
                            {showForm ? 'Cancel' : 'Write a Review'}
                        </button>
                    </div>

                     {showForm && (
                        <ReviewForm onSubmitted={handleReviewSubmitted} />
                    )}

                    {reviewSubmitted && (
                        <div className="text-center py-8 mb-8 rounded-2xl"
                            style={{
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid rgba(255,255,255,0.1)"
                            }}>
                            <p className="text-white text-xl">🥳🎉 Thank you! Your review has been submitted and is ending approval. 🎉🥳</p>
                        </div>
                    )}

                <div className="flex flex-col gap-6">
                        {reviews.length === 0 ? (
                            <div className="text-center py-16">
                                <p className="text-gray-500 text-xl">No Reviews Yet. Be The First To Review TaskeroSuite!</p>
                            </div>
                        ) : (
                            <>
                                <div
                                    className="p-8 rounded-2xl"
                                    style={{
                                        background: "rgba(255,255,255,0.03)",
                                        border: "1px solid rgba(255,255,255,0.08)"
                                    }}>
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-lg">
                                                {reviews[0].customer_name.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className="text-white font-bold text-lg">
                                                    {reviews[0].customer_name}
                                                </h3>
                                                <p className="text-gray-400 text-sm">
                                                    {reviews[0].company_name}
                                                </p>
                                            </div>
                                        </div>   
                                        <div className="text-right">
                                            <StarRating rating={reviews[0].rating} />
                                            <p className="text-gray-500 text-sm mt-1">
                                                Reviewed: {formatDate(reviews[0].created_at)}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-gray-300 text-lg leading-relaxed">
                                        "{reviews[0].feedback}"
                                    </p>
                                </div>

                                {reviews.length > 1 && (
                                    <div className="text-center mt-4">
                                        <button
                                            onClick={() => setShowAllReviews(true)}
                                            className="text-white border border-white/30 px-8 py-3 rounded-full hover:bg-white/10 transition duration-200"
                                        >
                                            Read All Reviews ({reviews.length})
                                        </button>
                                    </div>
                                )}
                            </>    
                        )}                       
                </div>

                {showAllReviews && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center px-4"
                        style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}
                        onClick={() => setShowAllReviews(false)}
                    >
                        <div
                                className="relative w-full max-w-3xl max-h-[80vh] rounded-2xl p-8 overflow-y-auto"
                                style={{
                                    background: "rgba(255,255,255,0.05)",
                                    backdropFilter: "blur(20px)",
                                    border: "1px solid rgba(255,255,255,0.15)",
                                    boxShadow: "0 0 60px rgba(255,255,255,0.05)"
                                }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className="text-white text-2xl font-bold">
                                        All Reviews ({reviews.length})
                                    </h2>
                                    <button
                                        onClick={() => setShowAllReviews(false)}
                                        className="text-gray-400 hover:text-white transition duration-200 text-3xl leading-none"
                                    >
                                        ×
                                    </button>
                                </div>

                                <div className="flex flex-col gap-6">
                                    {reviews.map((review, i) => (
                                        <div key={i}
                                            className="p-6 rounded-xl"
                                            style={{
                                                background: "rgba(255,255,255,0.03)",
                                                border: "1px solid rgba(255,255,255,0.08)"
                                            }}>
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white font-bold">
                                                        {review.customer_name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-white font-bold">
                                                            {review.customer_name}
                                                        </h3>
                                                        <p className="text-gray-400 text-sm">
                                                            {review.company_name}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <StarRating rating={review.rating} />
                                                    <p className="text-gray-500 text-xs mt-1">
                                                        {formatDate(review.created_at)}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="text-gray-300 leading-relaxed">
                                                "{review.feedback}"
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <section className="py-16 px-8">
                <div className="max-w-4xl mx-auto text-center">
                     <div className="rounded-2xl p-12"
                        style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.08)"
                        }}>
                        <img
                            src="/taskerosuite.png"
                            alt="TaskeroSuite Logo"
                            className="h-16 w-auto mx-auto mb-6 opacity-80"
                        />
                        <h2 className="text-white text-3xl font-bold mb-4">
                            Interested in Adapting TaskeroSuite?
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
                            Do you love this solution and want it for your business? Click the button below and let us know.
                        </p> 
                        <Link
                            to="/contact-us"
                            state={{
                                source: 'TaskeroSuite',
                                logo: '/taskerosuite.png'
                            }}
                            className="bg-white text-black px-8 py-4 rounded-full font-medium text-lg hover:bg-gray-200 transition duration-200"
                        >
                            Get This Solution ➡️
                        </Link> 
                    </div>
                </div>
            </section>
        </div>
        
    );
}

export default TaskeroSuite;

            
