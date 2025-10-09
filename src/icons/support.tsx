import React from 'react';

export const supportIcons: Record<string, React.ReactNode> = {
  download: (
    <svg className="w-12 h-12 download-icon" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path className="download-arrow" strokeLinecap="round" strokeLinejoin="round" d="M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
      <path className="download-box" strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5" />
    </svg>
  ),
  usage: (
    <svg className="w-full h-full usage-icon pt-[10px]" fill="none" stroke="currentColor" strokeWidth="1" viewBox="6 2 12 20" preserveAspectRatio="xMidYMid meet">
      <path className="usage-clipboard" strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      <path className="usage-check" strokeLinecap="round" strokeLinejoin="round" d="m10 12l2 2 4-4" />
    </svg>
  ),
  settings: (
    <svg className="w-12 h-12 rotate" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path className='question-mark' strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  troubleshoot: (
    <svg className="w-12 h-12 question-icon" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path className="question-mark" strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01" />
      <path className="circle" strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};


