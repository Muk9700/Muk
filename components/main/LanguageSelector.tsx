"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/lib/i18n/translations';

const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'ko', label: '한국어', flag: 'KR' },
    { code: 'en', label: 'English', flag: 'US' },
    { code: 'es', label: 'Español', flag: 'ES' },
];

const LanguageSelector = () => {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const currentLang = languages.find(l => l.code === language) || languages[0];

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white/80 hover:text-white"
            >
                <span className="text-sm font-medium uppercase">{currentLang.code}</span>
                <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                >
                    <path d="M6 9l6 6 6-6" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-32 py-2 bg-[#1c1c1c] border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl z-[101] animate-in fade-in zoom-in duration-200">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => {
                                setLanguage(lang.code);
                                setIsOpen(false);
                            }}
                            className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-white/5 ${language === lang.code ? 'text-indigo-400 font-bold' : 'text-white/60'
                                }`}
                        >
                            {lang.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;
