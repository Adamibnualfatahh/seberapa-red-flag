import React, { useState } from 'react';
import { Gender, RelationshipStatus, UserData } from '../types';
import Button from './Button';
import { User, Heart, Calendar } from 'lucide-react';

interface UserDataFormProps {
  initialData: UserData;
  onSubmit: (data: UserData) => void;
}

const UserDataForm: React.FC<UserDataFormProps> = ({ initialData, onSubmit }) => {
  const [data, setData] = useState<UserData>(initialData);

  const isValid = data.gender !== '' && data.age !== '' && data.status !== '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) onSubmit(data);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg border border-red-50 animate-scale-in">
      <h2 className="text-2xl font-bold text-center mb-8 text-textMain">Identitas Diri</h2>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Gender */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-textSub flex items-center gap-2">
            <User size={18} className="text-primary" /> Jenis Kelamin
          </label>
          <div className="grid grid-cols-3 gap-3">
            {Object.values(Gender).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setData({ ...data, gender: g })}
                className={`py-3 px-2 text-sm font-medium rounded-xl border transition-all duration-200 transform hover:scale-[1.02] ${
                  data.gender === g 
                    ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30' 
                    : 'bg-white text-textSub border-gray-100 hover:border-primary hover:text-primary hover:shadow-md'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Age */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-textSub flex items-center gap-2">
            <Calendar size={18} className="text-primary" /> Umur
          </label>
          <div className="relative">
            <input
              type="number"
              min="10"
              max="99"
              value={data.age}
              onChange={(e) => setData({ ...data, age: e.target.value })}
              className="w-full p-4 text-center text-2xl font-bold text-primary placeholder-gray-300 rounded-xl border-2 border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all bg-gray-50 focus:bg-white"
              placeholder="00"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">Tahun</span>
          </div>
        </div>

        {/* Status */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-textSub flex items-center gap-2">
            <Heart size={18} className="text-primary" /> Status Hubungan
          </label>
          <div className="grid grid-cols-1 gap-3">
            {Object.values(RelationshipStatus).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setData({ ...data, status: s })}
                className={`w-full py-3 px-4 text-sm font-medium rounded-xl border transition-all duration-200 flex items-center justify-between group ${
                  data.status === s
                    ? 'bg-secondary text-white border-secondary shadow-lg shadow-secondary/30'
                    : 'bg-white text-textSub border-gray-100 hover:border-secondary hover:text-secondary hover:shadow-md'
                }`}
              >
                <span>{s}</span>
                {data.status === s && <Heart size={16} className="fill-current" />}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4">
          <Button type="submit" fullWidth disabled={!isValid} className="shadow-xl shadow-primary/20">
            Lanjut
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserDataForm;