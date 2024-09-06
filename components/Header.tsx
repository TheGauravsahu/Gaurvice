import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <nav className="border-b lg:px-16 px-8 shadow-sm p-4 mb-2 flex items-center justify-between">
      <div className="flex gap-8 items-center">
        <Link href={"/"}>
          <div className="logo flex items-center gap-2">
            <Image width={30} height={20} src="/logo.svg" alt="Guarvice logo" className="w-fit h-fit" />
            <h2 className="text-xl font-medium"> Gaurvice </h2>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-4">
          <Link href={"/"}>
            <h2 className="hover:scale-105 hover:font-medium">Home</h2>
          </Link>
          <Link href={"/service"}>
            <h2 className="hover:scale-105 hover:font-medium">Services</h2>
          </Link>
          <Link href={"/about"}>
            <h2 className="hover:scale-105 hover:font-medium">About Us</h2>
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <SignedOut>
          <Link href={"/sign-in"} >
            <Button>Sign In</Button>
          </Link>
        </SignedOut>

        <SignedIn>
          <Button>
            <Link href={"/bookings"}>
            My bookings
            </Link>
          </Button>
        </SignedIn>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Header;
