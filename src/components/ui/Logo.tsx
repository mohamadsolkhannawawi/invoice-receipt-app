import Link from "next/link";
import Image from "next/image";

type LogoProps = {
  variant?: "default" | "light";
};

export default function Logo({ variant = "default" }: LogoProps) {
  const isLight = variant === "light";

  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/images/Logo.png"
        alt="Invoice Generator"
        width={48}
        height={48}
        priority
      />
      <span
        className={`font-logo text-xl font-bold ${
          isLight ? "text-white" : "text-orange-500"
        }`}
      >
        Invoice Gen
      </span>
    </Link>
  );
}
