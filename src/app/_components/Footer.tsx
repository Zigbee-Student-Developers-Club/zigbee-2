import Link from "next/link";
import {
  Instagram,
  Telegram,
  Linkedin,
  Youtube,
  Facebook,
  Twitter,
} from "react-bootstrap-icons";
import Logo from "@/app/_components/Logo";

export default function Footer() {
  return (
    <div className="mt-6 px-8 bg-gray-100 py-8 text-gray-800 rounded-xl dark:bg-neutral-900 dark:text-gray-300">
      <div className="container mx-auto flex flex-wrap gap-4 justify-between items-start py-4">
        {/* Logo and Address */}
        <div className="flex flex-col items-start">
          <Logo />
          <p className="mt-2">Dept. of CSA, OUTR, Bhubaneswar.</p>
        </div>

        {/* Navigation Links - Column 1 */}
        <div className="flex flex-col space-y-3 mt-6 md:mt-0">
          <Link href="/codewars" className="hover:text-teal-500">
            Codewars
          </Link>
          <Link href="/gallery" className="hover:text-teal-500">
            Gallery
          </Link>
          {/* Uncomment the below link if needed */}
          {/* <Link href="/blogs" className="hover:text-teal-500">Blogs</Link> */}
        </div>

        {/* Navigation Links - Column 2 */}
        <div className="flex flex-col space-y-3 mt-6 md:mt-0">
          <Link href="/department" className="hover:text-teal-500">
            Department
          </Link>
          <Link href="/alumni" className="hover:text-teal-500">
            Alumni
          </Link>
          <Link href="/events" className="hover:text-teal-500">
            Events
          </Link>
          <Link href="/resources" className="hover:text-teal-500">
            Resources
          </Link>
          <Link href="/drafts" className="hover:text-teal-500">
            Drafts
          </Link>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-6 mt-6 md:mt-0">
          <Link
            href="https://www.instagram.com/zigbee.outr"
            target="_blank"
            className="hover:text-teal-500"
          >
            <Instagram size={20} />
          </Link>
          <Link
            href="https://t.me/joinchat/wgUy8eMWplM2MGQ1"
            target="_blank"
            className="hover:text-teal-500"
          >
            <Telegram size={20} />
          </Link>
          <Link
            href="https://www.linkedin.com/company/zigbeecetb/"
            target="_blank"
            className="hover:text-teal-500"
          >
            <Linkedin size={20} />
          </Link>
          <Link
            href="https://www.youtube.com/channel/UCD7i_7Mh1M1mPViCZIyQAJA"
            target="_blank"
            className="hover:text-teal-500"
          >
            <Youtube size={20} />
          </Link>
          <Link
            href="https://www.facebook.com/zigbee.cetb"
            target="_blank"
            className="hover:text-teal-500"
          >
            <Facebook size={20} />
          </Link>
          <Link
            href="https://twitter.com/zigbeecetb"
            target="_blank"
            className="hover:text-teal-500"
          >
            <Twitter size={20} />
          </Link>
        </div>
      </div>

      {/* Divider */}
      <div className="container mx-auto my-6 border-t border-gray-300"></div>

      {/* Footer Text */}
      <p className="text-center mt-6">
        © 2022 Zigbee Student Developers&apos; Club. All rights reserved
      </p>
    </div>
  );
}
