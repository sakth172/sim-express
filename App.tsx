
import React, { useState, useCallback, useEffect } from 'react';
import { SIMBrand, SIMType } from './types';
import { BRAND_CONFIG, WHATSAPP_NUMBER } from './constants';
import { AIAssistant } from './components/AIAssistant';

const SIMExpressLogo = ({ activeColor, isDefault }: { activeColor: string; isDefault: boolean }) => (
  <svg viewBox="0 0 400 300" className="w-48 h-36 transition-all duration-700 drop-shadow-2xl">
    <defs>
      <linearGradient id="phoneGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#0071BC" />
        <stop offset="100%" stopColor="#1B1464" />
      </linearGradient>
      <linearGradient id="simGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FBB03B" />
        <stop offset="100%" stopColor="#D97E00" />
      </linearGradient>
      <filter id="logoShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
        <feOffset dx="0" dy="4" result="offsetblur" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.3" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Phone Frame */}
    <g transform="rotate(-15, 200, 150) translate(130, 80)">
      <rect width="140" height="180" rx="15" fill="url(#phoneGrad)" stroke="#fff" strokeWidth="2" />
      <rect x="10" y="10" width="120" height="160" rx="8" fill="#fff" opacity="0.9" />
      
      {/* SIM Chip Details */}
      <g transform="translate(25, 45)">
        <rect width="90" height="70" rx="10" fill="url(#simGrad)" />
        <path d="M10 20 H80 M10 35 H80 M10 50 H80 M32.5 10 V60 M57.5 10 V60" stroke="#8B5E3C" strokeWidth="1" opacity="0.6" />
      </g>
    </g>

    {/* Orbit Swooshes */}
    {/* Orange Swoosh */}
    <path 
      d="M80 160 C 80 120, 150 100, 220 120 C 300 145, 250 210, 150 200" 
      stroke="#EF5B24" 
      strokeWidth="12" 
      fill="none" 
      strokeLinecap="round"
      className={isDefault ? 'animate-pulse' : ''}
      style={{ filter: 'url(#logoShadow)' }}
    />
    {/* Blue Swoosh */}
    <path 
      d="M120 220 C 220 230, 350 200, 320 140 C 300 100, 220 110, 150 145" 
      stroke="#1B4A8D" 
      strokeWidth="12" 
      fill="none" 
      strokeLinecap="round"
      className={isDefault ? 'animate-pulse' : ''}
      style={{ filter: 'url(#logoShadow)' }}
    />

    {/* Trailing Dots */}
    <circle cx="100" cy="140" r="3" fill="#EF5B24" opacity="0.8" />
    <circle cx="115" cy="130" r="3" fill="#EF5B24" opacity="0.6" />
    <circle cx="130" cy="122" r="3" fill="#EF5B24" opacity="0.4" />
    
    <circle cx="300" cy="180" r="3" fill="#1B4A8D" opacity="0.8" />
    <circle cx="285" cy="190" r="3" fill="#1B4A8D" opacity="0.6" />
    <circle cx="270" cy="198" r="3" fill="#1B4A8D" opacity="0.4" />
  </svg>
);

const App: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState<SIMBrand>(SIMBrand.NONE);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    simType: '',
    address: '',
    location: 'Not shared',
  });
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

  const brandStyles = BRAND_CONFIG[selectedBrand];
  const isDefaultState = selectedBrand === SIMBrand.NONE;

  const getAvailableSimTypes = () => {
    const allTypes = Object.values(SIMType);
    if (selectedBrand === SIMBrand.JIO) {
      return allTypes.filter(type => type === SIMType.NEW || type === SIMType.PORT);
    }
    return allTypes;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const fetchLocation = useCallback(() => {
    if (!navigator.geolocation) {
      alert("Location services needed.");
      return;
    }
    setIsFetchingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setFormData(prev => ({ ...prev, location: `https://maps.google.com/?q=${pos.coords.latitude},${pos.coords.longitude}` }));
        setIsFetchingLocation(false);
      },
      () => {
        setIsFetchingLocation(false);
        alert("Location access denied.");
      }
    );
  }, []);

  const sendWhatsAppOrder = () => {
    const { name, mobile, simType, address, location } = formData;
    if (isDefaultState) return alert("Pick a network provider.");
    if (!name || !mobile || !simType || !address) return alert("Complete the form details.");

    const orderId = "SMX-" + Math.random().toString(36).substring(7).toUpperCase();
    const msg = `🌈 *SIMEXPRESS PRISMATIC ORDER* 🌈\n\n🆔 ID: ${orderId}\n👤 User: ${name}\n📞 Contact: ${mobile}\n🏢 Network: ${BRAND_CONFIG[selectedBrand].name}\n💳 Service: ${simType}\n🏠 Address: ${address}\n📍 Location: ${location}`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className={`relative min-h-screen w-full transition-all duration-1000 overflow-hidden bg-[#0a0a1a] flex flex-col items-center justify-center p-4 sm:p-6`}>
      
      {/* Aurora Mesh Background */}
      <div className={`absolute inset-0 transition-opacity duration-[2000ms] opacity-60 bg-gradient-to-br ${brandStyles.gradient}`}></div>
      
      {/* Floating Holographic Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-30 animate-blob bg-[#00D2FF]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[140px] opacity-30 animate-blob animation-delay-2000 bg-[#FF007A]"></div>
      <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-20 animate-blob animation-delay-4000 bg-[#9D00FF]"></div>

      <div className={`relative w-full max-w-lg bg-white/10 backdrop-blur-[40px] border border-white/20 rounded-[48px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-700 ${brandStyles.glow}`}>
        
        {/* Colorful Gradient Header Line */}
        <div className="h-2 w-full transition-all duration-1000" style={{ 
          background: isDefaultState 
            ? `linear-gradient(90deg, #1B4A8D, #EF5B24, #1B4A8D)` 
            : `linear-gradient(90deg, transparent, ${brandStyles.accent}, transparent)` 
        }}></div>

        {/* Branding Hero - Using the New Logo Representation */}
        <div className="pt-8 pb-4 px-10 text-center flex flex-col items-center">
          <div className="relative group mb-2">
            <div className={`absolute inset-0 transition-all duration-1000 opacity-20 blur-3xl`} style={{ background: isDefaultState ? '#1B4A8D' : brandStyles.accent }}></div>
            <SIMExpressLogo activeColor={brandStyles.accent} isDefault={isDefaultState} />
          </div>
          <h1 className="text-5xl font-black tracking-tighter italic leading-none mb-1 drop-shadow-xl flex gap-3">
            <span className="text-[#1B4A8D]">SIM</span>
            <span className="text-[#EF5B24]">EXPRESS</span>
          </h1>
          <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.5em] mix-blend-overlay">Rapid Connectivity Interface</p>
        </div>

        {/* Brand Selector Grid */}
        <div className="px-10 mb-8">
          <div className="flex items-center justify-between mb-4 px-1">
            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Network selection</span>
            {!isDefaultState && (
              <span className="text-[9px] font-bold py-1 px-3 rounded-full bg-white/20 text-white/90 border border-white/10 animate-pulse">PROVIDER ACTIVE</span>
            )}
          </div>
          <div className="grid grid-cols-3 gap-5">
            {[SIMBrand.JIO, SIMBrand.AIRTEL, SIMBrand.VI].map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`group relative py-6 px-2 rounded-[28px] border transition-all duration-500 flex flex-col items-center gap-2 overflow-hidden ${
                  selectedBrand === brand 
                  ? `${BRAND_CONFIG[brand].border} bg-white/20 scale-105 shadow-2xl` 
                  : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30'
                }`}
              >
                <span className={`text-[12px] font-black uppercase tracking-tighter transition-all ${selectedBrand === brand ? 'text-white' : 'text-white/30'}`}>
                  {BRAND_CONFIG[brand].name}
                </span>
                {selectedBrand === brand && (
                  <div className="absolute bottom-0 w-full h-[4px]" style={{ background: brandStyles.accent }}></div>
                )}
                <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:left-[100%] transition-all duration-700"></div>
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Form Matrix */}
        <div className="px-10 space-y-5 mb-12">
          <div className="relative group">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full bg-white/5 border border-white/10 rounded-3xl px-7 py-5 text-sm focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all placeholder:text-white/20 text-white font-bold"
            />
          </div>

          <div className="relative group">
            <input
              type="tel"
              name="mobile"
              placeholder="Contact Number"
              value={formData.mobile}
              onChange={handleInputChange}
              className="w-full bg-white/5 border border-white/10 rounded-3xl px-7 py-5 text-sm focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all placeholder:text-white/20 text-white font-bold"
            />
          </div>

          <div className="relative">
            <select
              name="simType"
              value={formData.simType}
              onChange={handleInputChange}
              className="w-full bg-white/5 border border-white/10 rounded-3xl px-7 py-5 text-sm focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all text-white font-bold appearance-none cursor-pointer"
            >
              <option value="" className="bg-[#1A1A3A] text-white/30">Service Modality</option>
              {getAvailableSimTypes().map(type => (
                <option key={type} value={type} className="bg-[#1A1A3A] text-white">{type}</option>
              ))}
            </select>
            <div className="absolute right-7 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          <textarea
            name="address"
            rows={2}
            placeholder="Delivery Destination"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full bg-white/5 border border-white/10 rounded-3xl px-7 py-5 text-sm focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all placeholder:text-white/20 text-white font-bold resize-none"
          />

          <button
            onClick={fetchLocation}
            disabled={isFetchingLocation}
            className="w-full flex items-center justify-center gap-4 bg-white/10 border border-white/10 rounded-3xl py-6 hover:bg-white/20 transition-all group active:scale-[0.98] disabled:opacity-50"
          >
            <div className={`p-2.5 rounded-2xl transition-all duration-500 ${formData.location !== 'Not shared' ? 'bg-green-400/20 text-green-400 shadow-[0_0_15px_rgba(74,222,128,0.3)]' : 'bg-white/10 text-white/40'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isFetchingLocation ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
            </div>
            <span className="text-[11px] uppercase font-black tracking-[0.2em] text-white/50 group-hover:text-white">
              {formData.location !== 'Not shared' ? 'GPS COORDS SECURED' : 'SYNC CURRENT LOCATION'}
            </span>
          </button>
        </div>

        {/* Prismatic Action Zone */}
        <div className="bg-white/5 p-10 border-t border-white/10">
          <button
            onClick={sendWhatsAppOrder}
            className={`group w-full py-7 rounded-[36px] flex items-center justify-center gap-5 font-black text-white shadow-2xl transition-all duration-700 active:scale-95 ${
              !isDefaultState ? brandStyles.color : 'bg-gradient-to-r from-[#1B4A8D] to-[#EF5B24] cursor-pointer hover:scale-[1.02]'
            }`}
          >
            <div className="bg-white/20 p-3 rounded-2xl group-hover:scale-110 group-hover:rotate-[10deg] transition-all duration-500">
              <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.675 1.439 5.662 1.439h.005c6.552 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </div>
            <span className="uppercase tracking-[0.3em] text-[13px] font-black">Authorize Order</span>
          </button>
          
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            <div className="flex items-center gap-2.5 text-white/30 text-[10px] font-black uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]"></span>
              Encrypted
            </div>
            <div className="flex items-center gap-2.5 text-white/30 text-[10px] font-black uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-pink-400 shadow-[0_0_8px_rgba(244,114,182,0.5)]"></span>
              Fast-Track
            </div>
            <div className="flex items-center gap-2.5 text-white/30 text-[10px] font-black uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.5)]"></span>
              AI Support
            </div>
          </div>
        </div>
      </div>

      <AIAssistant />

      <footer className="mt-20 text-white/20 text-[10px] font-black uppercase tracking-[0.6em] flex flex-col items-center gap-6">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400">SIMEXPRESS PRISMATIC NETWORK</span>
        <div className="flex gap-14 opacity-40">
          <span className="hover:text-white transition-colors cursor-pointer">Protocol</span>
          <span className="hover:text-white transition-colors cursor-pointer">Compliance</span>
          <span className="hover:text-white transition-colors cursor-pointer">Helpdesk</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
