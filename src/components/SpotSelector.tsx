
import React, { useState } from 'react';
import { CampingZone, CampingSpot } from '@/lib/types';
import { cn } from '@/lib/utils';
import ZoneMap from './ZoneMap';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, MapPin, Users, Square } from 'lucide-react';

interface SpotSelectorProps {
  zone: CampingZone;
  spots: CampingSpot[];
  selectedSpotId?: string;
  onSpotSelect: (spot: CampingSpot) => void;
  className?: string;
}

const SpotSelector: React.FC<SpotSelectorProps> = ({
  zone,
  spots,
  selectedSpotId,
  onSpotSelect,
  className,
}) => {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const availableSpots = spots.filter(spot => spot.status === 'available');

  const getSpotSizeText = (size: string) => {
    switch (size) {
      case 'small': return 'เล็ก (1-2 คน)';
      case 'medium': return 'กลาง (3-4 คน)';
      case 'large': return 'ใหญ่ (5-8 คน)';
      default: return size;
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">เลือกพื้นที่กางเต๊นท์</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'map' ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode('map')}
            className="rounded-full"
          >
            <MapPin className="h-4 w-4 mr-1" />
            แผนผัง
          </Button>
          <Button
            variant={viewMode === 'list' ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode('list')}
            className="rounded-full"
          >
            <Square className="h-4 w-4 mr-1" />
            รายการ
          </Button>
        </div>
      </div>

      {viewMode === 'map' ? (
        <ZoneMap
          zone={zone}
          spots={spots}
          selectedSpotId={selectedSpotId}
          onSpotSelect={onSpotSelect}
          className="w-full aspect-[4/3] md:aspect-[16/9] shadow-sm"
        />
      ) : (
        <ScrollArea className="h-[400px] border rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-3">
            {availableSpots.map((spot) => (
              <button
                key={spot.id}
                onClick={() => onSpotSelect(spot)}
                className={cn(
                  "flex flex-col p-3 rounded-lg border hover:border-primary transition-all duration-200",
                  selectedSpotId === spot.id
                    ? "bg-primary/10 border-primary ring-1 ring-primary"
                    : "bg-card hover:bg-accent/50"
                )}
              >
                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium">จุดกางเต๊นท์ {spot.name}</span>
                  {selectedSpotId === spot.id && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  ขนาด: {getSpotSizeText(spot.size)}
                </div>
                <div className="mt-2 flex items-center text-xs">
                  <MapPin className="h-3 w-3 mr-1 text-camping-earth-dark" />
                  <span>โซน {zone.name}</span>
                </div>
              </button>
            ))}
            {availableSpots.length === 0 && (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                ไม่พบจุดกางเต๊นท์ที่ว่างในขณะนี้
              </div>
            )}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default SpotSelector;
