"use client";

import { motion } from "framer-motion";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const heroBackgroundImageUrl =
  "https://pbs.twimg.com/media/GssNsUWX0AA0skP?format=jpg&name=4096x4096";

const scrollingBackgroundImageUrl = 
  "https://pbs.twimg.com/media/GssNsUZWUAAVqZP?format=jpg&name=4096x4096";

export default function LandingPage(): JSX.Element {

  return (
    <main className="w-full">
      <section className="relative min-h-screen w-full overflow-hidden bg-black">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${heroBackgroundImageUrl}')` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-black/40" aria-hidden />

        <div className="relative z-10 min-h-screen w-full">
            {/* Top-left L-shaped corner */}
            <div className="pointer-events-none absolute left-6 top-6 sm:left-10 sm:top-10 flex flex-col">
                <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "6rem" }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
                    className="h-0.5 bg-white/70"
                />
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "6rem" }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
                    className="w-0.5 bg-white/70"
                />
            </div>

            {/* Top-right L-shaped corner */}
            <div className="pointer-events-none absolute right-6 top-6 sm:right-10 sm:top-10 flex flex-col items-end">
                <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "6rem" }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
                    className="h-0.5 bg-white/70"
                />
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "6rem" }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
                    className="w-0.5 bg-white/70"
                />
            </div>
            
            <motion.div
            initial={{ opacity: 0, x: -60, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="absolute left-20 top-10"
            >
            <Link href="/" className="flex items-center gap-3">
                <Image
                src="/fll.png"
                alt="Feul.AI Logo"
                width={144}
                height={144}
                className="h-36 w-36 rounded-full"
                />
            </Link>
            </motion.div>
            {/* Top-right headline */}
            <div className="pointer-events-none absolute right-12 top-12 sm:right-20 sm:top-20 max-w-xl md:max-w-2xl">
            <motion.h1
                initial={{ opacity: 0, x: 60, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="text-right font-semibold leading-[1.05] tracking-tight text-white drop-shadow-lg text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            >
                You are the source. <span className="italic">Feul</span> is your refinery.
            </motion.h1>
            </div>

            {/* Bottom-left subheadline */}
            <div className="pointer-events-none absolute bottom-12 left-12 sm:bottom-20 sm:left-20 max-w-3xl">
            <motion.p
                initial={{ opacity: 0, x: -60, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                className="text-pretty text-white/90 drop-shadow-lg text-lg sm:text-xl md:text-2xl lg:text-3xl"
            >
                Your data is the invisible engine behind AI’s growth. Feul turns that invisible
                force into tangible rewards because you built this future
            </motion.p>
            </div>

            {/* Bottom-left L-shaped corner */}
            <div className="pointer-events-none absolute bottom-6 left-6 sm:bottom-10 sm:left-10 flex flex-col-reverse">
                <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: '6rem' }}
                    transition={{ duration: 0.5, ease: 'easeOut', delay: 0.5 }}
                    className="h-0.5 bg-white/70"
                />
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: '6rem' }}
                    transition={{ duration: 0.5, ease: 'easeOut', delay: 0.5 }}
                    className="w-0.5 bg-white/70"
                />
            </div>

            {/* Bottom-right L-shaped corner */}
            <div className="pointer-events-none absolute bottom-6 right-6 sm:right-10 sm:right-10 flex flex-col-reverse items-end">
                <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: '6rem' }}
                    transition={{ duration: 0.5, ease: 'easeOut', delay: 0.5 }}
                    className="h-0.5 bg-white/70"
                />
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: '6rem' }}
                    transition={{ duration: 0.5, ease: 'easeOut', delay: 0.5 }}
                    className="w-0.5 bg-white/70"
                />
            </div>

            {/* Join Waitlist Button */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
                className="absolute bottom-12 right-12 sm:bottom-12 sm:right-16"
            >
                <div className="flex items-center rounded-lg bg-[#F0EBE3] p-1 shadow-2xl">
                    <Link href="/waitlist">
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="rounded-md bg-white px-6 py-2 text-lg font-semibold text-black shadow-lg"
                        >
                            JOIN US
                        </motion.button>
                    </Link>
                </div>
            </motion.div>
        </div>

      </section>
    </main>
  );
}

