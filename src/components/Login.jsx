import React from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const users = [
        { email: 'riddhmodi2003@gmail.com', password: 'riddh1234', role: 'user' },
        { email: 'vaibhav@gmail.com', password: 'vaibhav1234', role: 'user' },
        { email: 'sumit@gmail.com', password: 'sumit1234', role: 'user' }
    ];

    const submitHandler = (data) => {
        const user = users.find(user => user.email === data.email && user.password === data.password);
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/plannerai');
        } else {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="min-h-screen h-auto w-screen flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-[#0c111c7b] border-2 border-[#33ccff] w-full max-w-md p-8 shadow-lg text-[#33ccff] rounded-lg">
                <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
                <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
                    <div>
                        <Label className="block text-[#33ccff] font-semibold mb-2">Email:</Label>
                        <Input
                            type="email"
                            {...register('email', { required: true })}
                            placeholder="Enter your email"
                            className="border-2 border-gray-300 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-purple-900 text-white"
                        />
                    </div>
                    <div>
                        <Label className="block text-[#33ccff] font-semibold mb-2">Password:</Label>
                        <Input
                            type="password"
                            {...register('password', { required: true })}
                            placeholder="Enter your password"
                            className="border-2 border-gray-300 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-purple-900 text-white"
                        />
                    </div>
                    <div className="flex justify-center">
                        <Button type="submit" className="bg-[#33ccff] text-white px-4 py-2 rounded hover:bg-white hover:text-[#33ccff] transition duration-300">
                            Login
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
