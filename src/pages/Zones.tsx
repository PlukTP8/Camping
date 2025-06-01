import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Tent } from 'lucide-react';
import { Link } from 'react-router-dom';

const zones = [
  {
    id: '1',
    name: 'โซน A - ริมธาร',
    description: 'พื้นที่กางเต๊นท์ติดริมน้ำ บรรยากาศร่มรื่น เหมาะสำหรับครอบครัว',
    capacity: '20 จุด',
    price: '฿500/คืน',
    features: ['ติดริมน้ำ', 'ร่มรื่น', 'เหมาะครอบครัว']
  },
  {
    id: '2', 
    name: 'โซน B - ลานดาว',
    description: 'พื้นที่กางเต๊นท์ในป่าไผ่ อากาศเย็นสบาย เงียบสงบ',
    capacity: '15 จุด',
    price: '฿400/คืน',
    features: ['ป่าไผ่', 'อากาศเย็น', 'เงียบสงบ']
  },
  {
    id: '3',
    name: 'โซน C - ป่าสน',
    description: 'พื้นที่กางเต๊นท์บนยอดเขา วิวสวย ดูดาวได้ชัดเจน',
    capacity: '10 จุด', 
    price: '฿600/คืน',
    features: ['วิวสวย', 'ดูดาว', 'ยอดเขา']
  }
];

const Zones: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-camping-earth-light to-camping-nature-light">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-camping-earth-dark mb-4">
              พื้นที่กางเต๊นท์
            </h1>
            <p className="text-lg text-camping-earth-dark/80 max-w-2xl mx-auto">
              เลือกโซนที่ต้องการสำหรับการกางเต๊นท์ แต่ละโซนมีเอกลักษณ์และบรรยากาศที่แตกต่างกัน
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {zones.map((zone, index) => (
              <motion.div
                key={zone.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Tent className="h-5 w-5 text-camping-earth-dark" />
                      {zone.name}
                    </CardTitle>
                    <CardDescription>{zone.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-camping-earth-dark" />
                        <span className="text-sm">{zone.capacity}</span>
                      </div>
                      <div className="text-lg font-semibold text-camping-earth-dark">
                        {zone.price}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {zone.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-camping-nature-light text-camping-earth-dark text-xs rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <Button asChild className="w-full">
                      <Link to={`/zones/${zone.id}`}>
                        <MapPin className="h-4 w-4 mr-2" />
                        ดูรายละเอียด
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Zones;