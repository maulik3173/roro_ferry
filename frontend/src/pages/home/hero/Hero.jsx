import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaRobot, FaPaperPlane } from 'react-icons/fa'
import img from '../../../assets/hero1.mp4'

const variants = {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0 }
}

const Hero = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [message, setMessage] = useState("");

    return (
        <motion.div 
            className='w-full flex-1 h-screen relative overflow-hidden'
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
            transition={{ duration: 0.85, ease: "easeInOut" }}
        >
            {/* Background Video */}
            <video 
                className="absolute top-0 left-0 w-full h-full object-cover"
                autoPlay 
                loop 
                muted 
                playsInline
            >
                <source src={img} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Overlay & Content */}
            <div className="absolute top-0 left-0 w-full h-full py-[9ch] bg-gradient-to-b from-neutral-50/70 via-neutral-50/15 to-neutral-50/5 flex items-center justify-start text-center flex-col gap-9">
                <div className='space-y-2'>
                    <motion.p
                        initial={{ opacity: 0, y: -900 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -800 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className='text-xl text-gray-600 mb-8 mt-14 font-light italic'
                    >
                         Get your RORO ticket now 
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: -900 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -800 }}
                        transition={{ duration: 1.85, ease: "easeOut" }}
                        className='text-6xl text-gray-900 font-extrabold tracking-wide uppercase'
                    >
                        SKIP THE TRAFFIC, RIDE THE WAVES!
                    </motion.h1>

                    <Link to="ticket">
                        <motion.button
                            initial={{ opacity: 0, y: -900 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -800 }}
                            transition={{ duration: 1.85, ease: "easeOut" }}
                            className='flex justify-center gap-2 mt-10 items-center mx-auto shadow-xl text-lg bg-gray-300 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-blue-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group '
                        >
                            Book Now
                            <svg className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45" viewBox="0 0 16 19" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z" className="fill-gray-800 group-hover:fill-gray-800"></path>
                            </svg>
                        </motion.button>
                    </Link>
                </div>
            </div>

            {/* Chatbot Icon */}
            <motion.button 
                className='fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-all duration-300'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsChatOpen(!isChatOpen)}
            >
                <FaRobot size={28} />
            </motion.button>

            {/* Chatbox */}
            {isChatOpen && (
                <motion.div 
                    className='fixed bottom-16 right-6 w-80 h-[500px] bg-white shadow-lg rounded-lg flex flex-col'
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Chat Header */}
                    <div className='flex justify-between items-center bg-blue-600 text-white p-3 rounded-t-lg'>
                        <h3 className='text-lg font-semibold'>Rorobot</h3>
                        <button className='text-white' onClick={() => setIsChatOpen(false)}>✖</button>
                    </div>

                    {/* Chat Messages */}
                    <div className='flex-1 overflow-auto p-3 bg-gray-100'>
                        <p className='text-gray-600'>Hello! How can I assist you?</p>
                    </div>

                    {/* Chat Input */}
                    <div className='flex items-center border-t p-2'>
                        <input 
                            type='text' 
                            className='flex-1 p-2 border rounded-l-md' 
                            placeholder='Type a message...' 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button className='p-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition' onClick={() => alert(`Message sent: ${message}`)}>
                            <FaPaperPlane />
                        </button>
                    </div>
                </motion.div>
            )}
        </motion.div>
    )
}

export default Hero
