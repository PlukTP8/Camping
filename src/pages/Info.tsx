import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, MapPin, Phone, Car, Utensils, Wifi, Shield } from 'lucide-react';

const Info: React.FC = () => {
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
              ข้อมูลและกฎระเบียบ
            </h1>
            <p className="text-lg text-camping-earth-dark/80">
              ข้อมูลสำคัญที่คุณควรทราบก่อนมาเที่ยว
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-camping-earth-dark" />
                    เวลาทำการ
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>เช็คอิน:</span>
                    <span>14:00 น.</span>
                  </div>
                  <div className="flex justify-between">
                    <span>เช็คเอาท์:</span>
                    <span>12:00 น.</span>
                  </div>
                  <div className="flex justify-between">
                    <span>เวลาทำการ:</span>
                    <span>08:00 - 20:00 น.</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-camping-earth-dark" />
                    ที่ตั้ง
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    123 หมู่ 4 ตำบลป่าแก้ว อำเภอแก่งกระจาน จังหวัดเพชรบุรี 76170
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm">032-123-456</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="md:col-span-2"
            >
              <Card>
                <CardHeader>
                  <CardTitle>สิ่งอำนวยความสะดวก</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <Car className="h-5 w-5 text-camping-earth-dark" />
                      <span className="text-sm">ที่จอดรถ</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Utensils className="h-5 w-5 text-camping-earth-dark" />
                      <span className="text-sm">ร้านอาหาร</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wifi className="h-5 w-5 text-camping-earth-dark" />
                      <span className="text-sm">WiFi ฟรี</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-camping-earth-dark" />
                      <span className="text-sm">รักษาความปลอดภัย</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="md:col-span-2"
            >
              <Card>
                <CardHeader>
                  <CardTitle>กฎระเบียบ</CardTitle>
                  <CardDescription>เพื่อความปลอดภัยและความสะดวกของทุกคน</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• ห้ามทำเสียงดังรบกวนผู้อื่น โดยเฉพาะช่วง 22:00 - 06:00 น.</li>
                    <li>• ห้ามนำสัตว์เลี้ยงเข้ามาในบริเวณ</li>
                    <li>• ห้ามจุดไฟในพื้นที่ที่กำหนด ยกเว้นเตาย่างที่จัดเตรียมให้</li>
                    <li>• กรุณาทิ้งขยะในถังที่จัดเตรียมไว้</li>
                    <li>• ห้ามสูบบุหรี่ในเต๊นท์และพื้นที่ป่า</li>
                    <li>• กรุณาดูแลทรัพย์สินส่วนตัวด้วยตนเอง</li>
                    <li>• เด็กต้องอยู่ในความดูแลของผู้ใหญ่ตลอดเวลา</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Info;