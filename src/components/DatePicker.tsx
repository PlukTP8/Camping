
import * as React from "react";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

interface DatePickerProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  className?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  dateRange,
  onDateRangeChange,
  className,
}) => {
  const { toast } = useToast();

  const handleSelectDate = (selected: DateRange) => {
    console.log("Calendar selected:", selected);
    onDateRangeChange({
      from: selected?.from,
      to: selected?.to,
    });
    
    if (selected.from && selected.to) {
      toast({
        title: "เลือกวันที่แล้ว",
        description: `วันที่: ${format(selected.from, "P", { locale: th })} - ${format(selected.to, "P", { locale: th })}`,
      });
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !dateRange.from && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "P", { locale: th })} -{" "}
                  {format(dateRange.to, "P", { locale: th })}
                </>
              ) : (
                format(dateRange.from, "P", { locale: th })
              )
            ) : (
              <span>เลือกวันที่</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange.from || new Date()}
            selected={{ 
              from: dateRange.from, 
              to: dateRange.to 
            }}
            onSelect={handleSelectDate}
            numberOfMonths={2}
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
