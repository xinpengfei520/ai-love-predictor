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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          年龄
        </label>
        <input
          type="number"
          value={value.age || ''}
          onChange={(e) => onChange({ ...value, age: parseInt(e.target.value) })}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          placeholder="请输入您的年龄"
        />
        {errors.age && (
          <p className="mt-1 text-sm text-red-500">{errors.age}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          性别
        </label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="male"
              checked={value.gender === 'male'}
              onChange={(e) => onChange({ ...value, gender: e.target.value as 'male' | 'female' })}
              className="mr-2"
            />
            男性
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="female"
              checked={value.gender === 'female'}
              onChange={(e) => onChange({ ...value, gender: e.target.value as 'male' | 'female' })}
              className="mr-2"
            />
            女性
          </label>
        </div>
        {errors.gender && (
          <p className="mt-1 text-sm text-red-500">{errors.gender}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          照片（可选）
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => onChange({ ...value, photo: e.target.files?.[0] })}
          className="w-full"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition-colors"
      >
        下一步
      </button>
    </form>
  );
} 