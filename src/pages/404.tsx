
import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-6xl font-bold">404</h1>
        <h2 className="text-2xl font-medium">ไม่พบหน้าที่คุณกำลังค้นหา</h2>
        <p className="text-muted-foreground">
          หน้าเว็บที่คุณกำลังพยายามเข้าถึงไม่มีอยู่หรือถูกย้ายไปที่อื่น
        </p>
        <Button asChild className="mt-4">
          <Link href="/" className="inline-flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            กลับไปยังหน้าหลัก
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
