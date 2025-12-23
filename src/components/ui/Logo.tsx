import Link from "next/link";
import Image from "next/image";

type LogoProps = {
  variant?: "default" | "light";
};

export default function Logo({ variant = "default" }: LogoProps) {
  const isLight = variant === "light";

  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="w-7 h-7 md:w-9 md:h-9 shrink-0">
        <Image
          src="/images/Logo.png"
          alt="Invoice Generator"
          width={36}
          height={36}
          priority
          className="w-full h-full object-contain"
        />
      </div>
      <span
        className={`font-logo text-base md:text-xl font-bold ${
          isLight ? "text-white" : "text-orange-500"
        }`}
      >
        Invoice Gen
      </span>
    </Link>
  );
}
