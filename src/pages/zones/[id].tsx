
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { ArrowLeft, Star, Users, Tent, Wifi, Flame, DropletHalf2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CampingZone, CampingSpot, DateRange } from '@/lib/types';
import SpotSelector from '@/components/SpotSelector';
import DatePicker from '@/components/DatePicker';
import ReservationSummary from '@/components/ReservationSummary';

// Mock data - in a real app, you would fetch this from your API
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params || {};

  // Mock data for demonstration
  const zone: CampingZone = {
    id: id as string,
    name: "A1",
    description: "พื้นที่ติดลำธาร บรรยากาศร่มรื่น เหมาะสำหรับครอบครัวและกลุ่มเพื่อน",
    capacity: 20,
    image: "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9",
    amenities: ["น้ำดื่ม", "ห้องน้ำ", "จุดก่อไฟ", "Wi-Fi", "ที่จอดรถ"],
    pricePerNight: 500
  };

  const spots: CampingSpot[] = [
    {
      id: "1",
      zoneId: id as string,
      name: "A1-1",
      size: "small",
      status: "available",
      location: { x: 10, y: 10 }
    },
    {
      id: "2",
      zoneId: id as string,
      name: "A1-2",
      size: "medium",
      status: "available",
      location: { x: 30, y: 10 }
    },
    {
      id: "3",
      zoneId: id as string,
      name: "A1-3",
      size: "large",
      status: "occupied",
      location: { x: 50, y: 10 }
    }
  ];

  return {
    props: {
      zone,
      spots
    }
  };
};

interface ZoneDetailsProps {
  zone: CampingZone;
  spots: CampingSpot[];
}

const ZoneDetails: React.FC<ZoneDetailsProps> = ({ zone, spots }) => {
  const router = useRouter();
  const [selectedSpot, setSelectedSpot] = useState<CampingSpot | undefined>();
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined
  });

  const handleSpotSelect = (spot: CampingSpot) => {
    setSelectedSpot(spot);
  };

  const handleDateRangeChange = (range: DateRange) => {
    setDateRange(range);
  };

  const handleConfirmBooking = () => {
    if (selectedSpot && dateRange.from && dateRange.to) {
      router.push({
        pathname: '/booking',
        query: {
          zoneId: zone.id,
          spotId: selectedSpot.id,
          startDate: dateRange.from.toISOString(),
          endDate: dateRange.to.toISOString()
        }
      });
    }
  };

  const amenityIcons: Record<string, React.ReactNode> = {
    "Wi-Fi": <Wifi className="h-4 w-4" />,
    "จุดก่อไฟ": <Flame className="h-4 w-4" />,
    "น้ำดื่ม": <DropletHalf2 className="h-4 w-4" />,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="container mx-auto max-w-7xl px-4 py-8 mt-16">
        {/* Back button */}
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/" className="inline-flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            กลับไปยังหน้าหลัก
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Zone image and info */}
            <Card className="overflow-hidden border-0 shadow-soft">
              <div className="relative aspect-video">
                <img 
                  src={zone.image} 
                  alt={zone.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-3xl font-bold">โซน {zone.name}</h1>
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">4.8</span>
                    <span className="text-muted-foreground">(24 รีวิว)</span>
                  </div>
                </div>
                
                <p className="text-lg mb-4">{zone.description}</p>
                
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-camping-stone-dark" />
                    <span>รองรับได้สูงสุด {zone.capacity} คน</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tent className="h-5 w-5 text-camping-green-dark" />
                    <span>{spots.filter(s => s.status === "available").length} จุดกางเต๊นท์ว่าง</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <h3 className="text-lg font-medium mb-3">สิ่งอำนวยความสะดวก</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {zone.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {amenityIcons[amenity] || <div className="w-4 h-4 rounded-full bg-camping-green" />}
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
            
            {/* Spot selection */}
            <Tabs defaultValue="spots" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="spots" className="flex-1">จุดกางเต๊นท์</TabsTrigger>
                <TabsTrigger value="reviews" className="flex-1">รีวิว</TabsTrigger>
                <TabsTrigger value="info" className="flex-1">ข้อมูลเพิ่มเติม</TabsTrigger>
              </TabsList>
              
              <TabsContent value="spots" className="mt-4">
                <Card className="border shadow-soft p-5">
                  <SpotSelector 
                    zone={zone}
                    spots={spots}
                    selectedSpotId={selectedSpot?.id}
                    onSpotSelect={handleSpotSelect}
                  />
                  
                  <Separator className="my-6" />
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-medium mb-2">เลือกวันที่เข้าพัก</h3>
                    <DatePicker 
                      dateRange={dateRange}
                      onDateRangeChange={handleDateRangeChange}
                    />
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-4">
                <Card className="border shadow-soft p-5">
                  <h3 className="text-lg font-medium mb-4">รีวิวจากผู้เข้าพัก</h3>
                  <p className="text-muted-foreground">ยังไม่มีรีวิวสำหรับโซนนี้</p>
                </Card>
              </TabsContent>
              
              <TabsContent value="info" className="mt-4">
                <Card className="border shadow-soft p-5">
                  <h3 className="text-lg font-medium mb-4">ข้อมูลเพิ่มเติม</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">กฎระเบียบ</h4>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-2">
                        <li>เช็คอิน: 14:00 น. - 18:00 น.</li>
                        <li>เช็คเอาท์: ก่อน 12:00 น.</li>
                        <li>ห้ามส่งเสียงดังหลัง 22:00 น.</li>
                        <li>ห้ามนำสัตว์เลี้ยงเข้ามาในพื้นที่</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium">นโยบายการยกเลิก</h4>
                      <p className="text-muted-foreground mt-2">
                        สามารถยกเลิกได้ฟรีก่อนวันเข้าพัก 7 วัน หลังจากนั้นจะคืนเงิน 50% ของค่าจอง
                      </p>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <ReservationSummary 
              zone={zone}
              spot={selectedSpot}
              dateRange={dateRange}
              onConfirm={handleConfirmBooking}
              className="sticky top-24"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ZoneDetails;
