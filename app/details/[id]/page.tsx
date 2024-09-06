"use client";
import { useEffect, useState } from "react";
import api from "@/app/_services/GlobalApi";
import { BusinessType } from "@/types/type";
import Image from "next/image";
import { MapPin, Mail, Share, User, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import BookService from "@/components/BookService";

const BusinessDetails = ({ params }: { params: any }) => {
  const [business, setBusiness] = useState<BusinessType | null>(null);
  const [suggestedBusiness, setSuggestedBusiness] = useState<BusinessType[]>(
    []
  );

  const getBusiness = async () => {
    try {
      const res: any = await api.getBusinessDetails(params.id);
      setBusiness(res.businessList);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const getBusinessByCategory = async () => {
    if (business?.category.name) {
      try {
        const res: any = await api.getBusinessByCategory(
          business.category.name
        );
        setSuggestedBusiness(res.businessLists);
        return res;
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getBusiness();
  });

  useEffect(() => {
    if (business) {
      getBusinessByCategory();
    }
  },);


  return (
    <div>
      {business ? (
        <section className="lg:px-56 md:px-36">
          {/* Top */}
          <div className="min-h-60 w-full flex items-start lg:items-center flex-col gap-4 lg:flex-row p-2 justify-between">
            {/* top-left */}
            <div className="flex gap-8 items-center">
              <Image
                src={business?.images[0].url}
                width={400}
                height={400}
                alt={business?.name}
                className="rounded-full w-32 h-32 object-cover"
              />

              <div>
                <p className="bg-[#FFBCAB] rounded-full w-fit p-2 text-xs">
                  {business?.category.name}
                </p>
                <h1 className="font-semibold text-2xl">{business?.name}</h1>
                <p className="flex my-2 mt-1 items-center gap-1 text-slate-400 text-sm">
                  <MapPin size={15} />
                  {business?.address}
                </p>
                <p className="flex items-center gap-1 text-slate-400 text-sm">
                  <Mail size={15} />
                  {business?.email}
                </p>
                <p className="lg:hidden flex items-center gap-1 capitalize">
                  <User size={15} />
                  {business?.contactPerson}
                </p>
              </div>
            </div>

            {/* top-right */}
            <div className="hidden lg:flex flex-col items-end gap-4">
              <Button className="">
                <Share size={20} className="text-white text-right" />
              </Button>
              <p className="flex items-center gap-1 capitalize">
                <User size={15} />
                {business?.contactPerson}
              </p>
            </div>
          </div>

          {/* bottom */}
          <div className="flex item-satrt gap-6 flex-col lg:flex-row">
            <div>
              <h2 className="font-semibold text-xl mb-2">Description</h2>
              <p>{business?.about}</p>

              <h2 className="font-semibold text-xl mb-2 mt-8">Gallery</h2>
              <div className="flex items-center gap-4 ">
                {business?.images.map((image, index) => (
                  <div key={index} className="flex gap-2">
                    <Image
                      src={image.url}
                      width={600}
                      height={600}
                      alt={business?.name}
                      className="rounded-lg w-32 h-32 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* service booking modal */}
            <div className="w-1/2 flex flex-col items-start lg:items-end">
              <BookService businessId={params.id}>
                <Button className="flex items-center  gap-2">
                  <ExternalLink size={20} />
                  Book Service
                </Button>
              </BookService>

              <br />
              <h2 className="font-semibold text-lg my-2">Similar Businesses</h2>
              <div className="flex gap-6 flex-row lg:flex-col">
                {suggestedBusiness.length > 0 &&
                  suggestedBusiness.map((business, index) => (
                    <Link key={index} href={`/details/${business.id}`}>
                      <div className="flex gap-2 lg:gap-4 w-64 items-center border p-1">
                        <Image
                          src={business.images[0].url}
                          width={100}
                          height={100}
                          alt={business.name}
                          className="rounded-lg w-24 h-24 object-cover"
                        />
                        <div className="mt-1">
                          <p>{business.name}</p>
                          <p className="flex items-center gap-1 text-xs  capitalize">
                            <User size={15} />
                            {business?.contactPerson}
                          </p>
                          <p className="flex my-2 mt-1 items-center gap-1 text-slate-400 text-xs">
                            <MapPin size={15} />
                            {business?.address}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="lg:px-56 md:px-36 flex gap-4 items-center justify-around">
          <div>
            <div className="flex items-center space-x-4">
              <Skeleton className="rounded-full w-32 h-32 object-cover" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="space-y-2 mt-16">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
            <div className="flex items-center space-x-4 mt-8">
              <Skeleton className="h-32 w-32 rounded-lg" />
              <Skeleton className="h-32 w-32 rounded-lg" />
              <Skeleton className="h-32 w-32 rounded-lg" />
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="space-y-2 mt-16 mb-16">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
            <div className="flex items-center space-x-4">
              <Skeleton className="h-32 w-32 rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BusinessDetails;
