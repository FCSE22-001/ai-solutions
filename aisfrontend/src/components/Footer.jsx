import { Link } from 'react-router-dom';

function Footer(){
    return(
        <footer className="bg-black border-t border-white/10">

            {/*Logo and desc*/}
            <div className="max-w-7xl mx-auto px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="flex flex-col gap-4">
                        <Link to="/">
                        <img src="/logo.png"
                        alt="AI Solutions Logo"
                        className="h-16 w-auto object-contain"/>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            AI Solutions delievers cutting-edge software to empower businesses 
                            across industries to operate, smarter, faster and more efficiently.
                        </p>
                        {/*social media links*/}
                        <div className="flex items-center gap-4">
                            <a href="/" className="opacity-70 hover:opacity-100 transition duration-200">
                            <img src="/facebook.png" alt="Facebook" className="w-10 h-10" />
                            </a>
                            <a href="/" className="opacity-70 hover:opacity-100 transition duration-200">
                            <img src="/x.png" alt="X" className="w-10 h-10" />
                            </a>
                            <a href="/" className="opacity-70 hover:opacity-100 transition duration-200">
                            <img src="/instagram.png" alt="Instagram" className="w-10 h-10" />
                            </a>
                        </div>
                    </div>

                    {/*Quick Links*/}
                    <div className="flex flex-col gap-4">
                        <div className="border-b-2 border-blue-500 pb-2 w-fit">
                            <h3 className="text-white text-sm font-bold uppercase tracking-widest">
                                Quick Links
                            </h3>
                        </div>
                        <div className="flex flex-col gap-3 mt-2">
                            <Link to="/" className="text-gray-400 hover:text-white text-sm transition duration-200">
                            Home
                            </Link>
                            <Link to="/reviews" className="text-gray-400 hover:text-white text-sm transition duration-200">
                            Reviews
                            </Link>
                            <Link to="/upcominge" className="text-gray-400 hover:text-white text-sm transition duration-200">
                            Upcoming Events
                            </Link>
                            <Link to="/" className="text-gray-400 hover:text-white text-sm transition duration-200">
                            Contact Us
                            </Link>
                        </div>
                    </div>

                    {/*Articles dummy*/}
                    <div className="flex flex-col gap-4">
                        <div className="border-b-2 border-blue-500 pb-2 w-fit">
                            <h3 className="text-white text-sm font-bold uppercase tracking-widest">
                                Articles
                            </h3>
                        </div>
                        <div className="flex flex-col gap-3 mt-2">
                            <a href="/" className="text-gray-400 hover:text-white text-sm transition duration-200">
                            Say Hello to Our AI-Powered Virtual Assistant 
                            </a>
                            <a href="/" className="text-gray-400 hover:text-white text-sm transition duration-200">
                            The Future of Mining Operations with Intelligent Software
                            </a>
                            <a href="/" className="text-gray-400 hover:text-white text-sm transition duration-200">
                            Building Intelligent Hospitality Management Systems
                            </a><a href="/" className="text-gray-400 hover:text-white text-sm transition duration-200">
                            How AI is Transforming the Finance Industry 
                            </a>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="flex flex-col gap-4">
                        <div className="border-b-2 border-blue-500 pb-2 w-fit">
                            <h3 className="text-white text-sm font-bold uppercase tracking-widest">
                                Get In Touch
                            </h3>
                        </div>
                        <div className="flex flex-col gap-4 mt-2">
                            <div className="flex items-start gap-3">
                            <img src="/building.png" alt="AIS Address" className="w-5 h-5 mt-1 opacity-70"/>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                18 King's Dirve, Sunderland, KNG DR1V3, United Kingdom
                            </p>
                            </div>
                            <div className="flex items-start gap-3">
                            <img src="/telephone.png" alt="AIS Address" className="w-5 h-5 mt-1 opacity-70"/>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Call Us: +44 368-5423
                            </p>
                            </div>
                            <div className="flex items-start gap-3">
                            <img src="/fax.png" alt="AIS Address" className="w-5 h-5 mt-1 opacity-70"/>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Fax: +44 391-1509 / 3344
                            </p>
                            </div>
                            <div className="flex items-start gap-3">
                            <img src="/email.png" alt="AIS Address" className="w-5 h-5 mt-1 opacity-70"/>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                aissupport@ais.uk
                            </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 

            <div className="border-t border-white/10 py-6 px-8">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <p className="text-gray-500 text-sm">
                    © 2025 AI Solutions. All rights reserved.
                </p>
                <p className="text-gray-500 text-sm">
                   Design & Developed by AI Solutions
                </p>
            </div>
            </div>
        </footer>
    )
}

export default Footer;