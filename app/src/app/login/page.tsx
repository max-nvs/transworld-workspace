import { LoginForm } from "@/components/login-form";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left panel — Brand */}
      <div className="relative hidden w-1/2 flex-col justify-between bg-[#0B1D3A] p-8 lg:flex">
        {/* Logo — top left */}
        <div className="relative z-10">
          <Image
            src="https://res.cloudinary.com/dzv7br1md/image/upload/v1770721031/transworld_logo_govyo2.png"
            alt="Transworld Investment & Securities"
            width={180}
            height={40}
            className="h-10 w-auto brightness-0 invert"
            unoptimized
          />
        </div>

        {/* Center — Testimonial carousel */}
        <div className="relative z-10">
          <TestimonialCarousel />
        </div>

        {/* Footer spacer */}
        <div />
      </div>

      {/* Right panel — Login form */}
      <div className="flex w-full flex-col items-center justify-center border-t-2 border-t-[#C9A64D] bg-[#FAFAFA] px-4 lg:border-t-0 lg:border-l-2 lg:border-l-[#C9A64D] lg:w-1/2">
        <div className="w-full max-w-[400px]">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
