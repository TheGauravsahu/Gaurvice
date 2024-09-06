"use client";
import { CategoryType } from "@/types/type";
import api from "@/app/_services/GlobalApi";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { usePathname, useRouter  } from "next/navigation";

export default function Sidebar() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState< string | undefined >();
  const router = useRouter();
  const pathname  = usePathname();
  

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
    const pathParts = pathname.split('/');
    const categoryFromPath = pathParts[pathParts.length - 1]; // Get the last part of the path
    setSelectedCategory(categoryFromPath);
  }, [pathname]);

  useEffect(() => {
    getCategoryList();
  }, []);

  return (
    <aside className="min-h-screen w-full py-4 hidden md:flex flex-col">
      <h1 className="font-medium text-lg">Categories</h1>
      <br />
      <div className="flex flex-col gap-4">
        {categories.length > 0
          ? categories.map((category: CategoryType) => (
              <Link key={category.id} href={`/search/${category.name}`}>
                <div
                  onClick={() => setSelectedCategory(category.name)}
                  className={`border rounded-lg p-4 text-lg font-medium text-gray-600 flex gap-1 lg:gap-2 items-center cursor-pointer overflow-hidden ${
                    selectedCategory === category.name
                      ? "shadow-sm bg-orange-100 border-[#FFA589]"
                      : "hover:shadow-sm hover:bg-orange-100 hover:border-[#FFA589]"
                  }`}
                >
                  <Image
                    src={category.icon.url}
                    alt={category.name}
                    width={30}
                    height={30}
                    className="w-4 md:w-fit"
                  />
                  <p className="text-sm lg:text-md font-semibold">
                    {category.name}
                  </p>
                </div>
              </Link>
            ))
          : [1, 2, 3, 4].map((item, index) => (
              <div key={index} className="flex flex-col space-y-3">
                <Skeleton className="border hover:shadow-sm rounded-lg p-4 text-lg font-medium text-gray-600 hover:text-gray-800 flex gap-1 lg:gap-2 items-center hover:bg-orange-100 cursor-pointer hover:border-[#FFA589] overflow-hidden" />
              </div>
            ))}
      </div>
    </aside>
  );
}
