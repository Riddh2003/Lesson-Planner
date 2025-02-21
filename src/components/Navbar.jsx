import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "../components/Loader.jsx"

export const Navbar = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        setLoading(true);
        setTimeout(() => {
            navigate(path);
            setLoading(false);
        }, 500);
    };

    return (
        <div className="h-fit max-w-[100vw] top-2 px-4 py-2 z-50 position-sticky"
            style={{
                fontFamily: "Mystery Quest, serif",
            }}
        >
            {loading && <Loader />}
            <div className="navbar w-full p-2 rounded-xl bg-[#0c111c86] shadow text-[#33ccff] border-2 border-[#33ccff] backdrop-blur-md">
                <div className="w-full flex justify-between items-center px-4 py-1">
                    <Link className="text-5xl font-bold transition-all"
                    >
                        Lesson Planner
                    </Link>
                    <div>
                        <Link className="bg-[#33ccff] text-white hover:text-[#33ccff] shadow-lg px-4 py-2 hover:bg-white rounded text-xl transition-all duration-300 transform" onClick={() => handleNavigation('/')}
                        >
                            <button>
                                Login
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    );
};