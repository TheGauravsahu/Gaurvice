"use client";
import { CheckCircle, Calendar, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brush, Home, Truck, Wrench } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export function ServicePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 my-16">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Your One-Stop Solution for Home Services
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  From cleaning to repairs, painting to shifting - we&apos;ve got all
                  your household needs covered.
                </p>
              </div>
              <Link href={"/search/Cleaning"}>
                <Button className="bg-gray-900 text-white hover:bg-gray-800">
                  Book a Service
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-8">
              Our Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ServiceCard
                icon={<Home className="h-6 w-6" />}
                title="Cleaning"
                description="Professional home cleaning services"
              />
              <ServiceCard
                icon={<Wrench className="h-6 w-6" />}
                title="Repairing"
                description="Expert repair for household items"
              />
              <ServiceCard
                icon={<Brush className="h-6 w-6" />}
                title="Painting"
                description="Transform your space with our painting services"
              />
              <ServiceCard
                icon={<Truck className="h-6 w-6" />}
                title="Shifting"
                description="Hassle-free relocation services"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32  mb-16">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-8">
              Frequently Asked Questions
            </h2>
            <Accordion
              type="single"
              collapsible
              className="w-full max-w-3xl mx-auto"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I book a service?</AccordionTrigger>
                <AccordionContent>
                  You can book a service by clicking the Book a Service button
                  on our website, selecting the service you need, and choosing a
                  convenient time slot.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What areas do you serve?</AccordionTrigger>
                <AccordionContent>
                  We currently serve major cities and their surrounding areas.
                  Please check our service area page for specific locations.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  Are your professionals vetted?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, all our professionals undergo thorough background checks
                  and are fully trained in their respective fields to ensure
                  high-quality service.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  What is your cancellation policy?
                </AccordionTrigger>
                <AccordionContent>
                  You can cancel or reschedule a service up to 24 hours before
                  the scheduled time without any charge. Cancellations within 24
                  hours may incur a fee.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Get Started?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl">
                  Book your service now and experience the Gaurvice difference.
                </p>
              </div>
              <Link href={"/search/Cleaning"}>
              <Button className="bg-gray-900 text-white hover:bg-gray-800">
                Book Now
              </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function ServiceCard({ icon, title, description }) {
  return (
    <Card className="transition-all hover:shadow-lg">
      <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
        <div className="bg-gray-100 p-3 rounded-full">{icon}</div>
        <h3 className="font-bold text-xl">{title}</h3>
        <p className="text-gray-500">{description}</p>
      </CardContent>
    </Card>
  );
}
