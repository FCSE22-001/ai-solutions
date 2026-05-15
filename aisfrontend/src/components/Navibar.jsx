import {Link} from 'react-router-dom';

function Navibar(){

    return(
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg">
            <div className="max-w-7xl mx-auto px-6 h-25 flex items-center justify-between">

                {/*Company Logo*/}
                <Link to="/"> 
                <img src="/logo.png"
                alt="AI Solutions Logo"
                className="h-50 w-auto"
                />
                </Link>

                {/*Nav Links*/}
                <div className="hidden md:flex items-center gap-8">
                    <Link to="/" className="text-white/80 hover:text-white transition duration-200 text-base font-medium">
                    Home
                    </Link>
                    <Link to="/solutions" className="text-white/80 hover:text-white transition duration-200 text-base font-medium">
                    Solutions
                    </Link>
                    <Link to="/reviews" className="text-white/80 hover:text-white transition duration-200 text-base font-medium">
                    Reviews
                    </Link>
                    <Link to="/promotionale" className="text-white/80 hover:text-white transition duration-200 text-base font-medium">
                    Promotional Events
                    </Link>
                    <Link to="/upcominge" className="text-white/80 hover:text-white transition duration-200 text-base font-medium">
                    Upcoming Events
                    </Link>
                </div>

                {/*Contact Us*/}
                <div className="hidden md:flex items-center gap-3">
                    <Link
                    to="/contact-us"
                    className="text-white/80 hover:text-white border border-white/30 px-4 py-2 rounded-full text-base transition duration-200"
                    >
                        Contact Us
                    </Link>
                {/*Admin only shows when logged in*/}
                {localStorage.getItem('token') && (
                    <Link
                    to="/admin"
                    className="bg-white text-black px-4 py-2 rounded-full text-base font-medium hover:bg-gray-200 transition duration-200"
                    >
                        Admin
                    </Link>
                )}
                </div>
            </div>
        </nav>
    )
}

export default Navibar;