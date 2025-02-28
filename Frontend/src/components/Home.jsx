import { useSelector } from "react-redux";
import ProblemItem from "./ProblemItem";
import GetAllProblems from "@/hooks/GetAllProblems";

export default function Home() {
  // const problem = useSelector((state) => state.problems.problems);
  return (
    <>
      <GetAllProblems />
      <div className=" min-h-screen w-screen bg-gray-100">
        <div className="w-full px-8 py-3 flex gap-6">
          <ProblemItem />
        </div>
      </div>
    </>
  );
}
