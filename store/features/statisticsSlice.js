import { createSlice } from "@reduxjs/toolkit";

const defaultDate = new Date(2024, 0, 1);
const defaultStartDate = new Date(2024, 0, 1);
const defaultEndDate = new Date(2024, 11, 31);

const initialState = {
  selectedOption: "year",
  date: JSON.stringify(defaultDate),
  start_date: JSON.stringify(defaultStartDate),
  end_date: JSON.stringify(defaultEndDate),
  applicationOverview: [],
  percentage_profile_incease: 0,
  revenue_generated: 0,
  lowest_performing_form: {
    name: "",
    total_amount: 0,
  },
  highest_performing_form: {
    name: "",
    total_amount: 0,
  },
  chart: {
    // 1: 0,
    // 2: 0,
    // 3: 0,
    // 4: 0,
    // 5: 0,
    // 6: 0,
    // 7: 0,
    // 8: 0,
    // 9: 0,
    // 10: 0,
    // 11: 0,
    // 12: 0,
  },
  isLoading: false,
  isSuccess: false,
};

const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    setSelectedOption: (state, action) => {
      state.selectedOption = action.payload;
      console.log(action.payload);
    },
    setDate: (state, action) => {
      state.date = action.payload;
      console.log(action.payload);
    },
    setStartDate: (state, action) => {
      state.start_date = action.payload;
      // console.log(action.payload);
    },
    setEndDate: (state, action) => {
      state.end_date = action.payload;
      // console.log(action.payload);
    },
    setApplicationOverview: (state, action) => {
      state.applicationOverview = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setPercentageProfileIncrease: (state, action) => {
      state.percentage_profile_incease = action.payload;
    },
    setRevenueGenerated: (state, action) => {
      state.revenue_generated = action.payload;
    },
    setHighestPerformingForm: (state, action) => {
      state.highest_performing_form = action.payload;
    },
    setLowestPerformingForm: (state, action) => {
      state.lowest_performing_form = action.payload;
    },
    setChart: (state, action) => {
      state.chart = action.payload;
    },
  },
});

export const {
  setSelectedOption,
  setDate,
  setStartDate,
  setEndDate,
  setApplicationOverview,
  setIsLoading,
  setChart,
  setRevenueGenerated,
  setPercentageProfileIncrease,
  setHighestPerformingForm,
  setLowestPerformingForm,
} = statisticsSlice.actions;

export const selectOption = (state) => state.statistics.selectedOption;
export const selectDate = (state) => state.statistics.date;
export const selectStartDate = (state) => state.statistics.start_date;
export const selectEndDate = (state) => state.statistics.end_date;
export const selectApplicationOverview = (state) =>
  state.statistics.applicationOverview;
export const selectIsLoading = (state) => state.statistics.isLoading;
export const selectLowestPerformingForm = (state) =>
  state.statistics.lowest_performing_form;
export const selectHighestPerformingForm = (state) =>
  state.statistics.highest_performing_form;
export const selectChart = (state) => state.statistics.chart;
export const selectPercentageProfileIncrease = (state) =>
  state.statistics.percentage_profile_incease;
export const selectRevenueGenerated = (state) =>
  state.statistics.revenue_generated;

export default statisticsSlice.reducer;
