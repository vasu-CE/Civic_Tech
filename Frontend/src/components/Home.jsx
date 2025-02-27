import ProblemItem from "./ProblemItem";

export default function Home() {

  return (
    <div className=" min-h-screen w-screen bg-gray-100">
      <div className="w-full px-8 py-3 flex gap-6">
        <ProblemItem />
      </div>
    </div>
    
  );
}
