import React, { useMemo } from 'react';
import { UserData, Question } from '../types';
import { SOLUTIONS } from '../constants';
import Button from './Button';
import { Share2, RefreshCw, AlertTriangle, CheckCircle, AlertOctagon, Info, Lightbulb, TrendingUp, TrendingDown } from 'lucide-react';

interface ResultProps {
  score: number;
  userData: UserData;
  questions: Question[];
  answers: Record<number, number>;
  onReset: () => void;
}

const Result: React.FC<ResultProps> = ({ score, userData, questions, answers, onReset }) => {
  // Logic based on weighted score
  // Calculate max possible score for the filtered questions
  const maxPossibleScore = questions.reduce((acc, q) => acc + (3 * (q.weight || 1)), 0);

  // Calculate percentage of "Red Flag"
  const percentage = Math.round((score / maxPossibleScore) * 100);

  let category = '';
  let color = '';
  let description = '';
  let Icon = CheckCircle;

  if (percentage <= 20) {
    category = 'Green Flag (Aman)';
    color = '#10B981'; // Green
    description = 'Wah, kamu pasangan idaman! Hubunganmu sehat dan dewasa. Pertahankan!';
    Icon = CheckCircle;
  } else if (percentage <= 40) {
    category = 'Beige Flag (Hati-hati)';
    color = '#F59E0B'; // Yellow
    description = 'Ada beberapa ' + (userData.status === 'Menikah' ? 'bumbu rumah tangga' : 'masalah') + ' yang perlu diperbaiki, tapi masih bisa ditoleransi.';
    Icon = AlertTriangle;
  } else if (percentage <= 65) {
    category = 'Red Flag (Bahaya)';
    color = '#F97316'; // Orange
    description = 'Lampu kuning menuju merah. Banyak perilaku toksik yang tanpa sadar kamu lakukan.';
    Icon = AlertOctagon;
  } else {
    category = 'Walking Red Flag (Lari!)';
    color = '#EF4444'; // Red
    description = 'Kamu adalah definisi bahaya. Pasanganmu pantas mendapatkan medali kesabaran atau lari secepatnya.';
    Icon = AlertOctagon;
  }

  // Calculate detailed analysis per category
  const analysis = useMemo(() => {
    const categoryScores: Record<string, { total: number; max: number; count: number }> = {};

    questions.forEach(q => {
      if (!categoryScores[q.category]) {
        categoryScores[q.category] = { total: 0, max: 0, count: 0 };
      }
      const userScore = (answers[q.id] || 0) * (q.weight || 1);
      const maxScore = 3 * (q.weight || 1);

      categoryScores[q.category].total += userScore;
      categoryScores[q.category].max += maxScore;
      categoryScores[q.category].count += 1;
    });

    return Object.entries(categoryScores).map(([name, data]) => ({
      name,
      score: data.total,
      max: data.max,
      percentage: (data.total / data.max) * 100
    })).sort((a, b) => b.percentage - a.percentage); // Sort by highest problem first
  }, [questions, answers]);

  const worstCategory = analysis[0];
  const bestCategory = analysis[analysis.length - 1];

  // Find relevant solutions based on worst categories
  const relevantSolutions = useMemo(() => {
    return analysis
      .filter(a => a.percentage > 30) // Only give advice for problem areas > 30%
      .map(cat => {
        // Find matching solution ranges
        // Need to normalize score to 0-3 range equivalent for lookup?
        // Actually SOLUTIONS uses scoreRange based on average raw score (0-3). 
        // Let's calculate average raw score roughly or just map percentage.
        // Simplified: 0-33% Low, 34-100% High.

        // Find specific solution entry for this category
        // The SOLUTIONS constant has scoreRange. Let's assume scoreRange is [minAvg, maxAvg]
        // Avg = cat.score / (totalQuestionsInCat * avgWeight?) -> Complicated.
        // Let's match by name first.

        const catSolutions = SOLUTIONS.filter(s => s.category === cat.name);

        // Simple logic: if percentage > 50 (High Risk), pick the second solution if exists (usually high risk)
        // If percentage <= 50, pick first.
        // Or check scoreRange strictly?
        // SOLUTIONS in constants.ts:
        // scoreRange: [0, 1] -> Low
        // scoreRange: [1.1, 3] -> High

        // Let's calculate normalized average score (0-3) for this category
        // We know cat.max is sum of (3 * weight). 
        // We want average score per unit of weight? 
        // Let's just map percentage to 0-3 scale.
        const normalizedScore = (cat.percentage / 100) * 3;

        return catSolutions.find(s =>
          normalizedScore >= s.scoreRange[0] && normalizedScore <= s.scoreRange[1]
        );
      })
      .filter(Boolean) // Remove undefined
      .slice(0, 3); // Top 3 advice
  }, [analysis]);

  const handleShare = async () => {
    const text = `Aku baru saja cek level Red Flag-ku! Skor: ${percentage}% (${category}) dengan masalah utama di ${worstCategory?.name || '...gak ada!'}. Cek punyamu di sini!`;
    const shareData: ShareData = {
      title: 'Seberapa Red Flag Kamu?',
      text: text,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // ignore
      }
    } else {
      alert('Screenshot layar ini dan bagikan ke temanmu!');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center space-y-8 pb-12 animate-fade-in-up px-4">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-textMain">Analisis Karakter</h2>
        <p className="text-textSub">
          Hai <span className="font-semibold text-primary">{userData.gender === 'Pria' ? 'Bro' : userData.gender === 'Wanita' ? 'Sis' : 'Kak'}</span>,
          berikut adalah peta kepribadianmu dalam hubungan:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {/* SCORE CARD */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center justify-center relative overflow-hidden min-h-[300px]">
          <div className="absolute top-0 inset-x-0 h-2 w-full" style={{ backgroundColor: color }}></div>

          <div className="relative z-10 w-full flex flex-col items-center">
            {/* GAUGE SPEEDOMETER */}
            <div className="relative flex flex-col items-center justify-center pt-4 mb-4">
              <svg
                height={100}
                width={200}
                className="overflow-visible"
              >
                <defs>
                  <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="50%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#EF4444" />
                  </linearGradient>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Background Arc */}
                <path
                  d="M 15 100 A 85 85 0 0 1 185 100"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="20"
                  strokeLinecap="round"
                />

                {/* Active Arc (Gradient Track) */}
                <path
                  d="M 15 100 A 85 85 0 0 1 185 100"
                  fill="none"
                  stroke="url(#gaugeGradient)"
                  strokeWidth="20"
                  strokeLinecap="round"
                  opacity="0.3"
                />

                {/* Value Arc (The actual score) */}
                <path
                  d="M 15 100 A 85 85 0 0 1 185 100"
                  fill="none"
                  stroke={color}
                  strokeWidth="20"
                  strokeLinecap="round"
                  strokeDasharray={`${(percentage / 100) * (85 * Math.PI)} 500`}
                  filter="url(#glow)"
                />

                {/* Needle Text (Percentage in middle) */}
                <text x="100" y="85" textAnchor="middle" fill={color} fontSize="32" fontWeight="bold" fontFamily="sans-serif">
                  {percentage}%
                </text>
                <text x="100" y="105" textAnchor="middle" fill="#9CA3AF" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
                  RED FLAG
                </text>
              </svg>
              {/* Needle Indicator */}
              <div
                className="absolute bottom-0 w-1 h-24 origin-bottom bg-gray-800 rounded-full transition-transform duration-1000 ease-out z-10"
                style={{
                  transform: `rotate(${-90 + (percentage / 100) * 180}deg)`,
                  height: '80px',
                  bottom: '8px'
                }}
              >
                <div className="absolute -top-1 -left-1.5 w-4 h-4 bg-white border-2 border-gray-800 rounded-full shadow-sm"></div>
              </div>
              {/* Hub */}
              <div className="absolute bottom-0 w-4 h-4 bg-gray-800 rounded-full z-20" style={{ bottom: '0px' }}></div>
            </div>

            <h3 className="text-3xl font-black mb-1 mt-6 tracking-tight text-gray-800" style={{ color }}>{category}</h3>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base text-center max-w-xs">
              "{description}"
            </p>
          </div>

          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle at center, currentColor 1px, transparent 1px)', backgroundSize: '20px 20px', color: color }}>
          </div>
        </div>

        {/* STATS CARD */}
        <div className="space-y-4">
          {/* KELEBIHAN & KEKURANGAN */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col justify-center">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp size={20} className="text-blue-500" /> Peta Kekuatan & Kelemahan
            </h4>

            <div className="space-y-4">
              {bestCategory && (
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-100">
                  <div>
                    <p className="text-xs text-green-600 font-bold uppercase">Kelebihan Utama</p>
                    <p className="font-semibold text-green-900">{bestCategory.name}</p>
                  </div>
                  <span className="text-2xl font-bold text-green-600">{(100 - bestCategory.percentage).toFixed(0)}% <span className="text-xs font-normal text-green-800">Sehat</span></span>
                </div>
              )}

              {worstCategory && (
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-xl border border-red-100">
                  <div>
                    <p className="text-xs text-red-600 font-bold uppercase">Red Flag Terbesar</p>
                    <p className="font-semibold text-red-900">{worstCategory.name}</p>
                  </div>
                  <span className="text-2xl font-bold text-red-600">{worstCategory.percentage.toFixed(0)}% <span className="text-xs font-normal text-red-800">Merah</span></span>
                </div>
              )}

              <div className="pt-2">
                <p className="text-xs text-center text-gray-400">Total Skor: {score} / {maxPossibleScore}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SOLUTIONS SECTION */}
      {relevantSolutions.length > 0 && (
        <div className="w-full bg-gradient-to-br from-indigo-50 to-blue-50 p-6 md:p-8 rounded-3xl border border-indigo-100 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h4 className="font-bold text-indigo-900 mb-6 flex items-center gap-2 text-xl">
            <Lightbulb size={24} className="text-indigo-600" /> Saran Perbaikan Hubungan
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relevantSolutions.map((sol, idx) => (
              <div key={idx} className="bg-white/80 p-5 rounded-2xl border border-indigo-50/50 backdrop-blur-sm hover:translate-y-[-2px] transition-transform">
                <div className="flex flex-col h-full">
                  <div className="mb-3">
                    <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest bg-indigo-50 px-2 py-1 rounded inline-block mb-2">
                      {sol?.category}
                    </span>
                    <h5 className="font-bold text-gray-900 text-lg leading-tight">{sol?.title}</h5>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 flex-grow italic">"{sol?.description}"</p>

                  <div className="space-y-2 mt-auto">
                    {sol?.advice.map((adv, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <div className="min-w-[6px] h-[6px] rounded-full bg-indigo-400 mt-1.5"></div>
                        <span>{adv}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUPPORT & REFLECTION SECTION (New Request) */}
      <div className="w-full bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <div className="text-center mb-6">
          <h4 className="text-xl font-bold text-gray-800 flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl">💌</span> Pesan Semangat Untukmu
          </h4>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            "Ingat ya, tidak ada manusia yang sempurna. Skor di atas bukanlah vonis mati, tapi <span className="font-semibold text-primary">cermin jujur</span> agar kamu bisa tumbuh. Mengakui kekurangan adalah langkah pertama yang paling berani menuju perubahan. Kamu hebat karena sudah berani introspeksi diri!"
          </p>
        </div>

        <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
          <h5 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Info size={20} className="text-orange-500" /> Hal Sederhana yang Bisa Kamu Mulai Hari Ini:
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Ucapkan 'terima kasih' untuk hal kecil yang pasangan lakukan.",
              "Jika marah, tarik napas 10 detik sebelum bicara (hindari kata kasar).",
              "Coba tanya 'Bagaimana harimu?' dan benar-benar dengarkan jawabannya.",
              "Kurangi main HP saat sedang makan atau ngobrol berdua.",
              "Validasi perasaan pasangan, jangan bilang 'ah gitu aja baper'.",
              "Berikan pujian tulus minimal satu kali sehari."
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-orange-100 shadow-sm">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs">
                  {idx + 1}
                </div>
                <span className="text-sm font-medium text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons Area */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-4 w-full pt-8 pb-8 border-t border-gray-100 mt-8">
        <button
          onClick={onReset}
          className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-gray-500 font-semibold hover:text-primary hover:bg-red-50 transition-all duration-300 w-full sm:w-auto"
        >
          <RefreshCw size={20} className="transition-transform duration-500 group-hover:-rotate-180" />
          <span>Coba Lagi (Reset)</span>
        </button>

        <button
          onClick={handleShare}
          className="relative overflow-hidden flex items-center justify-center gap-2 px-10 py-4 rounded-2xl bg-gradient-to-r from-primary via-red-500 to-orange-500 text-white font-bold text-lg shadow-xl shadow-red-500/30 hover:shadow-2xl hover:shadow-red-500/40 transform hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto min-w-[240px]"
        >
          <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          <Share2 size={24} className="relative z-10" />
          <span className="relative z-10">Bagikan Hasil</span>
        </button>
      </div>

      <div className="text-center text-xs text-gray-400 pt-8 max-w-lg mx-auto">
        Disclaimer: Hasil ini hanya untuk hiburan dan introspeksi diri. Jika kamu merasa memiliki masalah serius dalam pengendalian emosi atau perilaku, silakan konsultasi ke profesional.
      </div>
    </div>
  );
};

export default Result;