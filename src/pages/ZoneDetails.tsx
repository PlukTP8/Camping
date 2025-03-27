
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Users, Calendar, Info, Camera, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Navbar from '@/components/Navbar';
import ZoneMap from '@/components/ZoneMap';
import DatePicker from '@/components/DatePicker';
import SpotSelector from '@/components/SpotSelector';
import ReservationSummary from '@/components/ReservationSummary';
import { CampingZone, CampingSpot, DateRange, SpotStatus, SpotSize } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

// Setup consistent camping spots
const getFixedCampingSpots = (zoneId: string): CampingSpot[] => {
  if (zoneId === '1') {
    return [
      {
        id: `${zoneId}-1`,
        zoneId,
        name: '1',
        size: SpotSize.Small,
        status: SpotStatus.Available,
        location: { x: 20, y: 30 }
      },
      {
        id: `${zoneId}-2`,
        zoneId,
        name: '2',
        size: SpotSize.Medium,
        status: SpotStatus.Available,
        location: { x: 35, y: 25 }
      },
      {
        id: `${zoneId}-3`,
        zoneId,
        name: '3',
        size: SpotSize.Large,
        status: SpotStatus.Available,
        location: { x: 50, y: 40 }
      },
      {
        id: `${zoneId}-4`,
        zoneId,
        name: '4',
        size: SpotSize.Small,
        status: SpotStatus.Occupied,
        location: { x: 65, y: 35 }
      },
      {
        id: `${zoneId}-5`,
        zoneId,
        name: '5',
        size: SpotSize.Medium,
        status: SpotStatus.Maintenance,
        location: { x: 80, y: 30 }
      },
      {
        id: `${zoneId}-6`,
        zoneId,
        name: '6',
        size: SpotSize.Small,
        status: SpotStatus.Available,
        location: { x: 25, y: 60 }
      },
      {
        id: `${zoneId}-7`,
        zoneId,
        name: '7',
        size: SpotSize.Medium,
        status: SpotStatus.Available,
        location: { x: 40, y: 70 }
      },
      {
        id: `${zoneId}-8`,
        zoneId,
        name: '8',
        size: SpotSize.Large,
        status: SpotStatus.Available,
        location: { x: 60, y: 65 }
      }
    ];
  } else if (zoneId === '2') {
    return [
      {
        id: `${zoneId}-1`,
        zoneId,
        name: '1',
        size: SpotSize.Small,
        status: SpotStatus.Available,
        location: { x: 15, y: 20 }
      },
      {
        id: `${zoneId}-2`,
        zoneId,
        name: '2',
        size: SpotSize.Medium,
        status: SpotStatus.Available,
        location: { x: 30, y: 30 }
      },
      {
        id: `${zoneId}-3`,
        zoneId,
        name: '3',
        size: SpotSize.Large,
        status: SpotStatus.Available,
        location: { x: 50, y: 20 }
      },
      {
        id: `${zoneId}-4`,
        zoneId,
        name: '4',
        size: SpotSize.Small,
        status: SpotStatus.Available,
        location: { x: 70, y: 25 }
      },
      {
        id: `${zoneId}-5`,
        zoneId,
        name: '5',
        size: SpotSize.Medium,
        status: SpotStatus.Occupied,
        location: { x: 20, y: 50 }
      },
      {
        id: `${zoneId}-6`,
        zoneId,
        name: '6',
        size: SpotSize.Small,
        status: SpotStatus.Available,
        location: { x: 40, y: 60 }
      },
      {
        id: `${zoneId}-7`,
        zoneId,
        name: '7',
        size: SpotSize.Medium,
        status: SpotStatus.Maintenance,
        location: { x: 60, y: 55 }
      },
      {
        id: `${zoneId}-8`,
        zoneId,
        name: '8',
        size: SpotSize.Large,
        status: SpotStatus.Available,
        location: { x: 80, y: 60 }
      }
    ];
  } else if (zoneId === '3') {
    return [
      {
        id: `${zoneId}-1`,
        zoneId,
        name: '1',
        size: SpotSize.Small,
        status: SpotStatus.Available,
        location: { x: 25, y: 15 }
      },
      {
        id: `${zoneId}-2`,
        zoneId,
        name: '2',
        size: SpotSize.Medium,
        status: SpotStatus.Available,
        location: { x: 45, y: 20 }
      },
      {
        id: `${zoneId}-3`,
        zoneId,
        name: '3',
        size: SpotSize.Large,
        status: SpotStatus.Occupied,
        location: { x: 65, y: 15 }
      },
      {
        id: `${zoneId}-4`,
        zoneId,
        name: '4',
        size: SpotSize.Small,
        status: SpotStatus.Available,
        location: { x: 20, y: 40 }
      },
      {
        id: `${zoneId}-5`,
        zoneId,
        name: '5',
        size: SpotSize.Medium,
        status: SpotStatus.Available,
        location: { x: 40, y: 45 }
      },
      {
        id: `${zoneId}-6`,
        zoneId,
        name: '6',
        size: SpotSize.Small,
        status: SpotStatus.Maintenance,
        location: { x: 60, y: 40 }
      },
      {
        id: `${zoneId}-7`,
        zoneId,
        name: '7',
        size: SpotSize.Medium,
        status: SpotStatus.Available,
        location: { x: 30, y: 65 }
      },
      {
        id: `${zoneId}-8`,
        zoneId,
        name: '8',
        size: SpotSize.Large,
        status: SpotStatus.Available,
        location: { x: 50, y: 70 }
      },
      {
        id: `${zoneId}-9`,
        zoneId,
        name: '9',
        size: SpotSize.Small,
        status: SpotStatus.Available,
        location: { x: 70, y: 65 }
      }
    ];
  } else {
    // Default spots for any other zone
    return [
      {
        id: `${zoneId}-1`,
        zoneId,
        name: '1',
        size: SpotSize.Small,
        status: SpotStatus.Available,
        location: { x: 30, y: 30 }
      },
      {
        id: `${zoneId}-2`,
        zoneId,
        name: '2',
        size: SpotSize.Medium,
        status: SpotStatus.Available,
        location: { x: 50, y: 50 }
      },
      {
        id: `${zoneId}-3`,
        zoneId,
        name: '3',
        size: SpotSize.Large,
        status: SpotStatus.Available,
        location: { x: 70, y: 30 }
      }
    ];
  }
};

const mockZones: Record<string, CampingZone> = {
  '1': {
    id: '1',
    name: 'ริมธาร',
    description: 'โซนกางเต๊นท์ติดลำธาร เงียบสงบ เหมาะสำหรับการพักผ่อน ได้ยินเสียงน้ำไหลและธรรมชาติ อากาศเย็นสบายตลอดทั้งวัน มีพื้นที่กว้างขวาง มีจุดชมวิวลำธารและจุดนั่งพักผ่อนหลายจุด',
    capacity: 20,
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1470&auto=format&fit=crop',
    amenities: ['ห้องน้ำ', 'จุดล้างจาน', 'จุดก่อไฟ', 'ที่จอดรถ', 'จุดชมวิว', 'แหล่งน้ำธรรมชาติ'],
    pricePerNight: 300,
  },
  '2': {
    id: '2',
    name: 'ลานดาว',
    description: 'โซนกางเต๊นท์บนเนินเขา วิวเปิดโล่ง เหมาะสำหรับการดูดาวและชมพระอาทิตย์ขึ้น วิวทิวทัศน์สวยงาม มองเห็นท้องฟ้าได้กว้าง เหมาะกับผู้ที่ชื่นชอบการถ่ายภาพท้องฟ้ายามค่ำคืนและดวงดาว',
    capacity: 15,
    image: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?q=80&w=1470&auto=format&fit=crop',
    amenities: ['ห้องน้ำ', 'จุดชมวิว', 'ระเบียงชมวิว', 'ที่จอดรถ', 'จุดถ่ายภาพ', 'จุดกางเต๊นท์ส่วนตัว'],
    pricePerNight: 350,
  },
  '3': {
    id: '3',
    name: 'ป่าสน',
    description: 'โซนกางเต๊นท์ท่ามกลางป่าสน ร่มรื่น อากาศเย็นสบาย มีกลิ่นหอมของต้นสนตลอดทั้งวัน รายล้อมด้วยต้นสนขนาดใหญ่ให้ร่มเงา เหมาะสำหรับผู้ที่ต้องการความเป็นส่วนตัวและชื่นชอบบรรยากาศป่าเขา',
    capacity: 25,
    image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?q=80&w=1374&auto=format&fit=crop',
    amenities: ['ห้องน้ำ', 'อ่างล้างมือ', 'จุดปิ้งย่าง', 'ลานกิจกรรม', 'ที่จอดรถ', 'เส้นทางเดินป่า', 'จุดชมวิว'],
    pricePerNight: 400,
  },
};

const mockPhotos = [
  'https://images.unsplash.com/photo-1455496231601-e6195da1f841?q=80&w=1470&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517824806704-9040b037703b?q=80&w=1470&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1510312305653-8ed496efae75?q=80&w=1374&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=1470&auto=format&fit=crop',
];

const ZoneDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSpot, setSelectedSpot] = useState<CampingSpot | undefined>(undefined);
  const [dateRange, setDateRange] = useState<DateRange>({ 
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 2)) 
  });
  const [spots, setSpots] = useState<CampingSpot[]>([]);

  const zone = id ? mockZones[id] : null;

  // Initialize spots with fixed positions based on zoneId
  useEffect(() => {
    if (id) {
      const fixedSpots = getFixedCampingSpots(id);
      console.log("Loading fixed spots for zone:", id, fixedSpots);
      setSpots(fixedSpots);
    }
  }, [id]);

  const handleSpotSelect = (spot: CampingSpot) => {
    console.log("Spot selected:", spot);
    setSelectedSpot(spot);
    if (activeTab !== 'book') {
      setActiveTab('book');
    }
  };

  const handleDateRangeChange = (range: DateRange) => {
    console.log("Date range changed:", range);
    setDateRange(range);
    if (range.from && range.to && activeTab !== 'book') {
      setActiveTab('book');
    }
  };

  const handleBookingConfirm = () => {
    if (selectedSpot && dateRange.from && dateRange.to) {
      toast({
        title: "กำลังดำเนินการจอง",
        description: "กำลังนำท่านไปยังหน้าจองที่พัก"
      });
      
      navigate('/booking', { 
        state: { 
          zoneId: zone?.id,
          spotId: selectedSpot.id,
          startDate: dateRange.from,
          endDate: dateRange.to 
        } 
      });
    } else {
      toast({
        title: "ไม่สามารถดำเนินการต่อได้",
        description: !selectedSpot 
          ? "กรุณาเลือกจุดกางเต๊นท์" 
          : "กรุณาเลือกวันที่เข้าพัก",
        variant: "destructive"
      });
    }
  };

  if (!zone) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-medium mb-4">ไม่พบข้อมูลโซนกางเต๊นท์</h1>
          <Button onClick={() => navigate('/zones')}>
            กลับไปหน้าโซนกางเต๊นท์
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="relative h-[50vh] pt-16">
        <div className="absolute inset-0">
          <img 
            src={zone.image} 
            alt={zone.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-xs" />
        </div>
        
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-end p-8">
          <div className="container mx-auto">
            <Button 
              variant="ghost" 
              className="mb-4 text-white hover:bg-white/20 hover:text-white" 
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              ย้อนกลับ
            </Button>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-3 bg-camping-green/90 hover:bg-camping-green text-white">
                {zone.pricePerNight.toLocaleString()} บาท/คืน
              </Badge>
              <h1 className="text-4xl font-semibold text-white mb-2">โซน{zone.name}</h1>
              <div className="flex items-center text-white/90 gap-6">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>โซนกางเต๊นท์</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>ความจุสูงสุด {zone.capacity} คน</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span>4.8 (24 รีวิว)</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center border-b mb-6">
            <TabsList className="mb-2">
              <TabsTrigger value="overview" className="text-base">ภาพรวม</TabsTrigger>
              <TabsTrigger value="book" className="text-base">จองพื้นที่</TabsTrigger>
              <TabsTrigger value="photos" className="text-base">รูปภาพ</TabsTrigger>
            </TabsList>
            
            <Button 
              className="hidden md:flex" 
              onClick={() => setActiveTab('book')}
            >
              จองเลย
            </Button>
          </div>
          
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="space-y-4">
                  <h2 className="text-2xl font-medium">รายละเอียด</h2>
                  <p className="text-muted-foreground">{zone.description}</p>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h2 className="text-2xl font-medium">สิ่งอำนวยความสะดวก</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {zone.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-camping-green-light/50 flex items-center justify-center text-camping-green-dark">
                          <Check className="h-3 w-3" />
                        </div>
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h2 className="text-2xl font-medium">แผนผังโซน</h2>
                  <ZoneMap 
                    zone={zone} 
                    spots={spots} 
                    className="w-full aspect-video rounded-xl shadow-sm"
                  />
                </div>
              </div>
              
              <div>
                <div className="sticky top-24">
                  <ReservationSummary 
                    zone={zone}
                    dateRange={dateRange}
                    className="mb-6"
                  />
                  
                  <div className="bg-camping-green-light/30 rounded-xl p-6 border">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-camping-green-light flex items-center justify-center text-camping-green-dark">
                        <Info className="h-5 w-5" />
                      </div>
                      <h3 className="font-medium text-lg">ข้อมูลการจอง</h3>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li>• เช็คอิน: 14:00 น.</li>
                      <li>• เช็คเอาท์: 12:00 น.</li>
                      <li>• ไม่อนุญาตให้นำสัตว์เลี้ยงเข้ามาในพื้นที่</li>
                      <li>• กรุณาเก็บขยะและรักษาความสะอาด</li>
                      <li>• ห้ามส่งเสียงดังรบกวนหลัง 22:00 น.</li>
                      <li>• สามารถยกเลิกการจองได้ก่อน 7 วัน</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="book" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="space-y-4">
                  <h2 className="text-2xl font-medium">เลือกวันที่</h2>
                  <DatePicker 
                    dateRange={dateRange}
                    onDateRangeChange={handleDateRangeChange}
                    className="max-w-md"
                  />
                </div>
                
                <Separator />
                
                <SpotSelector 
                  zone={zone}
                  spots={spots}
                  selectedSpotId={selectedSpot?.id}
                  onSpotSelect={handleSpotSelect}
                />
              </div>
              
              <div>
                <div className="sticky top-24">
                  <ReservationSummary 
                    zone={zone}
                    spot={selectedSpot}
                    dateRange={dateRange}
                    onConfirm={handleBookingConfirm}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="photos" className="mt-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-medium">รูปภาพ</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="col-span-full">
                  <img 
                    src={zone.image} 
                    alt={zone.name} 
                    className="rounded-xl w-full aspect-video object-cover"
                  />
                </div>
                {mockPhotos.map((photo, index) => (
                  <img 
                    key={index}
                    src={photo} 
                    alt={`${zone.name} ${index + 1}`} 
                    className="rounded-xl w-full aspect-square object-cover"
                  />
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const Check: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="4" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

export default ZoneDetails;
