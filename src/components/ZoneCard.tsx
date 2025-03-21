
import React from 'react';
import Link from 'next/link';
import { MapPin, Users, ArrowRight } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CampingZone } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ZoneCardProps {
  zone: CampingZone;
  className?: string;
}

const ZoneCard: React.FC<ZoneCardProps> = ({ zone, className }) => {
  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-500 group hover:shadow-xl border-0", 
      className
    )}>
      <div className="relative overflow-hidden aspect-[16/9]">
        <img 
          src={zone.image} 
          alt={zone.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <Badge className="bg-camping-green/90 hover:bg-camping-green text-white">
            {zone.pricePerNight.toLocaleString()} บาท/คืน
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-5">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-camping-stone-dark text-sm mb-2">
            <MapPin className="h-4 w-4" />
            <span>โซน {zone.name}</span>
          </div>
          
          <h3 className="font-medium text-xl">{zone.name}</h3>
          
          <p className="text-muted-foreground line-clamp-2 text-sm">
            {zone.description}
          </p>
          
          <div className="flex items-center gap-2 text-camping-stone-dark text-sm pt-2">
            <Users className="h-4 w-4" />
            <span>ความจุสูงสุด {zone.capacity} คน</span>
          </div>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-2">
          {zone.amenities.slice(0, 3).map((amenity, index) => (
            <Badge variant="secondary" key={index} className="font-normal">
              {amenity}
            </Badge>
          ))}
          {zone.amenities.length > 3 && (
            <Badge variant="outline" className="font-normal">
              +{zone.amenities.length - 3} อื่นๆ
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-5 pt-0">
        <Button asChild className="w-full mt-2 rounded-full group">
          <Link href={`/zones/${zone.id}`} className="flex items-center justify-center gap-2">
            <span>ดูรายละเอียด</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ZoneCard;
