
import React, { useState } from 'react';
import { CampingZone, CampingSpot, SpotStatus } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Tent, AlertCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ZoneMapProps {
  zone: CampingZone;
  spots: CampingSpot[];
  onSpotSelect?: (spot: CampingSpot) => void;
  selectedSpotId?: string;
  className?: string;
}

const ZoneMap: React.FC<ZoneMapProps> = ({ 
  zone, 
  spots, 
  onSpotSelect, 
  selectedSpotId,
  className 
}) => {
  const [hoveredSpot, setHoveredSpot] = useState<string | null>(null);

  const getSpotColor = (status: SpotStatus, isSelected: boolean, isHovered: boolean) => {
    if (isSelected) return 'text-primary bg-primary/20 border-primary';
    if (isHovered) return 'text-primary/80 bg-primary/10 border-primary/80';
    
    switch (status) {
      case SpotStatus.Available:
        return 'text-camping-green border-camping-green/50 hover:border-camping-green';
      case SpotStatus.Occupied:
        return 'text-camping-stone-dark border-camping-stone/50 opacity-60';
      case SpotStatus.Maintenance:
        return 'text-destructive border-destructive/50';
      default:
        return 'text-camping-stone border-camping-stone/50';
    }
  };

  const getSpotSize = (size: string) => {
    switch (size) {
      case 'small': return 'w-14 h-14';
      case 'medium': return 'w-16 h-16';
      case 'large': return 'w-20 h-20';
      default: return 'w-14 h-14';
    }
  };

  const handleSpotClick = (spot: CampingSpot) => {
    if (spot.status === SpotStatus.Available && onSpotSelect) {
      console.log("Map spot clicked:", spot);
      onSpotSelect(spot);
    }
  };

  return (
    <div className={cn("relative border rounded-xl bg-camping-green-light/30 overflow-hidden", className)}>
      <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm">
        <h3 className="font-medium text-lg">แผนผังโซน {zone.name}</h3>
      </div>
      
      <div className="h-full min-h-[400px] md:min-h-[500px] w-full p-4 pt-16 relative">
        {/* Grid lines */}
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={`col-${i}`} className="border-r border-camping-green/10" />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={`row-${i}`} className="border-b border-camping-green/10" />
          ))}
        </div>
        
        {/* Map features like trees, lakes, etc */}
        <div className="absolute top-1/3 left-1/4 w-32 h-32 rounded-full bg-camping-sky-light/70 -z-0" />
        <div className="absolute bottom-1/4 right-1/5 w-24 h-24 rounded-full bg-camping-earth-light/60 -z-0" />
        
        {/* Camping spots */}
        <TooltipProvider>
          {spots.map((spot) => {
            const isSelected = selectedSpotId === spot.id;
            const isHovered = hoveredSpot === spot.id;
            const isDisabled = spot.status !== SpotStatus.Available;
            
            return (
              <Tooltip key={spot.id}>
                <TooltipTrigger asChild>
                  <button
                    className={cn(
                      "absolute flex flex-col items-center justify-center rounded-lg border-2 backdrop-blur-sm bg-white/30 transition-all duration-300 transform hover:scale-105",
                      getSpotSize(spot.size),
                      getSpotColor(spot.status, isSelected, isHovered),
                      isDisabled ? "cursor-not-allowed" : "cursor-pointer"
                    )}
                    style={{
                      left: `${spot.location.x}%`,
                      top: `${spot.location.y}%`,
                      transform: `translate(-50%, -50%) ${isSelected || isHovered ? 'scale(1.05)' : 'scale(1)'}`,
                      zIndex: isSelected || isHovered ? 10 : 1
                    }}
                    onClick={() => handleSpotClick(spot)}
                    onMouseEnter={() => setHoveredSpot(spot.id)}
                    onMouseLeave={() => setHoveredSpot(null)}
                    disabled={isDisabled}
                  >
                    {spot.status === SpotStatus.Maintenance ? (
                      <AlertCircle className="h-6 w-6" />
                    ) : (
                      <Tent className="h-6 w-6" />
                    )}
                    <span className="text-xs font-medium mt-1">{spot.name}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <div className="text-center">
                    <div className="font-medium">จุดกางเต๊นท์ {spot.name}</div>
                    <div className="text-xs capitalize">
                      ขนาด: {spot.size === 'small' ? 'เล็ก' : spot.size === 'medium' ? 'กลาง' : 'ใหญ่'}
                    </div>
                    <div className="text-xs">
                      สถานะ: {spot.status === SpotStatus.Available 
                        ? 'ว่าง' 
                        : spot.status === SpotStatus.Occupied 
                        ? 'ไม่ว่าง' 
                        : 'ปิดปรับปรุง'}
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
        
        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm">
          <div className="text-sm font-medium mb-1">สัญลักษณ์</div>
          <div className="flex flex-col gap-1 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-camping-green" />
              <span>ว่าง</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-camping-stone-dark" />
              <span>ไม่ว่าง</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <span>ปิดปรับปรุง</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZoneMap;
