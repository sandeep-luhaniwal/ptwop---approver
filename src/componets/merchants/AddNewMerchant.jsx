"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // ✅ Import router
import InputWithLabelSub from '../custom-ui/InputWithLabelSub';
import Icons from '../common/Icons';

const AddNewMerchant = () => {
    const router = useRouter(); // ✅ Initialize router

    const [formData, setFormData] = useState({
        merchantName: '',
        email: '',
        platformName: '',
        dailyLimit: '',
        password: '',
    });

    const [showSuccess, setShowSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const isFormValid = Object.values(formData).every((value) => value.trim() !== "");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid || loading) return;

        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            console.log("Form submitted:", formData);

            setShowSuccess(true);
            setFormData({
                merchantName: '',
                email: '',
                platformName: '',
                dailyLimit: '',
                password: '',
            });

            setLoading(false);

            // Redirect after 3 sec
            setTimeout(() => {
                setShowSuccess(false);
                router.push("/dashboard/merchants"); // ✅ Navigate
            }, 3000);
        }, 2000); // simulate 2 second server delay
    };

    return (
        <div className="max-w-[1100px] 2xl:mx-auto min-[1441px]:max-w-[1200px] lg:px-[22px] bg-white w-full relative">
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                    <InputWithLabelSub
                        name="merchantName"
                        type="text"
                        placeholder="Enter merchant name"
                        value={formData.merchantName}
                        onChange={handleChange}
                    >
                        Merchant Name
                    </InputWithLabelSub>

                    <InputWithLabelSub
                        name="email"
                        type="email"
                        placeholder="Enter email address"
                        value={formData.email}
                        onChange={handleChange}
                    >
                        Email
                    </InputWithLabelSub>

                    <InputWithLabelSub
                        name="platformName"
                        type="text"
                        placeholder="Enter platform name"
                        value={formData.platformName}
                        onChange={handleChange}
                    >
                        Platform Name
                    </InputWithLabelSub>

                    <InputWithLabelSub
                        name="dailyLimit"
                        type="number"
                        placeholder="Enter daily limit"
                        value={formData.dailyLimit}
                        onChange={handleChange}
                    >
                        Set Daily Limit
                    </InputWithLabelSub>

                    <InputWithLabelSub
                        name="password"
                        type="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                    >
                        Password
                    </InputWithLabelSub>
                </div>

                {showSuccess && (
                    <div className="text-green-600 text-xl mt-4 text-center font-medium">
                        ✔️ Data saved successfully!
                    </div>
                )}

                <div className="flex justify-center md:justify-end mt-6">
                    <button
                        type="submit"
                        disabled={!isFormValid || loading}
                        className={`text-base font-medium px-5 py-3 rounded-[10px] text-white flex items-center justify-center gap-2 transition-all duration-300 ${isFormValid && !loading
                            ? 'bg-purple hover:bg-purple/90 cursor-pointer'
                            : 'bg-purple/65 cursor-not-allowed'
                            }`}
                    >
                        {loading && (
                            <Icons icon={'saving'} />
                        )}
                        {loading ? "Saving..." : "Save"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddNewMerchant;
