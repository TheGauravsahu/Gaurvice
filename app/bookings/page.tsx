"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingHistory from "@/components/BookingHistory";
import api from "../_services/GlobalApi";
import { useUser } from "@clerk/nextjs";

const Bookings = () => {
  const user:any = useUser();
  const [bookings, setBookings] = useState([]);
  
  useEffect(() => {
    if (user) {
      const getBookingList = async () => {
        try {
          const res: any = await api.getBookingList(
            user.user?.primaryEmailAddress?.emailAddress
          );
          setBookings(res.bookings);
        } catch (error) {
          console.error("Error fetching bookings:", error);
        }
      };

      getBookingList();
    }
  }, [user]);

  // console.log(bookings)
  return (
    <div className="my-10 mx-auto min-w-screen">
      <h1 className="font-semibold text-3xl mb-2">My Bookings</h1>
      <Tabs defaultValue="booked" className="w-full">
        <TabsList className="w-full flex justify-start items-start px-2">
          <TabsTrigger value="booked">Bookings</TabsTrigger>
        </TabsList>
        <TabsContent value="booked">
          <BookingHistory bookings={bookings} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Bookings;
