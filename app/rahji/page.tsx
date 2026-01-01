"use client";

import dynamic from 'next/dynamic';

const RahjiLogin = dynamic(() => import('@/components/RahjiLogin'), { 
  ssr: false 
});

export default function Page() {
  return <RahjiLogin />;
}
