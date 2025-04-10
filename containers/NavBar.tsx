import React from 'react';
import Button, { ButtonVariant } from '@/components/Button';
import Brand from './Brand';

const NavBar = () => (
  <div className="h-[80px] flex justify-between items-center px-6">
    <Brand />
    <div className="flex gap-4 items-center">
      <Button variant={ButtonVariant.Outline}>Sign In</Button>
      <Button variant={ButtonVariant.Primary}>Sign Up</Button>
    </div>
  </div>
);

export default NavBar;
