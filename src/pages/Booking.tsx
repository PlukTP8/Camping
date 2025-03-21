
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Check, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import ReservationSummary from '@/components/ReservationSummary';
import { CampingZone, CampingSpot, DateRange, SpotSize, SpotStatus } from '@/lib/types';

// Mock data for initial development
const mockZones: Record<string, CampingZone> = {
  '1': {
    id: '1',
    name: 'ริมธาร',
    description: 'โซนกางเต๊นท์ติดลำธาร เงียบสงบ เหมาะสำหรับการพักผ่อน',
    capacity: 20,
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1470&auto=format&fit=crop',
    amenities: ['ห้องน้ำ', 'จุดล้างจาน', 'จุดก่อไฟ', 'ที่จอดรถ'],
    pricePerNight: 300,
  },
  '2': {
    id: '2',
    name: 'ลานดาว',
    description: 'โซนกางเต๊นท์บนเนินเขา วิวเปิดโล่ง เหมาะสำหรับการดูดาว',
    capacity: 15,
    image: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?q=80&w=1470&auto=format&fit=crop',
    amenities: ['ห้องน้ำ', 'จุดชมวิว', 'ระเบียงชมวิว', 'ที่จอดรถ'],
    pricePerNight: 350,
  },
  '3': {
    id: '3',
    name: 'ป่าสน',
    description: 'โซนกางเต๊นท์ท่ามกลางป่าสน ร่มรื่น อากาศเย็นสบาย',
    capacity: 25,
    image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?q=80&w=1374&auto=format&fit=crop',
    amenities: ['ห้องน้ำ', 'อ่างล้างมือ', 'จุดปิ้งย่าง', 'ลานกิจกรรม', 'ที่จอดรถ'],
    pricePerNight: 400,
  },
};

const getSpotByIdForZone = (zoneId: string, spotId: string): CampingSpot => {
  // Mock function to return a spot by ID
  return {
    id: spotId,
    zoneId,
    name: spotId.split('-')[1],
    size: parseInt(spotId.split('-')[1]) % 3 === 0 ? SpotSize.Large : 
          parseInt(spotId.split('-')[1]) % 2 === 0 ? SpotSize.Medium : 
          SpotSize.Small,
    status: SpotStatus.Available,
    location: { x: 50, y: 50 },
  };
};

interface LocationState {
  zoneId: string;
  spotId: string;
  startDate: Date;
  endDate: Date;
}

const Booking: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    guests: '1',
    notes: '',
  });

  // Get booking details from location state
  const state = location.state as LocationState;
  const zoneId = state?.zoneId;
  const spotId = state?.spotId;
  const startDate = state?.startDate ? new Date(state.startDate) : undefined;
  const endDate = state?.endDate ? new Date(state.endDate) : undefined;

  // Check if required data is present
  if (!zoneId || !spotId || !startDate || !endDate) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-medium mb-4">ไม่พบข้อมูลการจอง</h1>
          <Button onClick={() => navigate('/zones')}>
            ไปที่หน้าโซนกางเต๊นท์
          </Button>
        </div>
      </div>
    );
  }

  const zone = mockZones[zoneId];
  const spot = getSpotByIdForZone(zoneId, spotId);
  const dateRange: DateRange = { from: startDate, to: endDate };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "การจองสำเร็จ",
        description: "เราได้รับข้อมูลการจองของคุณแล้ว คุณจะได้รับอีเมลยืนยันการจองเร็วๆ นี้",
      });
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-16">
          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-camping-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-camping-green" />
              </div>
              <CardTitle className="text-2xl">การจองสำเร็จ!</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-2">
              <p>
                ขอบคุณที่เลือกใช้บริการของเรา คุณจะได้รับอีเมลยืนยันการจองเร็วๆ นี้
              </p>
              <p className="text-muted-foreground">
                รหัสการจอง: {Math.random().toString(36).substring(2, 10).toUpperCase()}
              </p>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button 
                className="w-full rounded-full" 
                onClick={() => navigate('/')}
              >
                กลับสู่หน้าหลัก
              </Button>
              <Button 
                variant="outline" 
                className="w-full rounded-full"
                onClick={() => navigate('/bookings')}
              >
                ดูการจองของฉัน
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        <Button 
          variant="ghost" 
          className="mb-8" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          ย้อนกลับ
        </Button>
        
        <h1 className="text-3xl font-medium mb-8">ยืนยันการจอง</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>ข้อมูลผู้จอง</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">ชื่อ-นามสกุล</Label>
                      <Input 
                        id="fullName" 
                        name="fullName" 
                        value={formData.fullName} 
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
                    
                    <div className="space-y-2">
                      <Label htmlFor="guests">จำนวนผู้เข้าพัก</Label>
                      <Select 
                        defaultValue={formData.guests} 
                        onValueChange={(value) => handleSelectChange('guests', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="เลือกจำนวนผู้เข้าพัก" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 10 }, (_, i) => (
                            <SelectItem key={i + 1} value={(i + 1).toString()}>
                              {i + 1} คน
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="notes">หมายเหตุเพิ่มเติม (ถ้ามี)</Label>
                      <Textarea 
                        id="notes" 
                        name="notes" 
                        value={formData.notes} 
                        onChange={handleInputChange} 
                        rows={4} 
                      />
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="space-y-4">
                    <div className="text-lg font-medium">ข้อกำหนดและเงื่อนไข</div>
                    <div className="text-sm text-muted-foreground">
                      <ul className="space-y-2">
                        <li>• สามารถยกเลิกการจองได้ก่อน 7 วันโดยไม่มีค่าใช้จ่าย</li>
                        <li>• เช็คอินเวลา 14:00 น. และเช็คเอาท์เวลา 12:00 น.</li>
                        <li>• ไม่อนุญาตให้นำสัตว์เลี้ยงเข้ามาในพื้นที่</li>
                        <li>• กรุณาเก็บขยะและรักษาความสะอาด</li>
                        <li>• ห้ามส่งเสียงดังรบกวนหลัง 22:00 น.</li>
                      </ul>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <input 
                        type="checkbox" 
                        id="terms" 
                        className="mt-1"
                        required 
                      />
                      <Label htmlFor="terms" className="font-normal">
                        ฉันยอมรับข้อกำหนดและเงื่อนไขการใช้บริการ
                      </Label>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button 
                      type="submit" 
                      className="w-full rounded-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'กำลังดำเนินการ...' : 'ยืนยันการจอง'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <div className="sticky top-24">
              <ReservationSummary 
                zone={zone}
                spot={spot}
                dateRange={dateRange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
