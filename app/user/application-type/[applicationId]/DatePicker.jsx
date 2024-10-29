import { Label } from '@/components/ui/label';
import { Calendar } from 'lucide-react';

const DatePicker = ({
  name,
  value,
  onChange,
  id,
  isValid,
  error,
  required,
}) => {
  const fieldLabels = {
    year_of_manufacturer: 'Manufacturing Year',
    date_of_hydro_test: 'Hydrostatic Test Date',
    installation_start_date: 'Installation Start Date',
    installation_complete_date: 'Installation Completion Date',
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

  const getDateConstraints = (fieldName) => {
    const today = new Date().toISOString().split('T')[0];

    switch (fieldName) {
      case 'year_of_manufacturer':
        return {
          placeholder: 'Select manufacturing date',
          max: today,
          min: '1900-01-01',
        };
      case 'date_of_hydro_test':
        return {
          placeholder: 'Select hydrostatic test date',
          max: today,
          min: '1900-01-01',
        };
      case 'installation_start_date':
        return {
          placeholder: 'Select installation start date',
          max: null, 
          min: '1900-01-01',
        };
      case 'installation_complete_date':
        return {
          placeholder: 'Select installation completion date',
          max: null, 
          min: value ? value : '1900-01-01', 
        };
      default:
        return {
          placeholder: `Select ${getDisplayLabel(fieldName).toLowerCase()}`,
          max: null,
          min: null,
        };
    }
  };

  const displayLabel = getDisplayLabel(name);
  const dateConstraints = getDateConstraints(name);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="w-full lg:max-w-sm space-y-2">
      <Label
        htmlFor={name}
        className="flex items-center gap-2 text-gray-600 font-semibold"
      >
        <span>{displayLabel}</span>
        {required && <span className="text-red-500 text-xl">*</span>}
      </Label>
      <div className="relative">
        {value && (
          <p className="text-sm font-semibold text-gray-700 mb-1">
            {formatDate(value)}
          </p>
        )}
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            type="date"
            className={`
              pl-10 w-full p-2.5 text-sm rounded-lg bg-gray-50
              focus:outline-none focus:ring-2
              ${
                !isValid
                  ? 'ring-2 ring-red-600 border-red-600'
                  : 'border border-gray-300 focus:ring-[#46B038]'
              }
            `}
            placeholder={dateConstraints.placeholder}
            name={name}
            id={id}
            onChange={onChange}
            value={value}
            required={required}
            autoComplete="off"
            max={dateConstraints.max}
            min={dateConstraints.min}
          />
        </div>
        {!isValid && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    </div>
  );
};

export default DatePicker;
