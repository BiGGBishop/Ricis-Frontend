import { Cancel } from "@/svgs";
import { useEffect, useState } from "react";
import Btn from "@/components/Btn";
import Options from "./Options";
import {
  capitalizeFirstLetter,
  filter_type_data,
  getCurrentDate,
  getStatisticsDate,
} from "@/utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import {
  selectOption,
  setDate,
  setEndDate,
  setHighestPerformingForm,
  setLowestPerformingForm,
  setPercentageProfileIncrease,
  setRevenueGenerated,
  setStartDate,
} from "@/store/features/statisticsSlice";
import useForm from "@/hooks/useForm";
import { getToken } from "@/utils/authHelpers";
import { baseUrl } from "@/lib/configs";

const { currentYear, currentMonth, currentWeek, currentDayOfWeek } =
  getCurrentDate();

const InitialData = {
  // year: {
  //   year: currentYear,
  // },
  // month: {
  //   year: currentYear,
  //   month: filter_type_data.month[currentMonth],
  // },
  // week: {
  //   year: currentYear,
  //   month: filter_type_data.month[currentMonth],
  //   week: filter_type_data.week[currentWeek - 1],
  // },
  // day: {
  year: currentYear,
  month: filter_type_data.month[currentMonth],
  week: filter_type_data.week[currentWeek - 1],
  day: filter_type_data.day[currentDayOfWeek],
  // },
};

const SelectMenu = ({ name, value, onChange }) => {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      id=""
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg lg:w-24 p-2.5 flex-grow basis-1/5"
    >
      <option selected className="">
        {capitalizeFirstLetter(name)}
      </option>
      {filter_type_data[name]?.map((option) => (
        <option key={option} value={option}>
          {capitalizeFirstLetter(option)}
        </option>
      ))}
    </select>
  );
};

const Filter = ({ setIsEditing }) => {
  const selected = useSelector(selectOption);

  const filters = {
    day: ["day", "week", "month", "year"],
    week: ["week", "month", "year"],
    month: ["month", "year"],
    year: ["year"],
  };

  const InitialFilterData = InitialData;
  const { formData, setFormData, handleChange } = useForm(InitialFilterData);
  const dispatch = useDispatch();
  const token = getToken();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const sendRequest = async (payload) => {
    try {
      setIsLoading(true);
      console.log(payload);
      const response = await fetch(
        `${baseUrl}/transactions/stats/chart?${new URLSearchParams(payload)}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      // if (response.ok) {
      setIsSuccess(true);
      console.log(data);
      // }
      dispatch(
        setPercentageProfileIncrease(data?.data?.percentage_profile_incease)
      );
      dispatch(setRevenueGenerated(data?.data?.revenue_generated));

      dispatch(setHighestPerformingForm(data?.data?.highest_performing_form));
      dispatch(setLowestPerformingForm(data?.data?.lowest_performing_form));
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const submit = async () => {
    const { start_date, end_date } = getStatisticsDate(selected, formData);
    dispatch(setDate(JSON.stringify(start_date)));
    dispatch(setStartDate(JSON.stringify(start_date)));
    dispatch(setEndDate(JSON.stringify(end_date)));
    console.log({ start_date, end_date });

    const payload = { start_date, end_date, filter_type: selected };
    await sendRequest(payload);
    console.log(payload);
  };

  useEffect(() => {
    if (isSuccess) {
      setIsEditing(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    const { start_date, end_date } = getStatisticsDate(selected, formData);
    dispatch(setDate(JSON.stringify(start_date)));
    dispatch(setStartDate(JSON.stringify(start_date)));
    dispatch(setEndDate(JSON.stringify(end_date)));
  }, [selected]);

  return (
    <div className="flex justify-center items-center fixed top bottom-0 left-0 right-0  inset-0 bg-[rgb(0,0,0,0.8)] overflow-y-auto bg-opacity-50 z-[9999] h-full">
      <div className="bg-white px-6 py-6 rounded shadow-md md:w-[500px] z-[9999] lg:space-y-6 space-y-8 w-[95%] lg:w-[40rem]">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-lg ">Filter</h1>
          <span onClick={() => setIsEditing(false)} className="">
            {Cancel}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Options />
        </div>
        <div className="space-y-2">
          <p className="text-sm">
            Select your preferred month below to make your search easy
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {filters[selected].map((filter) => (
              <SelectMenu
                key={filter}
                name={filter}
                onChange={handleChange}
                value={formData[filter]}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-16">
          <Btn
            loading={isLoading}
            loadingMsg="saving"
            text="save changes"
            handleClick={submit}
          />
        </div>
      </div>
    </div>
  );
};

export default Filter;
