import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Contact = () => {
    const form = useRef();

    // Track form field values
    const [formData, setFormData] = useState({
        user_name: '',
        user_email: '',
        message: ''
    });

    // Track the form validity (whether the button should be enabled or not)
    const [isFormValid, setIsFormValid] = useState(false);

    // Handle input change and update formData
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Check if form is valid
    useEffect(() => {
        const { user_name, user_email, message } = formData;
        // Button is enabled only if all fields are filled
        setIsFormValid(user_name.trim() !== '' && user_email.trim() !== '' && message.trim() !== '');
    }, [formData]);

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_8n2845j', 'template_frdirgs', form.current, {
                publicKey: '8CQbXFBHbJAtTJBkL',
            })
            .then(
                () => {
                    toast.success("Email Sent Successfully.");
                    // Reset form fields after successful submission
                    setFormData({
                        user_name: '',
                        user_email: '',
                        message: ''
                    });
                    // Optionally, reset the form UI (in case you want to clear inputs visually)
                    form.current.reset();
                },
                (error) => {
                    toast.error("Email Not Sent.");
                }
            );
    };

    return (
        <div>
            <section className="text-gray-600 body-font relative">
                <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
                    <div className="lg:w-2/3 md:w-1/2 hidden rounded-lg overflow-hidden sm:mr-10 p-10 lg:flex items-end justify-start relative">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.205944686617!2d91.8698546!3d24.890955899999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3751aad569ff3aeb%3A0x9703d5a40af8a812!2sLotifia%20tupi%20%26%20attar%20centre!5e0!3m2!1sen!2sbd!4v1731173766429!5m2!1sen!2sbd"
                            width="1200"
                            height="600"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                        <div className="bg-white absolute flex flex-wrap py-2 lg:py-6 rounded shadow-md ml-20">
                            <div className="lg:w-1/2 px-6">
                                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">ADDRESS</h2>
                                <p className="mt-1">Photo booth tattooed prism, portland taiyaki hoodie neutra typewriter</p>
                            </div>
                            <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">EMAIL</h2>
                                <a href="mailto:example@email.com" className="text-indigo-500 leading-relaxed">example@email.com</a>
                                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">PHONE</h2>
                                <Link to={'https://wa.me/+8801325798939'}><p className="leading-relaxed text-primary hover:underline">01325798939</p></Link>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
                        <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Feedback</h2>
                        <form ref={form} onSubmit={sendEmail}>
                            <div className="relative mb-4">
                                <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                                <input
                                    type="text"
                                    name="user_name"
                                    value={formData.user_name}
                                    onChange={handleInputChange}
                                    placeholder="Name"
                                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                            <div className="relative mb-4">
                                <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                                <input
                                    type="email"
                                    name="user_email"
                                    value={formData.user_email}
                                    onChange={handleInputChange}
                                    placeholder="example@email.com"
                                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                            <div className="relative mb-4">
                                <label htmlFor="message" className="leading-7 text-sm text-gray-600">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="Say something ..."
                                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                                ></textarea>
                            </div>
                            <div className="">
                                <button
                                    type="submit"
                                    className={`text-white bg-primary border-0 py-2 px-6 focus:outline-none rounded text-lg mt-2 text-center ${isFormValid ? '' : 'opacity-50 cursor-not-allowed'}`}
                                    disabled={!isFormValid}
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                        <p className="text-xs text-gray-500 mt-3">Chicharrones blog helvetica normcore iceland tousled brook viral artisan.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
