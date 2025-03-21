
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CampingZone, CampingSpot, DateRange, ReservationStatus } from '@/lib/types';
import ReservationSummary from '@/components/ReservationSummary';

// Mock data - in a real app, you would fetch this from your API
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { zoneId, spotId, startDate, endDate } = context.query;

  if (!zoneId || !spotId || !startDate || !endDate) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  // Mock data for demonstration
  const zone: CampingZone = {
    id: zoneId as string,
    name: "A1",
    description: "พื้นที่ติดลำธาร บรรยากาศร่มรื่น เหมาะสำหรับครอบครัวและกลุ่มเพื่อน",
    capacity: 20,
    image: "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9",
    amenities: ["น้ำดื่ม", "ห้องน้ำ", "จุดก่อไฟ", "Wi-Fi", "ที่จอดรถ"],
    pricePerNight: 500
  };

  const spot: CampingSpot = {
    id: spotId as string,
    zoneId: zoneId as string,
    name: "A1-1",
    size: "small",
    status: "available",
    location: { x: 10, y: 10 }
  };

  return {
    props: {
      zone,
      spot,
      startDate: startDate as string,
      endDate: endDate as string
    }
  };
};

interface BookingProps {
  zone: CampingZone;
  spot: CampingSpot;
  startDate: string;
  endDate: string;
}

const Booking: React.FC<BookingProps> = ({ zone, spot, startDate, endDate }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const dateRange: DateRange = {
    from: new Date(startDate),
    to: new Date(endDate)
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsConfirmed(true);
    }, 1500);
  };

  if (isConfirmed) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="container mx-auto max-w-3xl px-4 py-8 mt-16"
      >
        <div className="text-center py-16 space-y-6">
          <CheckCircle className="mx-auto h-20 w-20 text-camping-green" />
          <h1 className="text-3xl font-bold">จองสำเร็จแล้ว!</h1>
          <p className="text-lg text-muted-foreground">
            รายละเอียดการจองได้ถูกส่งไปยังอีเมลของคุณแล้ว
          </p>
          <div className="pt-6">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/">
                กลับไปยังหน้าหลัก
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto max-w-5xl px-4 py-8 mt-16"
    >
      <Button variant="ghost" asChild className="mb-4">
        <Link href={`/zones/${zone.id}`} className="inline-flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          กลับไปยังหน้ารายละเอียด
        </Link>
      </Button>

      <h1 className="text-3xl font-bold mb-6">ยืนยันการจอง</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4 p-6 border rounded-lg shadow-sm">
              <h2 className="text-xl font-medium">ข้อมูลผู้จอง</h2>
              <Separator />
              
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">ชื่อ-นามสกุล</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">อีเมล</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="p-6 border rounded-lg shadow-sm">
              <h2 className="text-xl font-medium mb-4">การชำระเงิน</h2>
              <Separator className="mb-4" />
              
              <p className="text-muted-foreground mb-6">
                ชำระเงินด้วยการโอนเงินไปยังบัญชีธนาคารด้านล่าง
              </p>
              
              <div className="bg-muted p-4 rounded mb-6">
                <p>ธนาคารกสิกรไทย</p>
                <p className="font-medium">123-4-56789-0</p>
                <p>ชื่อบัญชี: บริษัท แคมป์ จำกัด</p>
              </div>
              
              <p className="text-sm text-muted-foreground">
                * หลังจากโอนเงินแล้ว กรุณาส่งหลักฐานการโอนเงินมาที่อีเมล booking@campsite.com
              </p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full rounded-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'กำลังดำเนินการ...' : 'ยืนยันการจอง'}
            </Button>
          </form>
        </div>
        
        <div>
          <ReservationSummary 
            zone={zone}
            spot={spot}
            dateRange={dateRange}
            className="sticky top-24"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Booking;
