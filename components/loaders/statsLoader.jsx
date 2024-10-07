import {
  BounceLoader,
  ClipLoader,
  FadeLoader,
  GridLoader,
  HashLoader,
  PacmanLoader,
} from "react-spinners";

const StatsLoader = () => {
  return (
    <div className="flex justify-center items-center gap-28 fixed inset-0 bg-[rgb(0,0,0,0.8)] bg-opacity-50 z-[9999]">
      <FadeLoader size={25} color="#fff" />
    </div>
  );
};

export default StatsLoader;
