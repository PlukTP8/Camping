import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-camping-earth-light to-camping-nature-light">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-camping-earth-dark mb-4">
              ติดต่อเรา
            </h1>
            <p className="text-lg text-camping-earth-dark/80">
              มีคำถามหรือต้องการข้อมูลเพิ่มเติม? ติดต่อเราได้ทุกช่องทาง
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle>ข้อมูลติดต่อ</CardTitle>
                  <CardDescription>ช่องทางการติดต่อต่างๆ</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-camping-earth-dark" />
                    <div>
                      <div className="font-medium">โทรศัพท์</div>
                      <div className="text-sm text-muted-foreground">032-123-456</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-camping-earth-dark" />
                    <div>
                      <div className="font-medium">อีเมล</div>
                      <div className="text-sm text-muted-foreground">info@campreservation.com</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-camping-earth-dark mt-1" />
                    <div>
                      <div className="font-medium">ที่อยู่</div>
                      <div className="text-sm text-muted-foreground">
                        123 หมู่ 4 ตำบลป่าแก้ว<br />
                        อำเภอแก่งกระจาน จังหวัดเพชรบุรี 76170
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-camping-earth-dark" />
                    <div>
                      <div className="font-medium">เวลาทำการ</div>
                      <div className="text-sm text-muted-foreground">
                        ทุกวัน 08:00 - 20:00 น.
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>ติดตามเราได้ที่</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <Button variant="outline" size="icon">
                      <Facebook className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Instagram className="h-4 w-4" />
                    </Button>
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
                  <CardTitle>ส่งข้อความถึงเรา</CardTitle>
                  <CardDescription>กรอกแบบฟอร์มด้านล่างเพื่อส่งข้อความ</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">ชื่อ</label>
                        <Input placeholder="กรอกชื่อของคุณ" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">นามสกุล</label>
                        <Input placeholder="กรอกนามสกุลของคุณ" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">อีเมล</label>
                      <Input type="email" placeholder="กรอกอีเมลของคุณ" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">โทรศัพท์</label>
                      <Input placeholder="กรอกเบอร์โทรศัพท์" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">หัวข้อ</label>
                      <Input placeholder="หัวข้อเรื่องที่ต้องการสอบถาม" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">ข้อความ</label>
                      <Textarea 
                        placeholder="กรอกข้อความที่ต้องการสอบถาม"
                        rows={4}
                      />
                    </div>
                    <Button className="w-full">
                      ส่งข้อความ
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;