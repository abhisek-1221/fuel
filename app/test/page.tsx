import RadialCard from "../components/radial-card";
 
export default function Test() {
  return (
    <>
      <div
        className="fixed top-0 w-full h-screen bg-cover bg-center -z-10"
        style={{
          backgroundImage:
            'url("https://xo8yz727kp.ufs.sh/f/FyQUTC66sKbc48PBPvHHWacf6vk90KYTnzGr4V8ug7NEwmqO")',
        }}
      ></div>
      <main className="flex items-center justify-center h-screen">
        <RadialCard />
      </main>
    </>
  );
}