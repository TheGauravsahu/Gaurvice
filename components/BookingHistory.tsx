import Image from "next/image";
import React from "react";

const BookingHistory = ({ bookings }: { bookings: any }) => {
  return (
    <div className="flex flex-col mt-4 gap-4">
      {bookings.map((item: any, index: any) => (
        <div
          key={index}
          className="shadow-sm border w-full h-[170px] mx-auto rounded-lg overflow-hidden flex items=center  gap-4"
        >
          <div>
            <Image
              src={item.businessList.images[0].url}
              alt={item.businessList.name}
              width={200}
              height={400}
              className="rounded-lg w-fit object-cover"
            />
          </div>

          <div className="p-4">
            <h2 className="font-semibold text-2xl mb-4">Details</h2>
            <hr />
            <h2 className="font-medium text-lg mt-2">{item.businessList.name}</h2>
            <p>{item.businessList.address}</p>
          </div>
          <div className="p-4">
            <h2 className="font-semibold text-2xl mb-4">Timings</h2>
            <hr />

            <p className="font-medium text-lg">{item.date}</p>
            <p>{item.time}</p>
          </div>
          <div className="p-4">
            <h2 className="font-semibold text-2xl mb-4">Contact</h2>
            <hr />

            <p className="font-medium text-lg mt-2">
              {item.businessList.contactPerson}
            </p>
            <p>{item.businessList.email}</p>
          </div>
          <div className="p-4">
            <h2 className="font-semibold text-2xl mb-4">Status</h2>
            <hr />

            <p className="capitalize font-medium text-lg mt-2">
              {item.bookingStatus}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingHistory;
