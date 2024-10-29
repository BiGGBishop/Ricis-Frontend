import { Label } from '@/components/ui/label';

const TextArea = ({ name, id, value, onChange, error, isValid, required }) => {
  const fieldLabels = {
    installer_physical_address: 'Installer Physical Address',
    nature_of_manufacturing_process: 'Nature of Manufacturing Process',
    intended_use_of_equipment: 'Intended Use of Equipment',
  };

  const getDisplayLabel = (fieldName) => {
    return (
      fieldLabels[fieldName] ||
      fieldName
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    );
  };

  const displayLabel = getDisplayLabel(name);

  const getPlaceholderText = (fieldName) => {
    switch (fieldName) {
      case 'installer_physical_address':
        return 'Enter the complete physical address of the installer...';
      case 'nature_of_manufacturing_process':
        return 'Describe the manufacturing process in detail...';
      case 'intended_use_of_equipment':
        return 'Explain how the equipment will be used...';
      default:
        return `Enter ${getDisplayLabel(fieldName).toLowerCase()}...`;
    }
  };

  return (
    <div className="w-full lg:max-w-sm items-center space-y-2">
      <Label
        htmlFor={name}
        className="flex items-center gap-2 mb-2 text-sm lg:text-md text-gray-600 font-semibold"
      >
        <span>{displayLabel}</span>
        {required && <span className="text-red-500 text-xl">*</span>}
      </Label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        rows="4"
        className={`
          block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg 
          focus:outline-none focus:ring-2 
          ${
            !isValid
              ? 'ring-2 ring-red-600 border-red-600'
              : 'border-gray-300 focus:ring-[#46B038]'
          }
        `}
        placeholder={getPlaceholderText(name)}
        autoComplete="off"
        required={required}
      />
      {!isValid && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default TextArea;
