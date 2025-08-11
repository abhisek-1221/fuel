'use client';
import Image from 'next/image';
import {
  ArrowRight,
  Menu,
  TrendingUp,
  Mic
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const imageData = [
  {
    src: 'https://xo8yz727kp.ufs.sh/f/FyQUTC66sKbcJ2l1TpGqxZr2j6RGhIKykf0dLS49gePNvWAs',
    text: 'Nova Flame — Express your burning desire',
  },
  {
    src: 'https://pbs.twimg.com/media/GvReA8SagAAnbeJ?format=jpg&name=large',
    text: 'Bob — Your ally against office monotony.',
  },
  {
    src: 'https://pbs.twimg.com/media/GvQpuoBXAAAupU-?format=jpg&name=medium',
    text: 'Prodigy Paws — The smartest cat in school',
  },
];

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % imageData.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div
        className="fixed top-0 w-full h-screen bg-cover bg-center -z-10"
        style={{
          backgroundImage:
            'url("https://xo8yz727kp.ufs.sh/f/FyQUTC66sKbc48PBPvHHWacf6vk90KYTnzGr4V8ug7NEwmqO")',
        }}
      ></div>
      <header className="py-6 animate-fade-in">
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
          <a
            href="#"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-gradient-to-br rounded-full flex items-center justify-center from-black to-gray-700">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-lg tracking-tight font-sans">
              Feul.AI
            </span>
          </a>

          <button className="hidden sm:inline-flex transition-all hover:shadow-md hover:bg-gray-100 text-sm font-medium text-black bg-white rounded-full pt-2 pr-6 pb-2 pl-6 shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] items-center justify-center">
            CONTACT US
          </button>
          <button className="md:hidden p-2 rounded-lg transition-colors hover:bg-white/20">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      <main className="">
        <section className="mx-auto max-w-7xl px-6 pb-20">
          <div className="md:rounded-3xl md:p-16 lg:p-24 overflow-hidden bg-white/50 rounded-b-3xl pt-8 pr-8 pb-8 pl-8 shadow-[rgba(255,_255,_255,_0.1)_0px_1px_1px_0px_inset,_rgba(50,_50,_93,_0.25)_0px_50px_100px_-20px,_rgba(0,_0,_0,_0.3)_0px_30px_60px_-30px] backdrop-blur-md">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="">
                <h1 className="sm:text-5xl lg:text-7xl leading-tight animate-slide-up animate-delay-200 text-4xl font-medium tracking-tight font-manrope mt-2 mr-2 mb-2 ml-2">
                  Shape AGI and Earn Rewards.
                  <br className="hidden sm:block" />
                </h1>

                <p className="sm:text-lg max-w-xl animate-slide-up animate-delay-400 text-base mt-6 font-sans text-gray-600">
                  Take part in short voice challenges with unique AI personas. Your words help forge the path to Artificial General Intelligence and you earn while doing it.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-slide-up animate-delay-600">
                  <a
                    href="#"
                    className="inline-flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 font-medium text-black bg-gradient-to-br from-yellow-50 via-amber-50 to-stone-200 rounded-full pt-4 pr-8 pb-4 pl-8 shadow-lg border-t border-white/50"
                  >
                    Join Waitlist
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                <div className="mt-12 flex items-center gap-8 animate-slide-up animate-delay-800">
                  <p className="text-sm font-medium font-sans italic">
                    Every conversation is a step toward the next frontier of intelligence.
                  </p>
                </div>
              </div>

              <div className="relative animate-slide-up animate-delay-400">
                <div className="relative rounded-3xl overflow-hidden h-80 sm:h-[28rem] shadow-2xl">
                  <AnimatePresence>
                    <motion.div
                      key={currentImage}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={imageData[currentImage].src}
                        alt="AI Persona"
                        className="absolute inset-0 w-full h-full object-cover"
                        width={800}
                        height={448}
                      />
                    </motion.div>
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t via-transparent to-transparent from-black/60"></div>
                  <div className="absolute top-4 left-4 text-white">
  
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                        <button className="w-full text-black font-semibold rounded-full bg-gradient-to-br from-yellow-50 via-amber-50 to-stone-200 px-6 py-3 text-center shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 flex items-center justify-center gap-2 border-t border-white/50">
                            <Mic className="w-5 h-5" />
                            {imageData[currentImage].text}
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </section>
      </main>
    </>
  );
}
