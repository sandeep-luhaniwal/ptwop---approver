'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Icons from '../common/Icons';
import InputWithLabel from '../custom-ui/InputWithLabel';
import CtaButton from '../custom-ui/CtaButton';
import Link from 'next/link';

const LogIn = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: 'admin@gmail.com',
    password: '123456',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      if (
        formData.email === 'admin@gmail.com' &&
        formData.password === '123456'
      ) {
        setSuccess(true); // set success message
        setTimeout(() => {
          router.push('/dashboard'); // ✅ Redirect after 3 sec
        }, 3000);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[19920px] bg-white mx-auto px-4 lg:px-2.5 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-[60%_40%] py-2.5 min-h-screen ">
        {/* Right Panel */}
        <div className="hidden md:flex justify-center items-center rounded-xl lg:rounded-[20px] w-full h-full bg-[url('/assets/images/svg/hero_bg.svg')] bg-center bg-no-repeat bg-cover">
          <div className="max-w-[640px] mx-auto p-4">
            <h2 className="text-2xl md:text-[26px] font-normal leading-100 lg:text-custom-36 text-white">
              Welcome back, Approver 👋
            </h2>
            <h1 className="text-white font-bold py-4 md:py-6 text-3xl md:text-4xl lg:text-custom-59">
              Login to Your Approver Dashboard
            </h1>
            <p className="text-base lg:text-lg leading-[120%] font-normal text-white">
            Access pending deposit requests, upload bank and UPI details, and approve transactions securely — all in one streamlined dashboard.
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center max-w-[416px] md:p-4 md:pl-0 mx-auto w-full bg-white mb-14 md:mb-0">
          <Image
            src="/assets/images/webp/page_logo.webp"
            className="w-[130px] md:w-[150px] lg:w-[187px] h-auto"
            height={77}
            width={187}
            alt="page-logo"
          />

          {/* Mobile Welcome Text */}
          <div className="max-w-[640px] mx-auto md:hidden">
            <p className="text-lg pt-4 font-normal leading-100 text-black">
              Welcome back, Approver 👋
            </p>
            <h2 className="text-black font-bold py-3 md:py-6 text-2xl">
              Login to Your Approver Dashboard
            </h2>
            <p className="text-xs lg:text-lg leading-[120%] font-normal text-black">
            Access pending deposit requests, upload bank and UPI details, and approve transactions securely — all in one streamlined dashboard.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-4 md:pt-6 lg:pt-10">
            <div className="flex gap-2 hover:border-purple duration-300 py-2.5 md:py-3 px-4 lg:py-4 md:px-6 border border-white-off rounded-[10px]">
              <label htmlFor="email">
                <Icons icon="email" />
              </label>
              <InputWithLabel
                id="email"
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="flex gap-2 hover:border-purple duration-300 py-2.5 md:py-3 px-4 lg:py-4 md:px-6 border border-white-off rounded-[10px]">
              <label htmlFor="password">
                <Icons icon="lock" />
              </label>
              <InputWithLabel
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {error && <p className="text-red-500 text-sm -mt-2">{error}</p>}
            {success && <p className="text-green-600 text-sm -mt-2">Login successful! Redirecting...</p>}

            <CtaButton disabled={loading || success}>
              {loading ? 'Logging in...' : success ? 'Redirecting...' : 'Login'}
            </CtaButton>

            <Link href={"/"} className='text-sm md:text-base text-[#333333]/60 hover:text-[#333333] duration-300'>Forgot Password</Link>
          </form>
        </div>


      </div>
    </div>
  );
};

export default LogIn;
