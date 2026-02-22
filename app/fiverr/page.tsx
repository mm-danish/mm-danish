'use client';

import React from 'react';
import {
    Database,
    Layers,
    ShieldCheck,
    Zap,
    Globe,
    CreditCard,
    LayoutDashboard,
    TrendingUp,
    Server,
    Code2,
    Heart
} from 'lucide-react';

export default function FiverrPreviewPage() {
    return (
        <div className="bg-[#050505] min-h-screen p-10 flex flex-col items-center gap-20 overflow-x-hidden pt-24 text-white font-sans">
            <div className="text-center mb-10">
                <h1 className="text-white text-4xl font-bold mb-2">Fiverr Portfolio Generator</h1>
                <p className="text-gray-400">Premium sections for your gig gallery. Clean & Production-Ready.</p>
            </div>

            {/* IMAGE 1: MAIN THUMBNAIL */}
            <section id="thumbnail" className="relative w-[1280px] h-[720px] bg-[#0A0A0B] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center flex-shrink-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />

                <div className="relative z-10 text-center px-10">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-semibold mb-6 tracking-wider uppercase">
                        Live Deployment Included
                    </div>

                    <h1 className="text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight uppercase">
                        Build Production-Ready <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">MERN & Next.js Apps</span>
                    </h1>

                    <p className="text-3xl text-gray-300 font-bold mb-12 flex items-center justify-center gap-4">
                        Next.js <span className="text-gray-600">•</span> MongoDB <span className="text-gray-600">•</span> PostgreSQL <span className="text-gray-600">•</span> Redis <span className="text-gray-600">•</span> Stripe
                    </p>

                    <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <FeatureBox icon={<Zap className="w-8 h-8 text-yellow-400" />} text="Fast & Secure" />
                        <FeatureBox icon={<Layers className="w-8 h-8 text-blue-400" />} text="Scalable 🚀" />
                        <FeatureBox icon={<Globe className="w-8 h-8 text-green-400" />} text="Live Deployment" />
                    </div>
                </div>

                <ProfileOverlay />
                <FloatingIcon icon={<Code2 className="w-20 h-20 opacity-5" />} className="top-10 left-10" />
                <FloatingIcon icon={<Database className="w-24 h-24 opacity-5" />} className="bottom-20 left-20" />
                <FloatingIcon icon={<Server className="w-20 h-20 opacity-5" />} className="top-20 right-20" />
            </section>

            {/* IMAGE 2: TOURISM PROJECT */}
            <section id="tourism" className="relative w-[1280px] h-[720px] bg-gradient-to-br from-slate-900 to-indigo-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-between px-20 flex-shrink-0">
                <div className="w-1/2 z-10">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-semibold mb-6 tracking-wider uppercase">
                        Case Study: Tourism Booking
                    </div>
                    <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
                        Sadpara Experts <br />
                        <span className="text-cyan-400">Tourism Platform</span>
                    </h2>
                    <p className="text-gray-300 text-xl mb-8 leading-relaxed max-w-md">
                        A premium high-altitude mountaineering & trekking platform with live booking system and global payments.
                    </p>

                    <div className="space-y-4">
                        <TechBadge text="Next.js + PostgreSQL" />
                        <TechBadge text="Stripe Payments" />
                        <TechBadge text="Redis Caching" />
                        <TechBadge text="Live Production System" />
                    </div>
                </div>

                <div className="w-1/2 relative h-full flex items-center justify-center">
                    <div className="relative w-[600px] h-auto shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)]">
                        <div className="bg-[#1a1a1a] rounded-t-lg px-4 py-2 flex items-center gap-1.5 border-b border-white/10">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                            <div className="ml-4 flex-1 bg-white/5 rounded py-0.5 px-3 text-[10px] text-gray-400">
                                sadparaexpert.vercel.app
                            </div>
                        </div>
                        <div className="bg-slate-800 aspect-video rounded-b-lg overflow-hidden relative">
                            <img
                                src="/sadparaexperts/home-image.png"
                                alt="Sadpara Experts"
                                className="w-full h-full object-cover object-top"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                        </div>
                    </div>
                    <div className="absolute top-1/4 -right-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl" />
                </div>
                <ProfileOverlay />
            </section>

            {/* IMAGE 3: NGO PROJECT */}
            <section id="ngo" className="relative w-[1280px] h-[720px] bg-gradient-to-br from-[#0a1a14] to-[#052d1d] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-between px-20 flex-shrink-0">
                <div className="w-1/2 relative h-full flex items-center justify-center">
                    <div className="relative w-[600px] h-auto shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] font-sans">
                        <div className="bg-[#1a1a1a] rounded-t-lg px-4 py-2 flex items-center gap-1.5 border-b border-white/10">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                            <div className="ml-4 flex-1 bg-white/5 rounded py-0.5 px-3 text-[10px] text-gray-400">
                                fauzzfoundation.org
                            </div>
                        </div>
                        <div className="bg-slate-800 aspect-video rounded-b-lg overflow-hidden relative">
                            <img
                                src="/fauzz/home-image.png"
                                alt="Fauzz Foundation"
                                className="w-full h-full object-cover object-top"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                        </div>
                    </div>
                    <div className="absolute bottom-1/4 -left-10 w-40 h-40 bg-green-500/10 rounded-full blur-3xl" />
                </div>

                <div className="w-1/2 z-10 text-right">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-semibold mb-6 tracking-wider uppercase">
                        Live NGO Platform
                    </div>
                    <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
                        Fauzz Foundation <br />
                        <span className="text-green-400">Social Impact Site</span>
                    </h2>
                    <p className="text-gray-300 text-xl mb-8 leading-relaxed max-w-md ml-auto">
                        Full-stack production NGO website with recurring donations, impact tracking, and secure media management.
                    </p>

                    <div className="space-y-4 flex flex-col items-end text-right">
                        <TechBadge text="MERN Architecture" className="border-green-500/20 text-green-300" />
                        <TechBadge text="Stripe Donation Flow" className="border-green-500/20 text-green-300" />
                        <TechBadge text="Cloudinary Media" className="border-green-500/20 text-green-300" />
                        <TechBadge text="SEO Optimized" className="border-green-500/20 text-green-300" />
                    </div>
                </div>
                <ProfileOverlay />
            </section>

            {/* IMAGE 4: BACKEND / DASHBOARD */}
            <section id="dashboard" className="relative w-[1280px] h-[720px] bg-[#0F1115] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-between px-20 flex-shrink-0">
                <div className="w-1/2 relative">
                    <div className="bg-[#161B22] border border-white/5 rounded-xl p-6 shadow-2xl relative z-10">
                        <div className="flex items-center justify-between mb-8 text-left">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                                    <LayoutDashboard className="w-6 h-6 text-blue-500" />
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold">Admin Panel</h4>
                                    <p className="text-gray-500 text-xs text-left">Secure Dashboard Access</p>
                                </div>
                            </div>
                            <div className="px-3 py-1 bg-green-500/10 text-green-500 text-xs rounded-full border border-green-500/20">
                                System Active
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6 text-left">
                            <div className="bg-[#0D1117] p-4 rounded-lg border border-white/5">
                                <p className="text-gray-500 text-xs mb-1">Total Revenue</p>
                                <div className="flex items-center justify-between">
                                    <h5 className="text-white text-xl font-bold">$12,450.00</h5>
                                    <TrendingUp className="w-4 h-4 text-green-500" />
                                </div>
                            </div>
                            <div className="bg-[#0D1117] p-4 rounded-lg border border-white/5">
                                <p className="text-gray-500 text-xs mb-1">Active Users</p>
                                <div className="flex items-center justify-between">
                                    <h5 className="text-white text-xl font-bold">1,248</h5>
                                    <span className="text-blue-500 text-[10px]">+12%</span>
                                </div>
                            </div>
                        </div>

                        <div className="h-32 bg-[#0D1117] rounded-lg border border-white/5 p-4 relative overflow-hidden text-left">
                            <div className="absolute bottom-0 left-0 w-full h-1/2 flex items-end gap-1 px-2">
                                {[40, 70, 45, 90, 65, 80, 50, 85, 95].map((h, i) => (
                                    <div key={i} className="flex-1 bg-blue-600/30 rounded-t" style={{ height: `${h}%` }} />
                                ))}
                            </div>
                            <p className="text-gray-400 text-xs">Traffic Analytics</p>
                        </div>
                    </div>

                    <div className="absolute -bottom-10 -right-10 w-64 bg-white rounded-lg p-5 shadow-2xl z-20 text-left">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center">
                                <CreditCard className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-slate-900 font-bold">Stripe Checkout</span>
                        </div>
                        <div className="space-y-2">
                            <div className="h-2 bg-slate-100 rounded-full w-full" />
                            <div className="h-2 bg-slate-100 rounded-full w-2/3" />
                            <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                                <span className="text-slate-900 font-bold ml-auto">$299.00</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-1/3 z-10 text-right">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-sm font-semibold mb-6 tracking-wider uppercase text-right">
                        Powerful Backend
                    </div>
                    <h2 className="text-5xl font-bold text-white mb-6 leading-tight text-right">
                        Secure Admin <br />
                        <span className="text-purple-400">Management</span>
                    </h2>
                    <div className="space-y-4 flex flex-col items-end text-right">
                        <TechBadge text="Role-Based Auth" className="border-purple-500/20 text-purple-300" />
                        <TechBadge text="Redis Optimization" className="border-purple-500/20 text-purple-300" />
                        <TechBadge text="Scalable Architecture" className="border-purple-500/20 text-purple-300" />
                    </div>
                </div>
                <ProfileOverlay />
            </section>

            <div className="mb-20 text-center text-white/40">
                <p className="italic">Capture these high-end, clean production sections for your Fiverr gallery.</p>
            </div>
        </div>
    );
}

function ProfileOverlay() {
    return (
        <div className="absolute right-8 top-8 z-50 flex items-center gap-4 bg-black/40 backdrop-blur-md border border-white/10 px-6 py-4 rounded-2xl">
            <div className="text-right">
                <h4 className="text-xl font-bold text-white whitespace-nowrap">mm danish</h4>
                <p className="text-sm text-blue-400 font-bold tracking-widest uppercase">software engineer</p>
            </div>
            <div className="w-16 h-16 rounded-xl border-2 border-blue-500/50 overflow-hidden shadow-2xl flex-shrink-0">
                <img
                    src="/profile.png"
                    alt="mm danish"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
}

function FeatureBox({ icon, text }: { icon: React.ReactNode, text: string }) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center gap-3 backdrop-blur-sm">
            {icon}
            <span className="text-gray-200 text-sm font-medium">{text}</span>
        </div>
    );
}

function TechBadge({ text, className = "" }: { text: string, className?: string }) {
    return (
        <div className={`px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-medium inline-block text-lg ${className}`}>
            {text}
        </div>
    );
}

function FloatingIcon({ icon, className }: { icon: React.ReactNode, className: string }) {
    return (
        <div className={`absolute text-white ${className}`}>
            {icon}
        </div>
    );
}
