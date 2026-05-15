import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Reviews() {
    const [solutions, setSolutions] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/solutions')
            .then(res => setSolutions(res.data))
            .catch(err => console.error('Error fetching solutions:', err));
    }, []);

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-600'}>
                ★
            </span>
        ));
    };

    const dummySolutions = [
        {
            id: 2,
            name: 'Kirsby Support Assistant',
            description: 'An Intelligent Virtual Assistant That Provides Instant Support To Employees, Answering Queries And Resolving Issues.',
            image_url: '/support.png',
            rating: 4.5
        },
        {
            id: 3,
            name: 'Aswean Help Desk',
            description: 'A Modern, Intuitive Help Desk Solution That Centralises Support Requests And Automates Ticket Routing.',
            image_url: '/helpdesk.png',
            rating: 4.2
        },
        {
            id: 4,
            name: 'Eagle Eye Analytics',
            description: 'A Comprehensive Analytics Platform That Provides Deep Insights Into Employee Engagement And Productivity.',
            image_url: '/analytics.png',
            rating: 4.8
        }
    ];

    return (
        <div className="bg-black min-h-screen">

            <section className="relative w-full h-[60vh]">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/reviews.png')" }}
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
                    <span className="text-gray-400 text-xl font-medium tracking-widest uppercase mb-4 block">
                        Our Solutions
                    </span>
                    <h1 className="text-white text-6xl font-bold leading-tight mb-6">
                        What Our Clients <br />
                        <span className="text-gray-400">Are Saying</span>
                    </h1>
                    <p className="text-gray-300 text-xl leading-relaxed max-w-2xl">
                        Explore our software solutions and read reviews from the businesses we've partnered with.
                    </p>
                </div>
            </section>

            {/*Solutions List*/}
            <section className="py-24 px-8">
                <div className="max-w-5xl mx-auto flex flex-col gap-8">
                    <Link to="/solutions/taskero-suite">
                        <div className="flex items-center gap-8 rounded-2xl p-6 cursor-pointer hover:bg-white/5 transition duration-300"
                            style={{
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,255,255,0.1)"
                            }}>

                            <div className="flex-shrink-0 w-48 h-32 rounded-xl overflow-hidden">
                                <img
                                    src="/suitelogo.png"
                                    alt="Taskero Suite logo"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="flex-grow">
                                <h2 className="text-white text-2xl font-bold mb-2">
                                    Taskero: Productivity & Collaboration Suite
                                </h2>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    A Powerful All-In-One Platform Designed To Transform The Way Your Teams Work Together.
                                </p>
                                <p className="text-blue-400 text-sm mt-3">
                                    Click to view reviews →
                                </p>
                            </div>

                            <div className="flex-shrink-0 text-center">
                                <div className="text-5xl font-bold text-white mb-1">4.8</div>
                                <div className="text-yellow-400 text-2xl mb-1">★★★★★</div>
                                <div className="text-gray-400 text-sm">5 reviews</div>
                            </div>
                        </div>
                    </Link>

                    {/*Dummy solutions */}
                    {dummySolutions.map((solution) => (
                        <div key={solution.id}
                            className="flex items-center gap-8 rounded-2xl p-6"
                            style={{
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,255,255,0.1)"
                            }}>
                            
                            <div className="flex-shrink-0 w-48 h-32 rounded-xl overflow-hidden bg-white/5 flex items-center justify-center">
                                <img
                                    src={solution.image_url}
                                    alt={solution.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="flex-grow">
                                <h2 className="text-white text-2xl font-bold mb-2">
                                    {solution.name}
                                </h2>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {solution.description}
                                </p>
                            </div>

                             <div className="flex-shrink-0 text-center">
                                <div className="text-5xl font-bold text-white mb-1">
                                    {solution.rating}
                                </div>
                                <div className="text-yellow-400 text-2xl mb-1">
                                    {renderStars(Math.round(solution.rating))}
                                </div>
                                <div className="text-gray-400 text-sm">10 Reviews</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
                        
        </div>
    );
}

export default Reviews;