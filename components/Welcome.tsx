import React from 'react';
import { Flag, Heart } from 'lucide-react';
import Button from './Button';

interface WelcomeProps {
  onStart: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8 animate-fade-in px-4">
      <div className="relative group">
        <div className="absolute -top-4 -right-4 text-primary animate-bounce delay-100 z-20">
          <Flag size={48} fill="#FF4B5C" />
        </div>
        <div className="absolute -bottom-4 -left-4 text-secondary animate-pulse z-20">
          <Heart size={48} fill="#FFA07A" />
        </div>

        <div className="relative w-64 h-64 rounded-full shadow-2xl border-4 border-white overflow-hidden">
          {/* Pink Overlay */}
          <div className="absolute inset-0 bg-pink-500/25 z-10 pointer-events-none"></div>
          <img
            src="https://picsum.photos/400/400"
            alt="Couple illustration"
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
          />
        </div>
      </div>

      <div className="space-y-4 max-w-md">
        <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
          Seberapa <br /><span className="text-black">Red Flag</span> Kamu?
        </h1>
        <p className="text-lg text-textSub">
          Ikuti tes psikologi ringan ini untuk mengetahui seberapa "berbahaya" pola perilakumu dalam hubungan asmara.
        </p>
      </div>

      <Button onClick={onStart} className="text-lg px-12 py-4">
        Mulai Tes Sekarang
      </Button>
    </div>
  );
};

export default Welcome;