import { Leaf } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-base-100 flex flex-col md:flex-row">
      {/* Left side: branding & image */}
      <div className="hidden md:flex flex-col flex-1 bg-primary text-primary-content p-12 relative overflow-hidden">
        <div className="relative z-10 flex flex-col h-full">
          <Link href="/" className="flex items-center gap-2 group w-fit">
            <Leaf className="w-6 h-6 text-primary-content" />
            <span className="font-serif text-2xl font-bold tracking-wide">
              Satwika
            </span>
          </Link>
          <div className="mt-auto max-w-md">
            <h1 className="font-serif text-4xl leading-tight mb-4">
              Nurturing Well-Being Through Nature.
            </h1>
            <p className="text-primary-content/80 text-lg">
              Join our community of conscious consumers and embrace a lifestyle rooted in purity.
            </p>
          </div>
        </div>
        {/* Subtle decorative circles */}
        <div className="absolute -bottom-32 -left-32 w-[30rem] h-[30rem] bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute top-1/4 -right-20 w-[20rem] h-[20rem] bg-accent/20 rounded-full blur-3xl" />
      </div>

      {/* Right side: auth forms */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        {/* Mobile header (hidden on md) */}
        <div className="absolute top-6 left-6 md:hidden">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="w-6 h-6 text-primary" />
            <span className="font-serif text-xl font-bold text-primary">Satwika</span>
          </Link>
        </div>
        
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
