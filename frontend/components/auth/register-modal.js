'use client';
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import * as ServerActions from "@/actions/register";
import { showErrorAlert } from "@/lib/alerts";
import useAppContext from "@/hooks/useAppContext";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const MICROSOFT_CLIENT_ID = process.env.NEXT_PUBLIC_MICROSOFT_CLIENT_ID;

// Generate random state for CSRF protection
function generateState() {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

export default function RegisterModal({ onChangeModal, closeModal }) {
    const [formData, setFormData] = useState({ email: "", password: "", confirm_password: "", username: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useAppContext();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        for (const key in formData) {
            if (formData[key] === "") { showErrorAlert("All fields are required."); return false; }
        }
        if (formData.password !== formData.confirm_password) { showErrorAlert("Passwords do not match."); return false; }
        if (formData.password.length < 8) { showErrorAlert("Password must be at least 8 characters."); return false; }
        if (!formData.email.includes("@") || !formData.email.includes(".")) { showErrorAlert("Invalid email address."); return false; }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsSubmitting(true);
        const message = await ServerActions.register(formData);
        if (message.success) {
            login({ email: formData.email, username: message.username });
            closeModal();
        } else {
            showErrorAlert(message.message);
        }
        setIsSubmitting(false);
    };

    const googleLogin = () => {
        if (!GOOGLE_CLIENT_ID) {
            showErrorAlert("Google OAuth not configured.");
            return;
        }
        const state = generateState();
        sessionStorage.setItem('oauth_state', state);
        const redirectUri = `${BACKEND_URL}/auth/google/callback/`;
        const scope = "openid email profile";
        const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}&access_type=offline&state=${state}`;
        window.location.href = url;
    };

    const microsoftLogin = () => {
        if (!MICROSOFT_CLIENT_ID) {
            showErrorAlert("Microsoft OAuth not configured.");
            return;
        }
        const state = generateState();
        sessionStorage.setItem('oauth_state', state);
        const redirectUri = `${BACKEND_URL}/auth/microsoft/callback/`;
        const scope = "openid email profile User.Read";
        const url = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${MICROSOFT_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}&state=${state}`;
        window.location.href = url;
    };

    const githubLogin = () => {
        if (!GITHUB_CLIENT_ID) {
            showErrorAlert("GitHub OAuth not configured.");
            return;
        }
        const state = generateState();
        sessionStorage.setItem('oauth_state', state);
        const url = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user:email&state=${state}`;
        window.location.href = url;
    };

    const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-pink-500/50 transition-all text-sm";
    const labelClass = "text-gray-400 text-xs font-semibold tracking-widest uppercase mb-1.5 block";

    return (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <Dialog.Panel className="w-full max-w-[460px] rounded-3xl overflow-hidden shadow-2xl" style={{background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)"}}>
                <div className="relative px-10 pt-10 pb-5">
                    <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10" style={{background: "radial-gradient(circle, #e84393, transparent)", transform: "translate(30%, -30%)"}}/>
                    <button onClick={closeModal} className="absolute top-5 right-5 text-gray-500 hover:text-white transition-colors text-xl font-light">✕</button>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background: "linear-gradient(135deg, #e84393, #f97316)"}}>
                            <span className="text-white text-sm font-black">A</span>
                        </div>
                        <span className="text-gray-400 text-sm font-medium tracking-widest uppercase">ATS Cracker</span>
                    </div>
                    <Dialog.Title as="h1" className="text-white text-4xl font-black tracking-tight">Create your<br/>account.</Dialog.Title>
                    <p className="text-gray-500 text-sm mt-1">Start cracking the ATS today</p>
                </div>
                <div className="px-10 pb-4">
                    <div className="grid grid-cols-3 gap-3 mb-5">
                        <button onClick={googleLogin} className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all group">
                            <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                            <span className="text-gray-400 text-xs font-semibold group-hover:text-white transition-colors">Google</span>
                        </button>
                        <button onClick={githubLogin} className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all group">
                            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                            <span className="text-gray-400 text-xs font-semibold group-hover:text-white transition-colors">GitHub</span>
                        </button>
                        <button onClick={microsoftLogin} className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all group">
                            <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#f25022" d="M1 1h10v10H1z"/><path fill="#00a4ef" d="M13 1h10v10H13z"/><path fill="#7fba00" d="M1 13h10v10H1z"/><path fill="#ffb900" d="M13 13h10v10H13z"/></svg>
                            <span className="text-gray-400 text-xs font-semibold group-hover:text-white transition-colors">Microsoft</span>
                        </button>
                    </div>
                    <div className="flex items-center gap-4 mb-5">
                        <div className="flex-1 h-px bg-white/10"/>
                        <span className="text-gray-600 text-xs uppercase tracking-widest">or with email</span>
                        <div className="flex-1 h-px bg-white/10"/>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div><label className={labelClass}>Username</label><input type="text" name="username" value={formData.username} onChange={handleChange} disabled={isSubmitting} placeholder="yourname" className={inputClass}/></div>
                        <div><label className={labelClass}>Email</label><input type="email" name="email" value={formData.email} onChange={handleChange} disabled={isSubmitting} placeholder="you@example.com" className={inputClass}/></div>
                        <div><label className={labelClass}>Password</label><div className="relative"><input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} disabled={isSubmitting} placeholder="••••••••" className={inputClass + " pr-16"}/><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 text-xs font-semibold tracking-wider uppercase transition-colors">{showPassword ? "Hide" : "Show"}</button></div></div>
                        <div><label className={labelClass}>Confirm Password</label><input type={showPassword ? "text" : "password"} name="confirm_password" value={formData.confirm_password} onChange={handleChange} disabled={isSubmitting} placeholder="••••••••" className={inputClass}/></div>
                        <button type="submit" disabled={isSubmitting} className="w-full py-4 rounded-xl font-black text-white text-sm tracking-wide transition-all mt-1" style={{background: isSubmitting ? "#333" : "linear-gradient(135deg, #e84393, #f97316)", opacity: isSubmitting ? 0.7 : 1}}>{isSubmitting ? "Creating account..." : "Create Account →"}</button>
                    </form>
                    <p className="text-center text-gray-600 text-sm mt-5 pb-2">Already have an account? <button onClick={onChangeModal} className="text-pink-400 font-semibold hover:text-pink-300 transition-colors">Sign in</button></p>
                </div>
            </Dialog.Panel>
        </div>
    );
}
