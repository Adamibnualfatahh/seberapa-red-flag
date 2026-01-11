import React from 'react';
import { Flag, Heart } from 'lucide-react';
import Button from './Button';

interface WelcomeProps {
  onStart: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8 animate-fade-in px-4">
      <div className="relative">
        <div className="absolute -top-4 -right-4 text-primary animate-bounce delay-100">
          <Flag size={48} fill="#FF4B5C" />
        </div>
        <div className="absolute -bottom-4 -left-4 text-secondary animate-pulse">
          <Heart size={48} fill="#FFA07A" />
        </div>
        <img 
          src="https://picsum.photos/400/400" 
          alt="Couple illustration" 
          className="w-64 h-64 object-cover rounded-full shadow-xl border-4 border-white"
        />
      </div>
      
      <div className="space-y-4 max-w-md">
        <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
          Seberapa <br/><span className="text-black">Red Flag</span> Kamu?
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