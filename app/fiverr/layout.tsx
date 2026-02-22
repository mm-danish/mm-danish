import React from 'react';

export default function FiverrLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="fiverr-preview-wrapper min-h-screen bg-[#050505]">
            {children}
        </div>
    );
}
