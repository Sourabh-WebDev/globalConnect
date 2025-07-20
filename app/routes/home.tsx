// components/LandingPage.tsx
'use client'

import React, { useEffect, useState } from 'react';
import { Card, Button, Skeleton, Drawer } from 'antd';
import { motion } from 'framer-motion';
import axios from 'axios';
import { CgShoppingCart } from 'react-icons/cg';
import { MdClose, MdMenu } from 'react-icons/md';
import { FaGlobe } from "react-icons/fa";
import { useNavigate } from 'react-router';


const { Meta } = Card;

const generateDummyProducts = (page: number, count = 8) => {
    return Array.from({ length: count }, (_, i) => {
        const id = page * count + i + 1;
        return {
            id,
            name: `Product ${id}`,
            price: (Math.random() * 100 + 10).toFixed(2),
            image: `https://picsum.photos/300/200?random=${id}`,
        };
    });
};

const Home = () => {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();
    const navItems = ['Home', 'Shop', 'Categories', 'Contact'];
    const fetchItems = () => {
        setLoading(true);
        const newItems = generateDummyProducts(page);
        setTimeout(() => {
            setItems(prev => [...prev, ...newItems]);
            setLoading(false);
        }, 1000); // Simulate network delay
    };

    //   const fetchItems = async () => {
    //     setLoading(true);
    //     const newItems = await axios.get(`/api/products?page=${page}`);
    //     setItems(prev => [...prev, ...newItems.data]);
    //     setLoading(false);
    //   };

    useEffect(() => {
        fetchItems();
    }, [page]);

    // Infinite scroll handler
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
                !loading
            ) {
                setPage(prev => prev + 1);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading]);

    return (
        <div className="bg-gradient-to-b from-white to-gray-100 min-h-screen px-6 py-10">
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center text-2xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                        GL<FaGlobe color='#553af6' />BALCONNECT
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
                        {navItems.map(item => (
                            <a key={item} href="#" className="hover:text-indigo-600 transition">
                                {item}
                            </a>
                        ))}
                    </nav>

                    {/* Desktop Right Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button onClick={() => navigate('/login')} className="text-gray-700 hover:text-indigo-600">
                            Login
                        </button>
                        <button onClick={() => navigate('/register')} className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold px-4 py-1 rounded-md shadow hover:opacity-90 border-none' >Register</button>
                        <Button type="default" shape="circle" icon={<CgShoppingCart />} />
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <Button
                            type="text"
                            icon={<MdMenu className="text-2xl" />}
                            onClick={() => setMobileOpen(true)}
                        />
                    </div>
                </div>
            </header>

            {/* Mobile Drawer */}
            <Drawer
                title={
                    <div className="flex items-center justify-between w-full">
                        <span className="text-xl font-bold">Menu</span>
                        <Button
                            icon={<MdClose />}
                            type="text"
                            onClick={() => setMobileOpen(false)}
                        />
                    </div>
                }
                placement="right"
                onClose={() => setMobileOpen(false)}
                open={mobileOpen}
            >
                <div className="flex flex-col space-y-4 text-gray-700 font-medium">
                    {navItems.map(item => (
                        <a key={item} href="#" onClick={() => setMobileOpen(false)} className="hover:text-indigo-600 transition">
                            {item}
                        </a>
                    ))}
                    <hr className="my-2" />
                    <button onClick={() => navigate('/login')} className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold px-4 py-1 rounded-md shadow hover:opacity-90 border-none">
                        Login
                    </button>
                    <button onClick={() => navigate('/register')} className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold px-4 py-1 rounded-md shadow hover:opacity-90 border-none' >
                        Register
                    </button>
                </div>
            </Drawer>

            <motion.h1
                className="text-center text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-12"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                Discover Unique Products
            </motion.h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {items.map((item, index) => (
                    <motion.div
                        key={item.id}
                        className="relative group"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <div className="bg-white/30 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/50 transition-transform transform hover:scale-105">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-56 object-cover transition-all duration-300 group-hover:scale-110"
                            />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                                <p className="text-gray-500">${item.price}</p>
                            </div>
                            <motion.div
                                className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                            >
                                <Button
                                    type="primary"
                                    icon={<CgShoppingCart />}
                                    className="shadow-lg"
                                >
                                    Add
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                ))}
                {loading &&
                    Array.from({ length: 4 }).map((_, idx) => (
                        <Skeleton active key={`skeleton-${idx}`} />
                    ))}
            </div>
        </div>
    );
};

export default Home;
