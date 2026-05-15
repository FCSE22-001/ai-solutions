import { useState } from 'react';
import { Link } from 'react-router-dom';

function Solutions() {
    const [activeTab, setActiveTab] = useState('current');

    const currentSolutions = [
        {
            id: 1,
            name: 'Mecer Works',
            subtitle: 'Productivity & Collaboration Suite',
            description: 'A comprehensive workplace platform built to revolutionise how modern teams collaborate, communicate and manage their daily workload through smart automation and AI-driven tools',
            image: '/mecerworks.png',
            interactive: false,
        },
        {
            id: 2,
            name: 'NS Support',
            subtitle: 'AI-Powered HR Support',
            description: 'A next-generation HR support assistant that leverages artificial intelligence to handle employee queries, streamline HR processes and deliver instant, accurate resolutions',
            image: '/nssupport.png',
            interactive: false
        },
        {
            id: 3,
            name: 'Combotel Help Desk',
            subtitle: 'IT Support & Ticket Management',
            description: 'A sleek and powerful help desk solution that brings all support requests into one place, automating ticket assignment and empowering IT teams to resolve issues with speed and precision.',
            image: '/combohelpdesk.png',
            interactive: false
        },
        {
            id: 4,
            name: 'MicroGlass Analytics',
            subtitle: 'Workforce Intelligence',
            description: 'An advanced workforce analytics platform that transforms raw employee data into meaningful insights, helping business leaders make informed decisions on engagement and performance.',
            image: '/mganalytics.png',
            interactive: false
        }
    ];

    const industrySolutions = [
        {
            id: 1,
            name: 'TaskeroSuite',
            subtitle: 'Productivity & Collaboration Suite',
            description: 'An All-In-One productivity and collaboration platform designed to transform the digital employee experience through intelligent task management and AI-powered features.',
            image: '/taskerosuite.png',
            tag: 'Productivity',
            link: '/solutions/taskero-suite',
            interactive: true
        },
        {
            id: 2,
            name: 'Kirsby Support Assistant',
            subtitle: 'AI-Powered HR Support',
            description: 'An intelligent virtual assistant that provides instant support to employees, answering queries and resolving issues through the power of artificial intelligence.',
            image: '/support.png',
            tag: 'Assistant',
            interactive: false
        },
        {
            id: 3,
            name: 'Aswean Help Desk',
            subtitle: 'IT Support & Ticket Management',
            description: 'A modern, intuitive help desk solution that centralizes support requests, automates ticket routing, and gives your support teams the tools they need.',
            image: '/helpdesk.png',
            tag: 'Help Desk',
            interactive: false
        },
        {
            id: 4,
            name: 'Eagle Eye Analytics',
            subtitle: 'Workforce Intelligence',
            description: 'A comprehensive analytics platform that provides deep insights into employee engagement, productivity trends, and workforce performance.',
            image: '/analytics.png',
            tag: 'Analysis',
            interactive: false
        },
        {
            id: 5,
            industry: 'Finance',
            name: 'Financial Analytics Dashboard',
            description: 'Real-time financial reporting and KPI tracking system built for banking institutions, enabling smarter decisions through live data visualisation and automated reporting.',
            image: '/finsolution.png',
            tag: 'Finance',
            interactive: false
        },
        {
            id: 6,
            industry: 'Hospitality',
            name: 'Guest Experience Platform',
            description: 'A comprehensive reservation management and guest feedback system that elevates the hospitality experience through seamless digital touchpoints.',
            image: '/hospsolution.png',
            tag: 'Hospitality',
            interactive: false
        },
        {
            id: 7,
            industry: 'Mining',
            name: 'Operations Monitoring System',
            description: 'Real-time equipment tracking and safety compliance dashboard designed to optimise mining operations and improve workforce safety across sites.',
            image: '/solmining.png',
            tag: 'Mining',
            interactive: false
        },
        {
            id: 8,
            industry: 'Retail',
            name: 'Retail Intelligence Suite',
            description: 'An intelligent inventory management and customer analytics platform that helps retail businesses streamline operations and drive data-informed growth.',
            image: '/retasolution.png',
            tag: 'Retail',
            interactive: false
        },
        {
            id: 9,
            industry: 'Telecommunications',
            name: 'Network Performance Dashboard',
            description: 'A powerful network monitoring and fault detection system that gives telecommunications providers complete visibility into their infrastructure.',
            image: '/telesolution.png',
            tag: 'Telecomms',
            interactive: false
        }
    ];

    return (
        <div className="bg-black min-h-screen">
            <section className="relative w-full h-[60vh]">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/herosol.png')" }}
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
                        Our Solutions
                    </span>
                    <h1 className="text-white text-6xl font-bold leading-tight mb-6">
                        Intelligent Software, <br />
                        <span className="text-gray-400">Delivered With Purpose</span>
                    </h1>
                    <p className="text-gray-300 text-xl leading-relaxed max-w-2xl">
                        From productivity tools to industry-specific platforms, we design and deliver
                        software solutions that drive real results — empowering businesses to work
                        smarter and grow faster.
                    </p>
                </div>
            </section>

            <section className="py-24 px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="flex justify-center mb-12">
                        <div className="flex rounded-2xl p-1"
                            style={{
                                background: "rgba(255,255,255,0.05)",
                                backdropFilter: "blur(10px)",
                                border: "1px solid rgba(255,255,255,0.1)"
                            }}>
                            <button
                                onClick={() => setActiveTab('current')}
                                className={`px-8 py-3 rounded-xl text-sm font-medium tracking-widest uppercase transition duration-200 ${
                                    activeTab === 'current'
                                        ? 'bg-white text-black'
                                        : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                Current Solutions
                            </button>
                            <button
                                onClick={() => setActiveTab('industry')}
                                className={`px-8 py-3 rounded-xl text-sm font-medium tracking-widest uppercase transition duration-200 ${
                                    activeTab === 'industry'
                                        ? 'bg-white text-black'
                                        : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                Past Industry Solutions
                            </button>
                        </div>
                    </div>

                    {activeTab === 'current' && (
                        <div className="flex flex-col gap-6">
                            {currentSolutions.map((solution) => (
                                <div key={solution.id}
                                    className="flex items-center gap-8 rounded-2xl p-6 transition duration-300"
                                    style={{
                                        background: "rgba(255,255,255,0.03)",
                                        border: "1px solid rgba(255,255,255,0.1)"
                                    }}>
                                    <div className="flex-shrink-0 w-48 h-32 rounded-xl overflow-hidden">
                                        <img
                                            src={solution.image}
                                            alt={solution.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-grow">
                                        <span className="text-gray-500 text-xs uppercase tracking-widest mb-1 block">
                                            {solution.subtitle}
                                        </span>
                                        <h2 className="text-white text-2xl font-bold mb-2">
                                            {solution.name}
                                        </h2>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            {solution.description}
                                        </p>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <span className="text-gray-600 text-sm border border-white/10 px-4 py-2 rounded-full">
                                            Available
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'industry' && (
                        <div className="flex flex-col gap-6">
                            {industrySolutions.map((solution) => (
                                <div key={solution.id}
                                    className="flex items-center gap-8 rounded-2xl p-6 transition duration-300"
                                    style={{
                                        background: "rgba(255,255,255,0.03)",
                                        border: "1px solid rgba(255,255,255,0.1)"
                                    }}>
                                    <div className="flex-shrink-0 w-48 h-32 rounded-xl overflow-hidden">
                                        <img
                                            src={solution.image}
                                            alt={solution.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-grow">
                                        <span className="text-gray-500 text-xs uppercase tracking-widest mb-1 block">
                                            {solution.subtitle || `${solution.industry} Industry`}
                                        </span>
                                        <h2 className="text-white text-2xl font-bold mb-2">
                                            {solution.name}
                                        </h2>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            {solution.description}
                                        </p>
                                    </div>
                                    <div className="flex-shrink-0">
                                        {solution.interactive ? (
                                            <Link
                                                to={solution.link}
                                                className="bg-white text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-200 transition duration-200 whitespace-nowrap"
                                            >
                                                View Details ➡️
                                            </Link>
                                        ) : (
                                            <span className="text-white text-sm border border-white/20 px-4 py-2 rounded-full">
                                                {solution.tag}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default Solutions;