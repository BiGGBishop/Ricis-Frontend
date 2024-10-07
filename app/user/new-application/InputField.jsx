const InputField = ({
  placeholder,
  name,
  required,
  id,
  type,
  value,
  handleChange,
}) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      required={required}
      value={value}
      onChange={handleChange}
      className="text-sm p-2 w-[90%] border border-gray-300 rounded-lg"
      placeholder={placeholder}
    />
  );
};

export default InputField;
