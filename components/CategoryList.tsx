"use client";
import React from "react";
import api from "@/app/_services/GlobalApi";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { CategoryType } from "@/types/type";
import Link from "next/link";

const CategoryList = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const getCategoryList = async () => {
    try {
      const res: any = await api.getCategory();
      setCategories(res.categories);
      // console.log(res);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  return (
    <div className="flex items-center gap-4 flex-wrap mt-8 justify-center">
      {categories.length > 0
        ? categories.map((category: CategoryType) => (
            <Link key={category.id} href={`/search/${category.name}`}>
              <div
                style={{ backgroundColor: category.backgroundColour.hex }}
                className="w-32 h-32 cursor-pointer hover:scale-110 transition-all ease-in-out rounded-md flex flex-col gap-4 items-center justify-center"
              >
                <Image
                  width={40}
                  height={40}
                  src={category.icon.url}
                  alt={category.name}
                />
                <p className="font-medium text-sm">{category.name}</p>
              </div>
            </Link>
          ))
        : [1, 2, 3, 4].map((item, index) => (
            <div key={index} className="flex flex-col space-y-3">
              <Skeleton className="w-32 h-32" />
            </div>
          ))}
    </div>
  );
};

export default CategoryList;
