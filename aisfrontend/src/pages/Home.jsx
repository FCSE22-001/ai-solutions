import {Link} from 'react-router-dom';
import {useEffect, useRef, useState} from 'react';

function CountUp({target, suffix}){
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasStarted){
                    setHasStarted(true);
                }
            },
            {threshold: 0.5}
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [hasStarted]);

    useEffect(() => {
        if (!hasStarted) return;
        let start = 0;
        const duration = 2000;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [hasStarted, target]);

    return (
        <span ref={ref}>
            {count}{suffix}
        </span>
    );
}

function ReviewsCarousel() {
    const[reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/reviews')
        .then(res => res.json())
        .then(data => setReviews(data))
        .catch(err => console.error('Error fetching reviews:', err));
    }, []);

    const renderStars = (rating) => {
        return Array.from({ length: 5}, (_, i) => (
            <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-600'}>
                ★
            </span>
        ));
    };

    if (reviews.length === 0) return (
        <div className="text-center text-gray-500">Loading reviews....</div>
    );

    return (
        <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-32 z-10"
            style={{background: "linear-gradient(to right, black, transparent)"}}
            />
            <div className="absolute right-0 top-0 h-full w-32 z-10"
            style={{background: "linear-gradient(to left, black, transparent)"}}
            />

            <div className="flex animate-scroll-reviews">

                {reviews.map((review, i) => (
                <div key={i} className="flex-shrink-0 mx-4 w-[600px]">
                    <div className="relative">
                        <img src="/reviewblock.png"
                        alt="Review Background"
                        className="w-full h-auto"
                        />
                        <div className="absolute inset-0 flex flex-col justify-center px-12 py-10">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-white text-xl font-bold">
                                        {review.customer_name}
                                    </h3>
                                    <p className="text-gray-400 text-xl">
                                        {review.company_name}
                                    </p>
                                </div>
                                <div className="text-xl">
                                    {renderStars(review.rating)}
                                </div>
                            </div>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                "{review.feedback}"
                            </p>
                        </div>
            </div>
        </div>
    ))}

    {reviews.map((review, i) => (
        <div key={`dup-${i}`} className="flex-shrink-0 mx-4 w-[600px]">
            <div className="relative">
                <img src="/reviewblock.png"
                alt="Review Backgroung"
                className="w-full h-auto"
                />
                <div className="absolute inset-0 flex flex-col justify-center px-12 py-10">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-white text-xl font-bold">
                                {review.customer_name}
                            </h3>
                            <p className="text-gray-400 text-xl">
                                {review.company_name}
                            </p>
                        </div>
                        <div className="text-xl">
                            {renderStars(review.rating)}
                        </div>
                    </div>
                    <p className="text-gray-300 text-xl leading-relaxed">
                        "{review.feedback}"
                    </p>
                </div>
            </div>
        </div>
    ))}
    </div>
    </div>
    );
}

  


function Home() {
    return (
        <div className="bg-black">

            {/*Poiiii, this is the hero section*/}
            <section className="relative w-full h-screen">

                {/*Poiii, this is the image*/}
                <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{backgroundImage: "url('/hero.png')"}}
                />
                {/*Poiii, this is the image bottom fade*/}
                <div
                className="absolute inset-0"
                style={{
                    background: "linear-gradient(to bottom, transparent 60%, black 100%)"
                }}
                />
                {/*Poiii, this is the text overlay to make it more readable*/}
                <div
                className="absolute inset-0"
                style={{
                    background: "linear-gradient(to right, rgba(0,0,0,0.85) 40%, transparent 100%)"
                }}
                />

                {/*Poi, this is the content of the hero*/}
                <div className="relative z-10 flex flex-col justify-center items-start h-full max-w-7xl mx-auto pl-8 pt-16">
                    <div className="max-w-4xl">
                        <span className="text-gray-400 text-4xl font-medium tracking-widest mb-6 block">
                            Delivering Intelligent Software Solutions.
                        </span>
                        <h1 className="text-white text-7xl font-bold leading-tight mb-8">
                            Transforming Industries, <br />
                            <span className="text-gray-400"> Through Innovative Technology.</span>
                        </h1>
                        <p className="text-gray-300 text-xl leading-relaxed mb-10 max-w-2xl">
                            We aim to design and deliver cutting-edge software to empower your business to operate 
                            smarter, faster and more efficiently.
                        </p>
                        <div className="flex items-center gap-4">
                            <Link
                            to="/contact-us"
                            className="bg-white text-black px-8 py-4 rounded-full font-medium text-lg hover:bg-gray-200 transition duration-200">
                                Contact Us
                            </Link>
                            <Link
                            to="/solutions"
                            className="text-white border border-white/40 px-8 py-4 rounded-full font-medium hover:bg-white/10 transition duration-200">
                                Our Solutions
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/*Poiiiii, this is the demo screenshot section*/}
            <section className="bg-black py-2 px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-white text-4xl font-bold mb-6">
                            Powerful Software, Built For You
                        </h2>
                        <p className="text-gray-400 text-xl leading-relaxed max-w-2xl mx-auto">
                            We tailor to various industries and needs, from finance to mining, from dashboards to operational tools, we build intelligent 
                            systems that give your business complete visibility and control.
                        </p>
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-2xl">
                        <img src="/glasssol.png"
                        alt="Dashboard Screenshots"
                        className="w-full h-auto"
                        />
                    </div>
                </div>
            </section>

            {/*Poi, this is the carousel section*/}
            <section className="bg-black py-4">
                <div className="text-center mb-6">
                    <span className="text-gray-500 text-2xl font-medium tracking-widest uppercase mb-4 block">
                        Our Partners & Clients 
                    </span>
                    <h2 className="text-white text-4xl font-bold mb-4">
                        Trusted by Industry Leaders
                    </h2>
                </div>

                    {/* Poiiiii, this is the carousel section*/}
                    <div className="relative overflow-hidden">
                        {/*Poiiii, this is the fading for the left and right*/}
                        <div className="absolute left-0 top-0 h-full w-32 z-10"
                        style={{background: "linear-gradient(to right, black, transparent)"}}
                        />
                        <div className="absolute right-0 top-0 h-full w-32 z-10"
                        style={{background: "linear-gradient(to left, black, transparent)"}}
                        />

                        <div className="flex animate-scroll">
                            {[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map((num) => (
                                <div key={num} className="flex-shrink-0 mx-8">
                                    <img src={`/logo${num}.png`}
                                    alt={`Partner logo ${num}`}
                                    className="h-24 w-auto opacity-70 hover:opacity-100 transition duration-200"
                                    />
                                </div>
                             ))}
                             {[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map((num) => (
                                <div key={`dup-${num}`} className="flex-shrink-0 mx-8">
                                    <img
                                    src={`/logo${num}.png`}
                                    alt={`Partner logo ${num}`}
                                    className="h-24 w-auto opacity-70 hover:opacity-100 transition duration-200"
                                    />
                                </div>
                             ))}  
                         </div>  
                    </div>
            </section>

            {/*Poiii this is the industries section*/}
            <section className="bg-black py-16">
                <div className="text-center mb-12 px-8">
                    <span className="text-gray-500 text-xl font-medium tracking-widest uppercase mb-4 block">
                        What We Do
                    </span>
                    <h2 className="text-white text-4xl font-bold mb-4">
                        Industries We Serve
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        We deliver tailored softare solutions across a wide range of industries, helping businesses improve and grow.
                    </p>
                </div>

                {/*horizontal scroll poiii*/}
                <div className="overflow-x-auto scrollbar-hide px-8">
                    <div className="flex gap-6" style={{width: 'max-content'}}>

                        {/*Industry spaces*/}
                        <div className="relative rounded-2xl overflow-hidden flex-shrink-0 w-[700px] h-[400px] group">
                            <img src="/finance.png"
                            alt="Finance"
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"/>
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition duration-300"/>
                            <div className="absolute bottom-16 left-0 right-0 p-4">
                                <p className="text-gray-200 text-xl">
                                    Empowering financial institutions with intelligent systems for smarter decisions.
                                </p>
                            </div>
                        </div>

                        <div className="relative rounded-2xl overflow-hidden flex-shrink-0 w-[700px] h-[400px] group">
                            <img src="/hospitality.png"
                            alt="Hospitality"
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"/>
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition duration-300"/>
                            <div className="absolute bottom-16 left-0 right-0 p-4">
                                <p className="text-gray-200 text-xl">
                                    Elevating experiences through seamless hospitality management solutions.
                                </p>
                            </div>
                        </div>

                        <div className="relative rounded-2xl overflow-hidden flex-shrink-0 w-[700px] h-[400px] group">
                            <img src="/mining.png"
                            alt="Mining"
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"/>
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition duration-300"/>
                            <div className="absolute bottom-16 left-0 right-0 p-4">
                                <p className="text-gray-200 text-xl">
                                    Optimising mining operations with real-time data tracking and management.
                                </p>
                            </div>
                        </div>

                        <div className="relative rounded-2xl overflow-hidden flex-shrink-0 w-[700px] h-[400px] group">
                            <img src="/retail.png"
                            alt="Retail"
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"/>
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition duration-300"/>
                            <div className="absolute bottom-16 left-0 right-0 p-4">
                                <p className="text-gray-200 text-xl">
                                    Streamlining retail operations from inventory management to customer analytics.
                                </p>
                            </div>
                        </div>

                        <div className="relative rounded-2xl overflow-hidden flex-shrink-0 w-[700px] h-[400px] group">
                            <img src="/telecomms.png"
                            alt="Telecommunications"
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"/>
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition duration-300"/>
                            <div className="absolute bottom-16 left-0 right-0 p-4">
                                <p className="text-gray-200 text-xl">
                                    Streamlining networking through advanced telecommunications software infrastructure.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Poiiii, this is AI Solution's stats*/}
            <section className="bg-black py-24">
                <div className="max-w-5xl mx-auto px-8">

                    <div className="text-center mb-16">
                        <span className="text-gray-500 text-xl font-medium tracking-widest uppercase mb-4 block">
                            Our Impact
                        </span>
                        <h2 className="text-white text-4xl font-bold mb-4">
                            The Numbers Speak Louder Than Words
                        </h2>
                        <p className="text-gray-400 text-xl">
                            A growing track record of delivering intelligent solutions across industries. 
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center group">
                            <div className="text-white text-6xl font-bold mb-2">
                                <CountUp target={95} suffix="+"/>
                            </div>
                            <p className="text-gray-400 text-xl uppercase tracking-widest">Solutions Delivered</p>
                        </div>
                        <div className="text-center group">
                            <div className="text-white text-6xl font-bold mb-2">
                                <CountUp target={40} suffix="+"/>
                            </div>
                            <p className="text-gray-400 text-xl uppercase tracking-widest">Clients Served</p>
                        </div>
                        <div className="text-center group">
                            <div className="text-white text-6xl font-bold mb-2">
                                <CountUp target={95} suffix="%"/>
                            </div>
                            <p className="text-gray-400 text-xl uppercase tracking-widest">Satisfaction</p>
                        </div>                   
                        <div className="text-center group">
                            <div className="text-white text-6xl font-bold mb-2">
                                <CountUp target={6} suffix="+"/>
                            </div>
                            <p className="text-gray-400 text-xl uppercase tracking-widest">Years</p>
                        </div>
                    </div>
                </div>
            </section>

            {/*Poiii, this is the reviews section*/}
            <section className="bg-black py-24">
                <div className="text-center mb-16 px-8">
                    <span className="text-gray-500 text-xl font-medium tracking uppercase mb-4 block">
                        What Our Clients Say
                    </span>
                    <h2 className="text-white text-4xl font-bold mb-4">
                        Client Reviews
                    </h2>
                    <p className="text-gray-400 text-xl">
                        Hear directly from the businesses we have delivered quality solutions to
                    </p>
                </div>
                <ReviewsCarousel/>
            </section>

            <section className="relative py-32 overflow-hidden">

                {/*Glow effects for the background*/}
                <div className="absolute inset-0"
                style={{
                    background: "radial-gradient(ellipse at center, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 40%, black 70%)"
                }}
                />

                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px"
                style={{
                    background: "linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent)"
                }}
                />

                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px"
                style={{
                    background: "linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent)"
                }}
                />
                <div className="relative z-10 text-center max-w-4xl mx-auto px-8">
                    <span className="text-gray-500 text-lg font-medium tracking-widest uppercase mb-6 block">
                        Get In Touch
                    </span>
                    <h2 className="text-white text-5xl font-bold leading-tight mb-6">
                        Ready to Transform <br />
                        <span className="text-gray-400">Your Business?</span>
                    </h2>
                    <p className="text-gray-400 text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
                        Together we can elevate your business. Reach out us today and
                        let our team develop the perfect solution for your business needs.
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <Link
                        to="/contact-us"
                        className="bg-white text-black px-8 py-4 rounded-full font-medium text-lg hover:bg-gray-200 transition duration-200">                            
                        Get Started
                        </Link>
                        <Link
                        to="/solutions"
                        className="text-white border border-white/40 px-8 py-4 rounded-full font-medium text-lg hover:bg-white/10 transition duration-200">
                            Learn More
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;