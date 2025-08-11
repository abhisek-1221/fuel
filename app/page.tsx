import Image from 'next/image';
import {
  ArrowRight,
  Award,
  BarChart3,
  Bitcoin,
  Bookmark,
  Calendar,
  Clock,
  Coins,
  Menu,
  Monitor,
  Play,
  PlayCircle,
  ShieldCheck,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react';

export default function Home() {
  return (
    <>
      <div
        className="fixed top-0 w-full h-screen bg-cover bg-center -z-10"
        style={{
          backgroundImage:
            'url("https://cdn.midjourney.com/a55c302e-35a2-40d2-8ae8-1f2bc7f74192/0_0.png?w=800&q=80")',
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
                  Take part in short voice challenges with unique AI personas. Your words help forge the path to Artificial General Intelligence — and you earn while doing it.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-slide-up animate-delay-600">
                  <a
                    href="#"
                    className="inline-flex items-center justify-center gap-2 transition-all hover:scale-105 hover:shadow-lg hover:bg-gray-900 font-medium text-white bg-black rounded-full pt-4 pr-8 pb-4 pl-8 shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]"
                  >
                    Start Your First Quest
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                <div className="mt-12 flex items-center gap-8 animate-slide-up animate-delay-800">
                  <p className="text-sm font-medium font-sans">
                    Every conversation is a step toward the next frontier of intelligence.
                  </p>
                </div>
              </div>

              <div className="relative animate-slide-up animate-delay-400">
                <div className="relative rounded-3xl overflow-hidden h-80 sm:h-[28rem] shadow-2xl">
                  <Image
                    src="https://cdn.midjourney.com/bb972d04-5615-480a-bdd9-75cf76f6bec5/0_0.png?w=800&q=80"
                    alt="Crypto trading dashboard"
                    className="absolute inset-0 w-full h-full object-cover"
                    width={800}
                    height={448}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t via-transparent to-transparent from-black/60"></div>

                  <div className="absolute top-4 left-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <Image
                        src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=320&q=80"
                        className="w-6 h-6 rounded-full border-2 object-cover border-white"
                        alt="Instructor"
                        width={24}
                        height={24}
                      />
                      <span className="text-xs font-medium font-sans">
                        Sarah Chen, Lead Instructor
                      </span>
                    </div>
                    <p className="text-xs leading-4 max-w-[200px] backdrop-blur-sm rounded-lg p-2 font-sans bg-black/20">
                      &quot;From zero to crypto hero in 8 weeks. I&apos;ll guide
                      you through every step of your blockchain journey!&quot;
                    </p>
                  </div>

                  <div className="absolute top-4 right-4 flex gap-2">
                    <button className="backdrop-blur-sm rounded-full p-2 transition-colors bg-white/20 hover:bg-white/30">
                      <Play className="w-4 h-4 text-white" />
                    </button>
                    <button className="backdrop-blur-sm rounded-full p-2 transition-colors bg-white/20 hover:bg-white/30">
                      <Bookmark className="w-4 h-4 text-white" />
                    </button>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="backdrop-blur-sm rounded-lg p-3 bg-white/10">
                      <div className="flex items-center justify-between text-sm text-white">
                        <span className="font-sans">
                          Current Module: DeFi Fundamentals
                        </span>
                        <span className="flex items-center gap-1 font-sans">
                          <Clock className="w-3 h-3" />
                          24 min
                        </span>
                      </div>
                      <div className="mt-2 rounded-full h-1 bg-white/20">
                        <div className="rounded-full h-1 w-2/3 bg-white"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -right-4 bg-white border-gray-100 border rounded-2xl pt-4 pr-4 pb-4 pl-4 shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-100">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="">
                      <p className="text-sm font-semibold font-sans">
                        Portfolio Growth
                      </p>
                      <p className="text-xs font-sans text-gray-600">
                        +247% avg student gain
                      </p>
                    </div>
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
