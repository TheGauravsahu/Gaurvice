"use client";
import React from "react";
import SearchLayout from "../SearchLayout";
import { useEffect } from "react";
import api from "@/app/_services/GlobalApi";
import { BusinessType } from "@/types/type";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const BusinessByCategory = ({ params }: { params: any }) => {
  const [businesses, setBusinesses] = useState<BusinessType[]>([]);
  const [loading, setLoading] = useState(true); // Loading state
  const router = useRouter();

  const getBusinessByCategory = async () => {
    try {
      const res: any = await api.getBusinessByCategory(params.category);
      setBusinesses(res.businessLists);
      return res;
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };
  useEffect(() => {
    getBusinessByCategory();
  }, []);

  const handleClick = (id: String) => {
    router.push(`/details/${id}`);
  };

  return (
    <SearchLayout>
      <div className="mt-8">
        <h1 className="text-xl font-semibold">{params.category}</h1>

        <div className="cadwrapper mt-4 flex flex-col lg:flex-row flex-wrap items-center justify-center gap-6">
          {loading ? (
            [1, 2, 3, 4].map((item, index) => (
              <div key={index} className="flex flex-col space-y-3">
                <Skeleton className="h-[200px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))
          ) : businesses.length > 0 ? (
            businesses.map((business) => (
              <div
                onClick={() => handleClick(business.id)}
                key={business.id}
                className="card shadow-md rounded-xl w-[300px] h-[450px] hover:scale-105 transition-all ease-in-out cursor-pointer"
              >
                <Image
                  src={business?.images[0].url}
                  alt={business.name}
                  width={600}
                  height={400}
                  className="h-84 object-cover rounded-t-xl"
                />
                <div className="p-4">
                  <p className="bg-[#FFBCAB] rounded-full w-fit p-2 text-xs">
                    {business.category.name}
                  </p>
                  <h2 className="text-lg font-semibold mt-1">
                    {business.name}
                  </h2>
                  <p className="capitalize mt-2">{business.contactPerson}</p>
                  <p className="text-sm my-1 mb-4 text-slate-400">
                    {business.address}
                  </p>

                  <Button>Book Now</Button>
                </div>
              </div>
            ))
          ) : (
            <p>No results found for this category.</p>
          )}
        </div>
      </div>
    </SearchLayout>
  );
};

export default BusinessByCategory;
