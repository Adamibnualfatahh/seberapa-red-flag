import React from 'react';
import { UserData } from '../types';
import Button from './Button';
import { Share2, RefreshCw, AlertTriangle, CheckCircle, AlertOctagon, Info } from 'lucide-react';

interface ResultProps {
  score: number;
  userData: UserData;
  onReset: () => void;
}

const Result: React.FC<ResultProps> = ({ score, userData, onReset }) => {
  // Logic based on specification:
  // 0-5 -> Normal
  // 6-10 -> Sedikit Red Flag
  // 11-15 -> Medium Red Flag
  // 16+ -> Red Flag Tinggi

  let category = '';
  let color = '';
  let description = '';
  let Icon = CheckCircle;
  let percentage = 0;

  // Max score reference for the gauge
  const MAX_SCORE_REF = 30; // Visual max
  
  if (score <= 5) {
    category = 'Normal';
    color = '#10B981'; // Green
    description = 'Hubunganmu terlihat sehat! Kamu memiliki komunikasi yang baik dan emosi yang stabil.';
    Icon = CheckCircle;
  } else if (score <= 10) {
    category = 'Sedikit Red Flag';
    color = '#F59E0B'; // Yellow
    description = 'Ada beberapa kebiasaan kecil yang perlu diperbaiki, tapi secara umum masih aman.';
    Icon = AlertTriangle;
  } else if (score <= 15) {
    category = 'Medium Red Flag';
    color = '#F97316'; // Orange
    description = 'Hati-hati! Banyak perilaku toksik yang mulai muncul. Segera introspeksi diri.';
    Icon = AlertOctagon;
  } else {
    category = 'Red Flag Tinggi';
    color = '#EF4444'; // Red
    description = 'BAHAYA! Kamu menunjukkan tanda-tanda perilaku yang sangat tidak sehat dalam hubungan.';
    Icon = AlertOctagon;
  }

  // Cap percentage at 100 for visual purposes
  percentage = Math.min((score / MAX_SCORE_REF) * 100, 100);

  const handleShare = async () => {
    const text = `Saya baru saja tes di "Seberapa Red Flag". Skor saya: ${score} (${category}). Kamu berani coba?`;
    
    // Ensure URL is valid (http/https) to prevent "Invalid URL" errors in some environments
    const currentUrl = window.location.href;
    const shareData: ShareData = {
      title: 'Hasil Tes Red Flag',
      text: text,
    };

    if (currentUrl.startsWith('http')) {
      shareData.url = currentUrl;
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Error sharing:', error);
        // Ignore AbortError which happens if user cancels the share dialog
        if (error instanceof Error && error.name !== 'AbortError') {
          alert('Gagal membagikan secara langsung. Silakan screenshot halaman ini!');
        }
      }
    } else {
      // Fallback for browsers without share API
      // Copy to clipboard or just alert
      try {
        await navigator.clipboard.writeText(`${text} ${shareData.url || ''}`);
        alert('Hasil disalin ke clipboard! Bagikan ke temanmu.');
      } catch (e) {
        alert('Fitur share tidak didukung browser ini. Screenshot hasilnya ya!');
      }
    }
  };

  // Custom Gauge Component
  const Gauge = ({ value, color }: { value: number; color: string }) => {
    const radius = 80;
    const stroke = 15;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    // Semi-circle: we only use half circumference
    const strokeDashoffset = circumference - (value / 100) * (circumference / 2);
    
    // Rotation for needle
    // 0% = -90deg, 100% = 90deg
    const rotation = -90 + (value / 100) * 180;

    return (
      <div className="relative flex flex-col items-center justify-center pt-8">
        <svg
          height={radius}
          width={radius * 2}
          className="overflow-visible"
        >
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#EF4444" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Background Arc */}
          <path
            d={`M ${stroke} ${radius} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${radius * 2 - stroke} ${radius}`}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth={stroke}
            strokeLinecap="round"
          />
          
          {/* Active Arc (Gradient) */}
          <path
            d={`M ${stroke} ${radius} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${radius * 2 - stroke} ${radius}`}
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth={stroke}
            strokeDasharray={`${circumference / 2} ${circumference}`}
            strokeDashoffset={0} // Show full gradient track
            strokeLinecap="round"
            opacity="0.3"
          />
          
          {/* Value Arc (Solid color or brighter gradient segment) */}
           <path
            d={`M ${stroke} ${radius} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${radius * 2 - stroke} ${radius}`}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeDasharray={`${circumference} ${circumference}`}
            style={{ strokeDashoffset: strokeDashoffset + circumference/2, transition: 'stroke-dashoffset 1s ease-out' }}
            strokeLinecap="round"
            filter="url(#glow)"
          />
        </svg>

        {/* Needle */}
        <div 
          className="absolute bottom-0 w-1 h-24 origin-bottom bg-gray-800 rounded-full transition-transform duration-1000 ease-out z-10"
          style={{ 
            transform: `rotate(${rotation}deg)`,
            height: normalizedRadius + 10 
          }}
        >
          <div className="absolute -top-1 -left-1.5 w-4 h-4 bg-white border-2 border-gray-800 rounded-full shadow-sm"></div>
        </div>
        
        {/* Hub */}
        <div className="absolute bottom-[-8px] w-4 h-4 bg-gray-800 rounded-full z-20"></div>

        {/* Labels */}
        <div className="absolute -bottom-8 flex justify-between w-full px-2 text-xs font-bold text-gray-400">
          <span>0</span>
          <span>{MAX_SCORE_REF}+</span>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center space-y-8 pb-12 animate-fade-in-up px-4">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-textMain">Hasil Analisis</h2>
        <p className="text-textSub">Hai <span className="font-semibold text-primary">{userData.gender === 'Pria' ? 'Bro' : userData.gender === 'Wanita' ? 'Sis' : 'Kak'}</span>, ini skor Red Flag kamu:</p>
      </div>

      {/* Main Score Card */}
      <div className="bg-white p-8 pb-12 rounded-3xl shadow-xl border border-gray-100 w-full flex flex-col items-center relative overflow-hidden">
        {/* Top Accent */}
        <div className="absolute top-0 inset-x-0 h-1.5 w-full" style={{ backgroundColor: color }}></div>
        
        <Gauge value={percentage} color={color} />
        
        <div className="mt-12 text-center relative z-10">
          <div className="flex flex-col items-center">
            <span className="text-6xl font-black tracking-tighter mb-2 drop-shadow-sm" style={{ color }}>{score}</span>
            <div className={`px-4 py-2 rounded-full bg-opacity-10 flex items-center gap-2 mb-4`} style={{ backgroundColor: `${color}20` }}>
              <Icon size={20} color={color} />
              <span className="font-bold uppercase tracking-wide text-sm" style={{ color }}>{category}</span>
            </div>
          </div>
          <p className="text-textMain text-lg leading-relaxed max-w-md mx-auto">{description}</p>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-4 w-full">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center animate-scale-in" style={{ animationDelay: '0.1s' }}>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Umur</span>
          <span className="text-2xl font-bold text-textMain">{userData.age} <span className="text-sm font-normal text-gray-500">Tahun</span></span>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center animate-scale-in" style={{ animationDelay: '0.2s' }}>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Status</span>
          <span className="text-lg font-bold text-textMain text-center leading-tight">{userData.status}</span>
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border border-orange-100 w-full shadow-inner animate-scale-in" style={{ animationDelay: '0.3s' }}>
        <h4 className="font-bold text-orange-800 mb-4 flex items-center gap-2 text-lg">
          <Info size={20} /> Saran & Tips
        </h4>
        <div className="space-y-3">
          {(score > 10 ? [
            "Cobalah untuk lebih mendengarkan pendapat pasangan tanpa memotong.",
            "Kelola emosi dengan mengambil jeda (time-out) saat marah.",
            "Jangan ragu meminta maaf jika salah, itu tanda kedewasaan.",
            "Komunikasikan perasaanmu dengan 'I statements' (Aku merasa...)."
          ] : [
            "Pertahankan komunikasi terbukamu, itu kunci hubungan awet.",
            "Tetap hargai privasi dan ruang pribadi pasangan.",
            "Jadilah pendengar yang baik, bukan hanya pembicara.",
            "Terus pupuk rasa percaya dan saling menghargai."
          ]).map((tip, idx) => (
            <div key={idx} className="flex items-start gap-3 bg-white/60 p-3 rounded-lg">
              <div className="min-w-[6px] h-[6px] rounded-full bg-orange-400 mt-2"></div>
              <p className="text-sm text-gray-700 leading-snug">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full pt-4">
        <Button variant="outline" onClick={onReset} fullWidth className="flex items-center justify-center gap-2 py-4">
          <RefreshCw size={18} /> Ulangi Tes
        </Button>
        <Button onClick={handleShare} fullWidth className="flex items-center justify-center gap-2 py-4 shadow-lg shadow-primary/20">
          <Share2 size={18} /> Bagikan Hasil
        </Button>
      </div>
    </div>
  );
};

export default Result;