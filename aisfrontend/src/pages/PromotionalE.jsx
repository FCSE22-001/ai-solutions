import { useState } from 'react';

function PromotionalE() {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [activeImage, setActiveImage] = useState(0);

    const carouselImages = [
        '/promo1.png', '/promo2.png', '/promo3.png', '/promo4.png',
        '/promo5.png', '/promo6.png', '/promo7.png'
    ];

    const events = [
        {
            id: 1,
            name: 'AI Solutions Product Launch',
            date: 'December 2024',
            location: 'Sunderland, UK',
            description: 'The official launch of our latest suite of AI-powered software solutions, bringing together industry leaders, partners and clients for an unforgettable evening of innovation and celebration.',
            images: ['/promo8.png', '/promo9.png', '/promo10.png', '/promo11.png', '/promo12.png'],
            cover: '/promo8.png'
        },
        {
            id: 2,
            name: 'Tech Innovation Summit',
            date: 'March 2025',
            location: 'Sunderland, UK',
            description: 'A full-day summit bringing together the brightest minds in technology to explore the future of digital workplaces, AI integration and enterprise software development.',
            images: ['/promo13.png', '/promo14.png', '/promo15.png', '/promo16.png', '/promo17.png'],
            cover: '/promo13.png'
        },
        {
            id: 3,
            name: 'Digital Workplace Conference',
            date: 'September 2025',
            location: 'Sunderland, UK',
            description: 'An immersive conference focused on the evolution of the digital employee experience, featuring keynote speakers, live demos and networking sessions with industry professionals.',
            images: ['/promo18.png', '/promo19.png', '/promo20.png', '/promo1.png', '/promo2.png'],
            cover: '/promo18.png'
        },
        {
            id: 4,
            name: 'AI Solutions Annual Gala',
            date: 'December 2025',
            location: 'London, UK',
            description: 'Our prestigious annual gala celebrating another year of innovation, growth and outstanding partnerships. An elegant evening recognising the achievements of our team and clients.',
            images: ['/promo3.png', '/promo4.png', '/promo5.png', '/promo6.png', '/promo7.png'],
            cover: '/promo3.png'
        }
    ];

    const openEvent = (event) => {
        setSelectedEvent(event);
        setActiveImage(0);
    };

    const closeEvent = () => {
        setSelectedEvent(null);
        setActiveImage(0);
    };

    return (
        <div className="bg-black min-h-screen">

            {/* Hero Section */}
            <section className="relative w-full h-[60vh]">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/promotionalhero.png')" }}
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
                        Our Events
                    </span>
                    <h1 className="text-white text-6xl font-bold leading-tight mb-6">
                        Promotional Events
                    </h1>
                    <p className="text-gray-300 text-xl leading-relaxed max-w-2xl">
                        A look at the events, launches and moments that have shaped AI Solutions.
                    </p>
                </div>
            </section>

            {/* Photo Carousel */}
            <section className="py-16">
                <div className="text-center mb-12 px-8">
                    <span className="text-gray-500 text-sm font-medium tracking-widest uppercase mb-4 block">
                        Photo Highlights
                    </span>
                    <h2 className="text-white text-4xl font-bold mb-4">
                        Behind The Scenes
                    </h2>
                    <p className="text-gray-400 text-lg">
                        A glimpse into the moments that make AI Solutions special.
                    </p>
                </div>

                <div className="relative overflow-hidden">
                    <div className="absolute left-0 top-0 h-full w-32 z-10"
                        style={{ background: "linear-gradient(to right, black, transparent)" }}
                    />
                    <div className="absolute right-0 top-0 h-full w-32 z-10"
                        style={{ background: "linear-gradient(to left, black, transparent)" }}
                    />
                    <div className="flex animate-scroll-promo">
                        {carouselImages.map((img, i) => (
                            <div key={i} className="flex-shrink-0 mx-3 w-80 h-52 rounded-2xl overflow-hidden">
                                <img
                                    src={img}
                                    alt={`Promotional photo ${i + 1}`}
                                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                                />
                            </div>
                        ))}
                        {carouselImages.map((img, i) => (
                            <div key={`dup-${i}`} className="flex-shrink-0 mx-3 w-80 h-52 rounded-2xl overflow-hidden">
                                <img
                                    src={img}
                                    alt={`Promotional photo ${i + 1}`}
                                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Event Cards */}
            <section className="py-16 px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="text-gray-500 text-sm font-medium tracking-widest uppercase mb-4 block">
                            Past Events
                        </span>
                        <h2 className="text-white text-4xl font-bold mb-4">
                            Our Events
                        </h2>
                        <p className="text-gray-400 text-lg">
                            Click on an event to view the full photo gallery.
                        </p>
                    </div>

                    <div className="flex flex-col gap-6">
                        {events.map((event) => (
                            <div
                                key={event.id}
                                onClick={() => openEvent(event)}
                                className="flex items-center gap-8 rounded-2xl p-6 cursor-pointer hover:bg-white/5 transition duration-300"
                                style={{
                                    background: "rgba(255,255,255,0.03)",
                                    border: "1px solid rgba(255,255,255,0.1)"
                                }}>
                                <div className="flex-shrink-0 w-48 h-32 rounded-xl overflow-hidden">
                                    <img
                                        src={event.cover}
                                        alt={event.name}
                                        className="w-full h-full object-cover transition duration-500"
                                    />
                                </div>
                                <div className="flex-grow">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-gray-500 text-xs uppercase tracking-widest">
                                            {event.date}
                                        </span>
                                        <span className="text-gray-600">•</span>
                                        <span className="text-gray-500 text-xs uppercase tracking-widest">
                                            {event.location}
                                        </span>
                                    </div>
                                    <h2 className="text-white text-2xl font-bold mb-2">
                                        {event.name}
                                    </h2>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {event.description}
                                    </p>
                                </div>
                                <div className="flex-shrink-0">
                                    <span className="text-white border border-white/30 px-4 py-2 rounded-full text-sm hover:bg-white/10 transition duration-200">
                                        View Gallery →
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Event Gallery Modal */}
            {selectedEvent && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center px-4"
                    style={{ background: "rgba(0,0,0,0.9)", backdropFilter: "blur(8px)" }}
                    onClick={closeEvent}
                >
                    <div
                        className="relative w-full max-w-4xl rounded-2xl p-8"
                        style={{
                            background: "rgba(255,255,255,0.05)",
                            backdropFilter: "blur(20px)",
                            border: "1px solid rgba(255,255,255,0.15)",
                            boxShadow: "0 0 60px rgba(255,255,255,0.05)"
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-white text-2xl font-bold">
                                    {selectedEvent.name}
                                </h2>
                                <p className="text-gray-400 text-sm">
                                    {selectedEvent.date} • {selectedEvent.location}
                                </p>
                            </div>
                            <button
                                onClick={closeEvent}
                                className="text-gray-400 hover:text-white transition duration-200 text-3xl leading-none"
                            >
                                ×
                            </button>
                        </div>

                        <div className="rounded-xl overflow-hidden mb-4 h-80">
                            <img
                                src={selectedEvent.images[activeImage]}
                                alt={`${selectedEvent.name} photo ${activeImage + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                            {selectedEvent.images.map((img, i) => (
                                <div
                                    key={i}
                                    onClick={() => setActiveImage(i)}
                                    className={`flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden cursor-pointer transition duration-200 ${
                                        activeImage === i
                                            ? 'ring-2 ring-white opacity-100'
                                            : 'opacity-50 hover:opacity-80'
                                    }`}
                                >
                                    <img
                                        src={img}
                                        alt={`Thumbnail ${i + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default PromotionalE;