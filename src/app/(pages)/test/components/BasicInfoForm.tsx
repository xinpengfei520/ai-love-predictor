'use client';

import { useState } from 'react';
import type { BasicInfo } from '../types';

interface BasicInfoFormProps {
  value: BasicInfo;
  onChange: (value: BasicInfo) => void;
  onNext: () => void;
}

export function BasicInfoForm({ value, onChange, onNext }: BasicInfoFormProps) {
  const [errors, setErrors] = useState<Partial<Record<keyof BasicInfo, string>>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 表单验证
    const newErrors: Partial<Record<keyof BasicInfo, string>> = {};
    if (!value.age || value.age < 18 || value.age > 100) {
      newErrors.age = '请输入有效年龄（18-100岁）';
    }
    if (!value.gender) {
      newErrors.gender = '请选择性别';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <div className="space-y-3">
        <label className="block text-xs font-black uppercase tracking-[0.18em] text-[var(--muted)]">
          年龄
        </label>
        <input
          type="number"
          value={value.age || ''}
          onChange={(e) => onChange({ ...value, age: parseInt(e.target.value) })}
          className="w-full border-2 border-[var(--ink)] bg-white px-5 py-4 text-lg font-bold outline-none transition focus:border-[var(--coral)] focus:shadow-[6px_6px_0_var(--aqua)]"
          placeholder="请输入您的年龄"
        />
        {errors.age && (
          <p className="text-sm font-bold text-[var(--coral)]">{errors.age}</p>
        )}
      </div>

      <div className="space-y-3">
        <label className="block text-xs font-black uppercase tracking-[0.18em] text-[var(--muted)]">
          性别
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className={`cursor-pointer border-2 p-4 font-black transition ${value.gender === 'male' ? 'border-[var(--ink)] bg-[var(--ink)] text-white shadow-[6px_6px_0_var(--coral)]' : 'border-[var(--ink)]/20 bg-white hover:border-[var(--ink)]'}`}>
            <input
              type="radio"
              value="male"
              checked={value.gender === 'male'}
              onChange={(e) => onChange({ ...value, gender: e.target.value as 'male' | 'female' })}
              className="sr-only"
            />
            男性
          </label>
          <label className={`cursor-pointer border-2 p-4 font-black transition ${value.gender === 'female' ? 'border-[var(--ink)] bg-[var(--ink)] text-white shadow-[6px_6px_0_var(--coral)]' : 'border-[var(--ink)]/20 bg-white hover:border-[var(--ink)]'}`}>
            <input
              type="radio"
              value="female"
              checked={value.gender === 'female'}
              onChange={(e) => onChange({ ...value, gender: e.target.value as 'male' | 'female' })}
              className="sr-only"
            />
            女性
          </label>
        </div>
        {errors.gender && (
          <p className="text-sm font-bold text-[var(--coral)]">{errors.gender}</p>
        )}
      </div>

      <div className="space-y-3">
        <label className="block text-xs font-black uppercase tracking-[0.18em] text-[var(--muted)]">
          照片（可选）
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => onChange({ ...value, photo: e.target.files?.[0] })}
          className="w-full border-2 border-dashed border-[var(--ink)]/25 bg-white p-5 text-sm font-bold file:mr-4 file:border-0 file:bg-[var(--ink)] file:px-4 file:py-2 file:font-black file:text-white hover:border-[var(--coral)]"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[var(--coral)] px-5 py-4 text-lg font-black text-[var(--ink)] shadow-[8px_8px_0_var(--aqua)] transition hover:-translate-y-1 hover:shadow-[12px_12px_0_var(--aqua)] focus:outline-none focus:ring-4 focus:ring-[rgba(98,229,210,.35)]"
      >
        下一步
      </button>
    </form>
  );
} 
