import Link from "next/link";
import { Sacramento } from "next/font/google";

// Instantiate the Nunito font
const sacramento = Sacramento({
  subsets: ["latin"],
  weight: ["400"], // Define the weights you need
});

const Logo = () => {
  return (
    <Link href={"/"}>
      <h1
        className={`text-4xl font-bold text-blue-500 dark:text-blue-500 ${sacramento.className}`}
      >
        <span className="text-5xl">&#60;</span>
         Zigbee /
        <span className="text-5xl">&#62;</span>
      </h1>
    </Link>
  );
};

export default Logo;