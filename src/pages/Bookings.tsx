
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, Users, Eye, CreditCard } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const mockBookings = [
  {
    id: '1',
    zoneName: 'โซน A - ริมน้ำ',
    spotName: 'จุดกางเต๊นท์ A-1',
    checkIn: '2024-06-15',
    checkOut: '2024-06-17',
    guests: 4,
    status: 'confirmed',
    total: '฿1,000'
  },
  {
    id: '2', 
    zoneName: 'โซน B - ป่าไผ่',
    spotName: 'จุดกางเต๊นท์ B-3',
    checkIn: '2024-07-01',
    checkOut: '2024-07-02',
    guests: 2,
    status: 'pending',
    total: '฿400'
  }
];

const Bookings: React.FC = () => {
  const [selectedBooking, setSelectedBooking] = useState<typeof mockBookings[0] | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleViewDetails = (booking: typeof mockBookings[0]) => {
    setSelectedBooking(booking);
  };

  const handlePayment = (booking: typeof mockBookings[0]) => {
    // Navigate to payment page with booking details
    const params = new URLSearchParams({
      bookingId: booking.id,
      amount: booking.total,
      spotName: booking.spotName,
    });
    
    navigate(`/payment?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-camping-earth-light to-camping-nature-light">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-camping-earth-dark mb-4">
              การจองของฉัน
            </h1>
            <p className="text-lg text-camping-earth-dark/80">
              ดูและจัดการการจองพื้นที่กางเต๊นท์ของคุณ
            </p>
          </motion.div>

          <div className="space-y-6">
            {mockBookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-camping-earth-dark" />
                          {booking.zoneName}
                        </CardTitle>
                        <CardDescription>{booking.spotName}</CardDescription>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status === 'confirmed' ? 'ยืนยันแล้ว' : 'รอยืนยัน'}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-camping-earth-dark" />
                        <div>
                          <div className="text-sm font-medium">เช็คอิน</div>
                          <div className="text-sm text-muted-foreground">{booking.checkIn}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-camping-earth-dark" />
                        <div>
                          <div className="text-sm font-medium">เช็คเอาท์</div>
                          <div className="text-sm text-muted-foreground">{booking.checkOut}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-camping-earth-dark" />
                        <div>
                          <div className="text-sm font-medium">จำนวนคน</div>
                          <div className="text-sm text-muted-foreground">{booking.guests} คน</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-4 border-t">
                      <div className="text-lg font-semibold text-camping-earth-dark">
                        รวม {booking.total}
                      </div>
                      <div className="space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => handleViewDetails(booking)}>
                              <Eye className="h-4 w-4 mr-1" />
                              ดูรายละเอียด
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>รายละเอียดการจอง</DialogTitle>
                              <DialogDescription>
                                ข้อมูลการจองพื้นที่กางเต๊นท์
                              </DialogDescription>
                            </DialogHeader>
                            {selectedBooking && (
                              <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4 text-camping-earth-dark" />
                                  <span className="font-medium">{selectedBooking.zoneName}</span>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {selectedBooking.spotName}
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <div className="font-medium">วันเช็คอิน</div>
                                    <div className="text-muted-foreground">{selectedBooking.checkIn}</div>
                                  </div>
                                  <div>
                                    <div className="font-medium">วันเช็คเอาท์</div>
                                    <div className="text-muted-foreground">{selectedBooking.checkOut}</div>
                                  </div>
                                  <div>
                                    <div className="font-medium">จำนวนผู้เข้าพัก</div>
                                    <div className="text-muted-foreground">{selectedBooking.guests} คน</div>
                                  </div>
                                  <div>
                                    <div className="font-medium">สถานะ</div>
                                    <div className={`text-xs px-2 py-1 rounded-full inline-block ${
                                      selectedBooking.status === 'confirmed' 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                      {selectedBooking.status === 'confirmed' ? 'ยืนยันแล้ว' : 'รอยืนยัน'}
                                    </div>
                                  </div>
                                </div>
                                <div className="pt-4 border-t">
                                  <div className="flex justify-between items-center">
                                    <span className="font-medium">ราคารวม</span>
                                    <span className="text-lg font-semibold text-camping-earth-dark">
                                      {selectedBooking.total}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        {booking.status === 'pending' && (
                          <Button size="sm" onClick={() => handlePayment(booking)}>
                            <CreditCard className="h-4 w-4 mr-1" />
                            ชำระเงิน
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {mockBookings.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="text-muted-foreground mb-4">
                  ยังไม่มีการจอง
                </div>
                <Button>
                  เริ่มจองเลย
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Bookings;