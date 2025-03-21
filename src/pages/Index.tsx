
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Tent, Calendar, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import ZoneCard from '@/components/ZoneCard';
import { CampingZone } from '@/lib/types';

// Mock data for initial development
const mockZones: CampingZone[] = [
  {
    id: '1',
    name: 'ริมธาร',
    description: 'โซนกางเต๊นท์ติดลำธาร เงียบสงบ เหมาะสำหรับการพักผ่อน ได้ยินเสียงน้ำไหลและธรรมชาติ',
    capacity: 20,
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1470&auto=format&fit=crop',
    amenities: ['ห้องน้ำ', 'จุดล้างจาน', 'จุดก่อไฟ', 'ที่จอดรถ'],
    pricePerNight: 300,
  },
  {
    id: '2',
    name: 'ลานดาว',
    description: 'โซนกางเต๊นท์บนเนินเขา วิวเปิดโล่ง เหมาะสำหรับการดูดาวและชมพระอาทิตย์ขึ้น',
    capacity: 15,
    image: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?q=80&w=1470&auto=format&fit=crop',
    amenities: ['ห้องน้ำ', 'จุดชมวิว', 'ระเบียงชมวิว', 'ที่จอดรถ'],
    pricePerNight: 350,
  },
  {
    id: '3',
    name: 'ป่าสน',
    description: 'โซนกางเต๊นท์ท่ามกลางป่าสน ร่มรื่น อากาศเย็นสบาย มีกลิ่นหอมของต้นสนตลอดทั้งวัน',
    capacity: 25,
    image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?q=80&w=1374&auto=format&fit=crop',
    amenities: ['ห้องน้ำ', 'อ่างล้างมือ', 'จุดปิ้งย่าง', 'ลานกิจกรรม', 'ที่จอดรถ'],
    pricePerNight: 400,
  },
];

const testimonials = [
  {
    id: 1,
    name: 'สมชาย ใจดี',
    text: 'บรรยากาศดีมาก ธรรมชาติสวยงาม เงียบสงบ เหมาะแก่การพักผ่อน',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 2,
    name: 'วิภา รักธรรมชาติ',
    text: 'ประทับใจมากค่ะ ที่พักสะอาด วิวสวย อากาศดี จะกลับมาอีกแน่นอน',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 3,
    name: 'นภดล ท่องเที่ยว',
    text: 'จุดกางเต๊นท์กว้างขวาง ไม่แออัด มีสิ่งอำนวยความสะดวกครบ',
    rating: 4,
    image: 'https://randomuser.me/api/portraits/men/63.jpg',
  },
];

const howItWorks = [
  {
    step: 1,
    title: 'เลือกโซนกางเต๊นท์',
    description: 'เลือกโซนที่ต้องการ จากหลากหลายพื้นที่ที่เรามีให้บริการ',
    icon: MapPin,
  },
  {
    step: 2,
    title: 'เลือกวันที่ต้องการ',
    description: 'เลือกวันที่เข้าพักและออกจากที่พัก แล้วดูความพร้อมให้บริการ',
    icon: Calendar,
  },
  {
    step: 3,
    title: 'เลือกจุดกางเต๊นท์',
    description: 'เลือกจุดกางเต๊นท์ที่เหมาะกับความต้องการของคุณ',
    icon: Tent,
  },
  {
    step: 4,
    title: 'ยืนยันการจอง',
    description: 'กรอกข้อมูลและยืนยันการจอง เพียงเท่านี้ก็พร้อมเที่ยว',
    icon: CheckCircle,
  },
];

const Index: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1532339142463-fd0a8979791a?q=80&w=1470&auto=format&fit=crop" 
            alt="Camping background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" />
        </div>
        
        <div className="container mx-auto px-4 z-10 pt-20">
          <div className="max-w-3xl mx-auto text-center text-white">
            <motion.span 
              className="inline-block py-1 px-3 mb-6 text-xs font-medium rounded-full bg-white/20 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              ยินดีต้อนรับสู่ลานกางเต๊นท์ของเรา
            </motion.span>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-semibold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              สัมผัสประสบการณ์การตั้งแคมป์กลางธรรมชาติ
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl mb-8 text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              จองลานกางเต๊นท์ในฝันของคุณ ท่ามกลางธรรมชาติที่งดงาม 
              พร้อมสิ่งอำนวยความสะดวกครบครัน
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button 
                size="lg" 
                className="rounded-full text-base" 
                asChild
              >
                <Link to="/zones">จองเลย</Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full text-base border-white/30 bg-white/10 hover:bg-white/20 text-white" 
                asChild
              >
                <Link to="#zones">ดูโซนกางเต๊นท์</Link>
              </Button>
            </motion.div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <motion.a 
            href="#zones" 
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ y: -5 }}
            whileTap={{ y: 0 }}
          >
            <ArrowRight className="h-5 w-5 rotate-90" />
          </motion.a>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-24 bg-camping-earth-light">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block py-1 px-3 mb-3 text-xs font-medium rounded-full bg-camping-earth">
              ขั้นตอนการจอง
            </span>
            <h2 className="text-3xl md:text-4xl font-medium mb-6">
              จองลานกางเต๊นท์ง่ายๆ เพียง 4 ขั้นตอน
            </h2>
            <p className="text-muted-foreground text-lg">
              เราทำให้การจองลานกางเต๊นท์เป็นเรื่องง่าย เพื่อให้คุณมีเวลาเตรียมตัวสำหรับการผจญภัย
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <motion.div 
                key={index}
                className="p-6 rounded-xl bg-white shadow-soft relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                  <item.icon className="h-6 w-6" />
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-medium">
                  {item.step}
                </div>
                <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Zones Section */}
      <section id="zones" className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block py-1 px-3 mb-3 text-xs font-medium rounded-full bg-camping-green-light">
              โซนกางเต๊นท์
            </span>
            <h2 className="text-3xl md:text-4xl font-medium mb-6">
              เลือกโซนกางเต๊นท์ที่เหมาะกับคุณ
            </h2>
            <p className="text-muted-foreground text-lg">
              เรามีโซนกางเต๊นท์หลากหลายให้เลือก ตามความชอบและความต้องการของคุณ
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockZones.map((zone, index) => (
              <motion.div
                key={zone.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ZoneCard zone={zone} />
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button 
              size="lg" 
              variant="outline" 
              className="rounded-full"
              asChild
            >
              <Link to="/zones" className="inline-flex items-center gap-2">
                <span>ดูโซนทั้งหมด</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-24 bg-camping-sky-light">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block py-1 px-3 mb-3 text-xs font-medium rounded-full bg-camping-sky">
              รีวิวจากลูกค้า
            </span>
            <h2 className="text-3xl md:text-4xl font-medium mb-6">
              ประสบการณ์จากผู้ใช้บริการ
            </h2>
            <p className="text-muted-foreground text-lg">
              เสียงตอบรับจากลูกค้าที่มีประสบการณ์ในการกางเต๊นท์กับเรา
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={testimonial.id}
                className="p-6 rounded-xl bg-white shadow-soft"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <div className="flex mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className={cn(
                          "text-yellow-500",
                          i >= testimonial.rating && "text-gray-300"
                        )}>
                          ★
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1496545672447-f699b503d270?q=80&w=1471&auto=format&fit=crop" 
            alt="CTA background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-medium mb-6">
              พร้อมที่จะออกเดินทางแล้วหรือยัง?
            </h2>
            <p className="text-lg mb-8 text-white/90">
              จองลานกางเต๊นท์ของคุณวันนี้ และเตรียมตัวให้พร้อมสำหรับการผจญภัยครั้งต่อไป
            </p>
            <Button 
              size="lg" 
              className="rounded-full text-base" 
              asChild
            >
              <Link to="/zones">จองเลย</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-camping-green-dark text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Tent className="h-6 w-6" />
                <span className="text-xl font-semibold">Camp Reservation</span>
              </div>
              <p className="text-white/80 mb-4">
                ระบบจองลานกางเต๊นท์ออนไลน์ที่ใช้งานง่าย 
                สะดวก รวดเร็ว
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-4">ลิงก์</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-white/80 hover:text-white">หน้าหลัก</Link></li>
                <li><Link to="/zones" className="text-white/80 hover:text-white">พื้นที่กางเต๊นท์</Link></li>
                <li><Link to="/bookings" className="text-white/80 hover:text-white">การจอง</Link></li>
                <li><Link to="/info" className="text-white/80 hover:text-white">ข้อมูล</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-4">ติดต่อ</h4>
              <ul className="space-y-2 text-white/80">
                <li>123 ถนนธรรมชาติ</li>
                <li>ตำบลสวย อำเภอสงบ</li>
                <li>จังหวัดเขียวขจี 10110</li>
                <li>โทร: 088-888-8888</li>
                <li>อีเมล: info@campreservation.com</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-4">ติดตามเรา</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <span className="sr-only">Facebook</span>
                  f
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <span className="sr-only">Instagram</span>
                  i
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <span className="sr-only">Twitter</span>
                  t
                </a>
              </div>
              <p className="mt-4 text-white/80">
                ติดตามข่าวสารและโปรโมชั่นล่าสุดได้ที่โซเชียลมีเดียของเรา
              </p>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60 text-sm">
            <p>&copy; {new Date().getFullYear()} Camp Reservation. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
