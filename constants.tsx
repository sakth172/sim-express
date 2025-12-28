
import React from 'react';
import { SIMBrand } from './types';

export const BRAND_CONFIG = {
  [SIMBrand.JIO]: {
    name: 'JIO',
    color: 'bg-gradient-to-r from-[#00D2FF] to-[#3A7BD5] hover:shadow-[0_0_30px_rgba(0,210,255,0.5)]',
    border: 'border-[#00D2FF]/50',
    glow: 'shadow-[0_0_60px_rgba(0,210,255,0.25)]',
    text: 'text-[#00D2FF]',
    bgLight: 'bg-[#00D2FF]/15',
    gradient: 'from-[#001F3F] via-[#001220] to-[#00D2FF]/20',
    accent: '#00D2FF'
  },
  [SIMBrand.AIRTEL]: {
    name: 'AIRTEL',
    color: 'bg-gradient-to-r from-[#FF007A] to-[#FF4D4D] hover:shadow-[0_0_30px_rgba(255,0,122,0.5)]',
    border: 'border-[#FF007A]/50',
    glow: 'shadow-[0_0_60px_rgba(255,0,122,0.25)]',
    text: 'text-[#FF4D8B]',
    bgLight: 'bg-[#FF007A]/15',
    gradient: 'from-[#20000A] via-[#100005] to-[#FF007A]/20',
    accent: '#FF007A'
  },
  [SIMBrand.VI]: {
    name: 'VI',
    color: 'bg-gradient-to-r from-[#9D00FF] to-[#6E00FF] hover:shadow-[0_0_30px_rgba(157,0,255,0.5)]',
    border: 'border-[#9D00FF]/50',
    glow: 'shadow-[0_0_60px_rgba(157,0,255,0.25)]',
    text: 'text-[#C566FF]',
    bgLight: 'bg-[#9D00FF]/15',
    gradient: 'from-[#1A0033] via-[#0A0014] to-[#9D00FF]/20',
    accent: '#9D00FF'
  },
  [SIMBrand.NONE]: {
    name: 'Express',
    color: 'bg-gradient-to-r from-[#1a4a8d] to-[#e45d25] hover:bg-white/30',
    border: 'border-white/20',
    glow: 'shadow-[0_0_50px_rgba(255,255,255,0.1)]',
    text: 'text-white/60',
    bgLight: 'bg-white/10',
    gradient: 'from-[#0A0A1A] via-[#1A1A3A] to-[#0A0A1A]',
    accent: '#1a4a8d' // Primary Logo Blue
  }
};

export const WHATSAPP_NUMBER = "919360626529";
