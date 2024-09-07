import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import api from "@/app/_services/GlobalApi";
import { useUser } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";
import moment from "moment";

type propsType = {
  businessId: string;
  children: React.ReactNode;
};

const BookService = ({ children, businessId }: propsType) => {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [bookedSlot, setBookedSlot] = useState([]);

  const user: any = useUser();
  const { toast } = useToast();

  useEffect(() => {
    getTime();
  }, []);

  useEffect(() => {
    date && isBusinessBooked();
  });

  const getTime = () => {
    const timeList: any = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({
        time: i + ":00 AM",
      });
      timeList.push({
        time: i + ":30 AM",
      });
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({
        time: i + ":00 PM",
      });
      timeList.push({
        time: i + ":30 PM",
      });
    }

    setTimeSlot(timeList);
  };

  const isBusinessBooked = async () => {
    const res: any = await api.isBookedSlot(
      businessId,
      moment(date).format("DD-MM-YYYY")
    );
    console.log(res);
    setBookedSlot(res.bookings);
    console.log(bookedSlot);
    return res;
  };

  const isSlotBooked = (time: any) => {
    return bookedSlot.find((item: any) => item.time == time);
  };

  const saveBooking = () => {
    const res: any = api.createBooking(
      businessId,
      moment(date).format("DD-MM-YYYY"),
      selectedTime,
      user.user?.primaryEmailAddress?.emailAddress,
      user.user?.fullName
    );
    if (res) {
      toast({
        title: "Service Booked Succesfully !",
      });
    } else {
      toast({
        title: "Failed to Book the Service!",
      });
    }
    setDate(undefined);
    setSelectedTime(" ");
    return res;
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger>{children}</SheetTrigger>
        <SheetContent className="overflow-y-scroll">
          <SheetHeader>
            <SheetTitle>Book a Service.</SheetTitle>
            <SheetDescription>
              Select Date and Time slot to book a Service.
            </SheetDescription>

            {/* Date picker */}
            <div className="">
              <h2 className="font-medium">Select a Date</h2>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate} // Removed ":any"
                className="rounded-md border w-fit "
              />
            </div>

            {/* Time slot picker */}
            <h2 className="font-medium mb-1">Select Time slot</h2>
            <div className="grid grid-cols-3 gap-2">
              {timeSlot.map((time: any, index) => (
                <Button
                  onClick={() => setSelectedTime(time.time)}
                  className={`w-fit rounded-full hover:bg-primary 
                  hover:text-white hover:scale-110 
                  transition-all ease-in-out ${
                    selectedTime == time.time && "bg-primary text-white"
                  }`}
                  key={index}
                  variant="outline"
                  disabled={isSlotBooked(time.time)}
                >
                  {time.time}
                </Button>
              ))}
            </div>

            <SheetFooter className="my-4 flex flex-col lg:flex-row gap-4">
              <SheetClose asChild>
                <Button className="flex gap-1 items-center justify-center">
                  <X size={15} />
                  Cancel
                </Button>
              </SheetClose>

              <SheetClose asChild>
                <Button
                  disabled={!(selectedTime && date)}
                  onClick={() => saveBooking()}
                >
                  Book
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default BookService;
