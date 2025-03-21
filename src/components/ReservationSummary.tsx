
import React from 'react';
import { CampingZone, CampingSpot, DateRange } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Check, CalendarRange, Tent, MapPin } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import { th } from 'date-fns/locale';

interface ReservationSummaryProps {
  zone: CampingZone;
  spot?: CampingSpot;
  dateRange: DateRange;
  className?: string;
  onConfirm?: () => void;
  isDetailPage?: boolean;
}

const ReservationSummary: React.FC<ReservationSummaryProps> = ({
  zone,
  spot,
  dateRange,
  className,
  onConfirm,
  isDetailPage = false,
}) => {
  const nights = dateRange.from && dateRange.to
    ? Math.max(1, differenceInDays(dateRange.to, dateRange.from))
    : 0;
  
  const totalPrice = nights * zone.pricePerNight;
  const isComplete = !!spot && dateRange.from && dateRange.to;

  return (
    <Card className={cn("border shadow-soft", className)}>
      <CardHeader>
        <CardTitle>สรุปการจอง</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-camping-earth-dark mt-0.5" />
          <div>
            <h4 className="font-medium">โซน {zone.name}</h4>
            <p className="text-sm text-muted-foreground">{zone.description}</p>
          </div>
        </div>

        {spot && (
          <div className="flex items-start gap-3">
            <Tent className="h-5 w-5 text-camping-green-dark mt-0.5" />
            <div>
              <h4 className="font-medium">จุดกางเต๊นท์ {spot.name}</h4>
              <p className="text-sm text-muted-foreground">
                ขนาด: {spot.size === 'small' ? 'เล็ก' : spot.size === 'medium' ? 'กลาง' : 'ใหญ่'}
              </p>
            </div>
          </div>
        )}

        <div className="flex items-start gap-3">
          <CalendarRange className="h-5 w-5 text-camping-sky-dark mt-0.5" />
          <div>
            <h4 className="font-medium">วันที่เข้าพัก</h4>
            {dateRange.from && dateRange.to ? (
              <>
                <p className="text-sm">
                  {format(dateRange.from, 'PPP', { locale: th })}
                </p>
                <p className="text-sm">
                  ถึง {format(dateRange.to, 'PPP', { locale: th })}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  ระยะเวลา: {nights} คืน
                </p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">ยังไม่ได้เลือกวันที่</p>
            )}
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>ราคาต่อคืน</span>
            <span>{zone.pricePerNight.toLocaleString()} บาท</span>
          </div>
          <div className="flex justify-between">
            <span>จำนวนคืน</span>
            <span>{nights}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-medium text-lg">
            <span>ราคารวม</span>
            <span>{totalPrice.toLocaleString()} บาท</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {isDetailPage ? (
          <div className="w-full flex items-center justify-center gap-2 py-2 bg-camping-green/10 text-camping-green-dark rounded-md">
            <Check className="h-5 w-5" />
            <span>จองเรียบร้อยแล้ว</span>
          </div>
        ) : (
          <Button 
            onClick={onConfirm} 
            disabled={!isComplete} 
            className="w-full rounded-full"
          >
            {isComplete ? 'ยืนยันการจอง' : 'กรุณาเลือกจุดกางเต๊นท์และวันที่'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ReservationSummary;
