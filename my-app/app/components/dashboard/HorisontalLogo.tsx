import Image from 'next/image';
import React from 'react';
import Logo from '@/public/assets/logo.png'
export default function HorisontalLogo() {
  return (
    <>
     <div className=" w-full px-4 p-2  flex space-x-5 items-center">
        <Image src={Logo} alt='Logo' width={'50'}  />
        <h1 className="text-lg font-semibold text-emerald-800">
            UESMM-Kenitra
        </h1>
     </div>
    </>
  );
}
