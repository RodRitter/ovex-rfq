import React from 'react';
import { Blocks } from 'lucide-react';

const Brand = () => (
  <div className="flex gap-2 items-center">
    <Blocks size={30} color="#2b82fa" />
    <span className="text-xl font-bold text-black">Traderly</span>
  </div>
);

export default Brand;
