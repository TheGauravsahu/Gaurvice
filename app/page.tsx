import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import CategoryList from "@/components/CategoryList";
import BusinessList from "@/components/BusinessList";

export default function Home() {
  return (
    <section className="mt-16 pb-16">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl text-center font-semibold">
          Find Home
          <span className="text-[#FFA589]"> Service/Repair </span>
          <br />
          Near You
        </h1>
        <h2 className="font-medium mt-2 text-center w-[80%] text-lg text-gray-400">
          Explore Best Home service & Repair near you
        </h2>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        <Input
          placeholder="Search"
          className="rounded-full w-[80%] md:w-[50%] font-medium"
        />
        <Button className="rounded-full">
          <Search className="w-5" />
        </Button>
      </div>

      <CategoryList />

      <BusinessList />
    </section>
  );
}
