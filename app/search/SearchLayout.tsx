import Sidebar from "@/components/Sidebar";

export default function SearchLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex items-center md:items-start gap-0 md:gap-8">
      <div className="w-1/4">
        <Sidebar />
      </div>

      {children}
    </section>
  );
}
