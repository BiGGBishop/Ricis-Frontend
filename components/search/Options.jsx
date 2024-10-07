// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { capitalizeFirstLetter } from "@/utils/helpers";

 const Options = ({ options, value, handleChange }) => {
  // console.log(selected);
  return (
    // <Select
    //   className="z-[9999]"
    //   onValueChange={(value) => setSelected(value)}
    //   defaultValue={selected}
    //   // name="status"
    // >
    //   <SelectTrigger className="lg:w-96">
    //     <SelectValue placeholder="Select an option" />
    //   </SelectTrigger>
    //   <SelectContent className="z-[9999]">
    //     <SelectGroup className="z-[9999]">
    //       <SelectLabel>Options</SelectLabel>
    //       {options?.map((option) => (
    //         <SelectItem key={option.id} value={option.value}>
    //           {option.value.split("_").join(" ")}
    //         </SelectItem>
    //       ))}
    //     </SelectGroup>
    //   </SelectContent>
    // </Select>

    <select
      name="date_modified"
      value={value}
      onChange={handleChange}
      id=""
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg lg:w-[70%] p-2.5"
    >
      <option selected className="">
        Select Date
      </option>
      {options?.map((option) => (
        <option key={option.id} value={option.value}>
          {option.value.split("_").join(" ")}
        </option>
      ))}
    </select>
  );
};

export default Options;
