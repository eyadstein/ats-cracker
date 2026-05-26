'use client';
import { Dialog } from "@headlessui/react";
import { EmailIcon, PasswordIcon, UserIcon } from "@/components/svgs/svgs";
import InputField from "@/components/auth/modals-input";
import {useState} from "react";
import useAppContext from "@/hooks/useAppContext";
import * as ServerActions from "@/actions/register";
import {showErrorAlert} from "@/lib/alerts";

export default function RegisterModal({ onChangeModal,closeModal }) {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirm_password: "",
        username: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useAppContext();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        // Check if all fields are filled
        for (const key in formData) {
            if (formData[key] === "") {
                showErrorAlert("All fields are required.");
                return false;
            }
        }

        // Check if password and confirm password match
        if (formData.password !== formData.confirm_password) {
            showErrorAlert("Passwords do not match.");
            return false;
        }

        // Password length check
        if (formData.password.length < 8) {
            showErrorAlert("Password must be at least 8 characters long.");
            return false;
        }

        // Email simple Validation
        if(!formData.email.includes("@") || !formData.email.includes(".")){
            showErrorAlert("Invalid email address.");
            return false;
        }


        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate the form
        if (!validateForm())
            return;

        setIsSubmitting(true);

        const message = await ServerActions.register(formData);
        if (message.success) {
            login({
                email: formData.email,
                username: message.username,
            })
            closeModal()
        } else {
            showErrorAlert(message.message);
        }
        setIsSubmitting(false);


    };

    return (
        <div className="fixed inset-0 flex items-start justify-center p-4" style={{top: "15%"}}>
            <Dialog.Panel
                className="w-full max-w-md h-[600px] transform overflow-hidden
                rounded-2xl bg-white p-6 text-left align-middle shadow-xl
                transition-all pt-6 sm:p-12 sm:pt-8 md:min-h-min
                md:min-w-[500px] md:p-14 md:pt-10 lg:p-16 lg:pt-16"
            >
                <Dialog.Title
                    as="h1"
                    className="text-primaryBlack mt-6 flex text-[28px] font-bold sm:mt-10
                     sm:text-[32px] md:mt-4 md:justify-center md:text-[38px]"
                >
                    Create Account
                </Dialog.Title>
                <form onSubmit={handleSubmit} className="mt-10 lg:mt-12">
                    {/* Username Field */}
                    <InputField
                        id="usernameId"
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        label="Username"
                        Icon={UserIcon}
                        disabled={isSubmitting}
                    />


                    {/* Email Field */}
                    <div className="relative mt-10 lg:mt-12">
                        <InputField
                            id="emailId"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            label="Email"
                            Icon={EmailIcon}
                            disabled={isSubmitting}
                        />
                    </div>

                    {/*Password Input*/}
                    <div className="relative mt-10 lg:mt-12">
                        <InputField
                            id="passwordId"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            label="Password"
                            Icon={PasswordIcon}
                            disabled={isSubmitting}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={isSubmitting}
                            className="absolute right-0 top-[58%] -translate-y-1/2 cursor-pointer text-base font-bold hover:opacity-80"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>


                    {/*Confirm Password Input*/}
                    <div className="relative mt-10 lg:mt-12">
                        <InputField
                            id="confirmPasswordId"
                            type={showPassword ? "text" : "password"}
                            name="confirm_password"
                            value={formData.confirm_password}
                            onChange={handleChange}
                            label="Confirm Password"
                            Icon={PasswordIcon}
                            disabled={isSubmitting}
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="mt-8 flex justify-center sm:mt-11 md:mt-14 lg:mt-16">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`border-none cursor-pointer appearance-none touch-manipulation flex items-center justify-center focus-visible:outline-blue-600 px-7 py-2 rounded-full font-extrabold h-[60px] text-[17px] min-w-[180px] text-white bg-gradientPinkRed shadow-product w-[300px] ${
                                isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"
                            }`}
                        >
                            {isSubmitting ? "Creating Account ..." : "Create Account"}
                        </button>
                    </div>
                </form>

                {/* Link to Switch to Login */}
                <div className="mt-8 flex justify-center">
                    <button
                        onClick={onChangeModal}
                        disabled={isSubmitting}
                        type="button"
                        className="border-none cursor-pointer appearance-none touch-manipulation flex items-center justify-center focus-visible:outline-blue-600 rounded-xl text-base font-bold hover:opacity-80"
                    >
                        Have already an account? Login
                    </button>
                </div>
            </Dialog.Panel>
        </div>
    );
}
