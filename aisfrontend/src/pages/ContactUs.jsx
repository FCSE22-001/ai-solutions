import { useState } from 'react';
import axios from 'axios';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import ReactFlagsSelect from 'react-flags-select';
import { useLocation } from 'react-router-dom';


function ContactUs(){
    const location = useLocation();
    const sourceOfInspiration = location.state?.source || '';
    const sourceLogo = location.state?.logo || '';

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company_name: '',
        country: '',
        job_title: '',
        job_details: '',
        source: sourceOfInspiration
    });

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');

    const handleChange = (e) =>{
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await axios.post('http://localhost:5000/api/inquiries', formData);
            setSubmitted(true);
            setError('');
        } catch (err){
            setError('Something Went Wrong. Please Try Again.')
        }
    };

        return(
            <div className="bg-black min-h-screen">
                <section className="relative w-full h-[60vh]">

                    <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/contactus.png')"}}
                    />
                    <div className="absolute inset-0"
                    style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.9) 100%)" }}
                    />
                    <div className="absolute inset-0"
                    style={{ background:"linear-gradient(to bottom, transparent 50%, black 100%)" }}
                    />

                    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-8 pt-16">
                        <span className="text-gray-400 text-sm font-medium tracking-widest uppercase mb-4 block">
                            Get In Touch
                        </span>
                        <h1 className="text-white text-6xl font-bold leading-tight mb-6">
                            Ready To Elevate Your Business? <br />
                            <span className="text-gray-400">Together We Can</span>
                        </h1>
                        <p className="text-gray-300 text-xl leading-relaxed max-w-2xl">
                            Have a grand idea to take your business to the next level? We'd love to hear about it. Fill in the form 
                            below and our team will get back to you as soon as possible.
                        </p>
                    </div>

                </section>

                {/*FOrm section*/}
                <section className="relative py-24 px-8">
                    <div className="absolute inset-0"
                    style={{ background: "radial-gradient(ellipse at center, rgba(255,255,255,0.05) 0%, transparent 70%)"

                    }} />
                    <div className="relative z-10 max-w-3xl mx-auto">
                        {submitted ? (
                            <div className="text-center py-24">
                                <h2 className="text-white text-4xl font-bold mb-4">
                                    Thank You! 🥳🥳🥳
                                </h2>
                                <p className="text-gray-400 text-xl">
                                    Your Inquiry Has Been Submitted Successfully. Our Team Will Get Back To You Shortly.
                                </p>
                            </div>
                        ) : (
                            <div className="rounded-2xl p-10"
                            style={{
                                background: "rgba(255, 255, 255, 0.05)",
                                backdropFilter: "blur(10px)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                boxShadow: "0 0 40px rgba(255, 255, 255, 0.05),  0 0 80px rgba(255, 255, 255, 0.02)"
                            }}>
                                <h2 className="text-white text-3xl font-bold mb-2 text-center">
                                    Contact Us
                                </h2>
                                {sourceOfInspiration && (
                                    <div className="flex items-center gap-4 mb-8 p-4 rounded-xl"
                                        style={{
                                            background: "rgba(255,255,255,0.05)",
                                            border: "1px solid rgba(255,255,255,0.1)"
                                }}>
                                <img
                                    src={sourceLogo}
                                    alt={sourceOfInspiration}
                                    className="h-12 w-auto opacity-80"
                                />
                                    <div>
                                        <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">
                                            Source of Inspiration
                                        </p>
                                        <p className="text-white font-bold text-lg">
                                            {sourceOfInspiration}
                                        </p>
                                    </div>
                                    </div>
)}
                                <img
                                    src={sourceLogo}
                                    alt={sourceOfInspiration}
                                    className="h-12 w-auto opacity-80"
                                />
                                <p className="text-gray-400 text-center mb-10">
                                    Fill In Your Details And We'll Get Back To You Shortly.
                                </p>

                                <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-gray-400 text-sm uppercase tracking-widest">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                placeholder="Firstname LastName"
                                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition duration-200"
                                                />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-gray-400 text-sm uppercase tracking-widest">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                placeholder="youremail@email.com"
                                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition duration-200"
                                                />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-2">
                                        <label className="text-gray-400 text-sm uppercase tracking-widest">
                                            Phone Number *
                                        </label>
                                        <PhoneInput
                                            placeholder="Enter Phone Number"
                                            defaultCountry="GB"
                                            value={formData.phone}
                                            onChange={(phone) => setFormData({ ...formData, phone: phone || '' })}
                                            className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white"
                                            style={{
                                                '--PhoneInputCountryFlag-height': '1em',
                                                '--PhoneInputCountrySelectArrow-color': 'white',
                                                '--PhoneInput-color--focus': 'white',
                                            }}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-gray-400 text-sm uppercase tracking-widest">
                                               Company Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="company_name"
                                                value={formData.company_name}
                                                onChange={handleChange}
                                                required
                                                placeholder="Your Company Name"
                                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition duration-200"
                                                />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-gray-400 text-sm uppercase tracking-widest">
                                                Country *
                                            </label>
                                            <ReactFlagsSelect
                                                selected={selectedCountry}
                                                onSelect={(code) => {
                                                    setSelectedCountry(code);
                                                    setFormData({ ...formData, country: code });
                                                }}
                                                searchable
                                                searchPlaceholder="Search Countries"
                                                className="bg-white/5 border border-white/10 rounded-lg text-white"
                                                selectButtonClassName="bg-transparent text-white"
                                                />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-gray-400 text-sm uppercase tracking-widest">
                                               Job Title *
                                            </label>
                                            <input
                                                type="text"
                                                name="job_title"
                                                value={formData.job_title}
                                                onChange={handleChange}
                                                required
                                                placeholder="CEO/ Manager/ Developer"
                                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition duration-200"
                                                />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-gray-400 text-sm uppercase tracking-widest">
                                            Job Details *    
                                        </label> 
                                        <textarea 
                                        name="job_details"
                                        value={formData.job_details}
                                        onChange={handleChange}
                                        required
                                        placeholder="Tell Us About Your Business Needs..."
                                        rows={5}
                                        className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition duration-200 resize-none"
                                        />  
                                    </div>

                                    {error && (
                                        <p className="text-red-400 text-sm text-center">{error}</p>
                                    )}

                                    <button
                                    type="submit"
                                    className="bg-white text-black py-4 rounded-full font-medium text-lg hover:bg-gray-200 transition duration-200 mt-2">
                                        Submit Form
                                    </button>

                                </form>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        );
}

export default ContactUs;