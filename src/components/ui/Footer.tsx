import Image from "next/image";
import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-[#1f1f1f] text-gray-300 pt-16">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-10 pb-12">
        {/* Brand */}
        <div>
          <Logo variant="light" />
          <p className="mt-4 text-sm leading-relaxed">
            +62-234-567-890 <br />
            Jl. MH Thamrin No.1, Menteng <br />
            Jakarta Pusat 10340
          </p>
        </div>

        {/* Learn More */}
        <div>
          <h4 className="text-white font-semibold mb-4">Learn More</h4>
          <ul className="space-y-2 text-sm">
            {["How it work", "Who we are", "Careers", "Blog", "FAQs"].map(
              (item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-orange-400">
                    {item}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-white font-semibold mb-4">Social</h4>
          <ul className="space-y-2 text-sm">
            {["Facebook", "Instagram", "Twitter", "Pinterest", "LinkedIn"].map(
              (item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-orange-400">
                    {item}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Downloads */}
        <div>
          <h4 className="text-white font-semibold mb-4">Downloads</h4>
          <div className="space-y-3">
            <Image
              src="/images/google-play.png"
              alt="Google Play"
              width={160}
              height={48}
              className="cursor-pointer hover:opacity-80"
            />
            <Image
              src="/images/app-store.png"
              alt="App Store"
              width={160}
              height={48}
              className="cursor-pointer hover:opacity-80"
            />
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 py-4 text-center text-xs text-gray-400">
        © 2025 Company Name. All rights reserved.
      </div>
    </footer>
  );
}
