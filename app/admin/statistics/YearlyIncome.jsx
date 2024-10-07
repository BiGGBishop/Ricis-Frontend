import { useSelector } from "react-redux";
import Doughnut from "./Doughnut";
import {
  selectOption,
  selectPercentageProfileIncrease,
} from "@/store/features/statisticsSlice";
import { capitalizeFirstLetter } from "@/utils/helpers";

const YearlyIncome = () => {
  const percentage_profile_incease = useSelector(
    selectPercentageProfileIncrease
  );

  const selected = useSelector(selectOption);

  return (
    <div className="self-center bg-white p-6 pb-12 rounded-lg h-fit">
      <div className="border-b">
        <p className="text-gray-500">Percentage Increase in profit</p>
        <h1 className="text-lg font-semibold">
          {" "}
          {`${selected === "day" ? "Dai" : capitalizeFirstLetter(selected)}ly`} Income
        </h1>
      </div>
      <div className="flex justify-center">
        <Doughnut percentage={percentage_profile_incease} />
      </div>
    </div>
  );
};

export default YearlyIncome;
