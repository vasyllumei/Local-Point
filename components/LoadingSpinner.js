import Image from "next/image";
import { motion } from "framer-motion";

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center fixed top-0 left-0 w-full h-full bg-white bg-opacity-80 z-50">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      >
        <Image
          src="/logo.png"
          alt="Logo"
          width={60}
          height={60}
          className="rounded-full"
        />
      </motion.div>
    </div>
  );
}

export default LoadingSpinner;
