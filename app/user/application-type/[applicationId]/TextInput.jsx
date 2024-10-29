import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const TextInput = ({
  id,
  name,
  type,
  value,
  onChange,
  fieldCustomType,
  isValid,
  error,
  required,
}) => {
  const fieldLabels = {
    equipment_incidental: 'Equipment Incidental',
    type_of_facility: 'Facility Type',
    code_of_construction: 'Construction Code',
    year_of_manufacturer: ' Year of Manufacturer',
    place_of_manufacture: 'Place of Manufacture',
    hydro_test_pressure: 'Hydrostatic Test Pressure',
    date_of_hydro_test: 'Date of Hydro Test',
    inspection_agency: 'Inspection Agency',
    aia_authorization: 'AIA Authorization',
    equipment_distinctive: 'Equipment Distinctive ',
    equipment_type: 'Equipment Type',
    mawp_or_mdmt: 'MAWP/MDMT',
    design_presure: 'Design Pressure',
    operating_medium: 'Operating Medium',
    equipment_line: 'Equipment Line Number',
    manufacturer: 'Manufacturer',
    new_or_used: 'Equipment Condition (New/Used)',
    intended_use_of_equipment: 'Intended use of Equipment',
    object_use: 'Object Use',
    installation_start_date: 'Installation Start Date',
    installation_complete_date: 'Installation Completion Date',
    installer_name: 'Installer Name',
    installer_physical_address: 'Installer Physical Address',
    quality_cert_of_installer_comppany:
      'Installer Company Quality Certification',
    installer_authorization: 'Installer Authorization',
    installer_contact_person: 'Installer Contact Person',
    installer_telephone: 'Installer Telephone',
    installer_email: 'Installer Email',
    name_of_occupier_or_owner: 'Occupier/Owner Name',
    nature_of_manufacturing_process: 'Manufacturing Process Nature',
    owner_factory_reg: 'Owner Factory Registration',
    owner_quality_cert_of_company: 'Owner Company Quality Certification',
    owner_email: 'Owner Email',
    owner_telephone: 'Owner Telephone',
    contact_person: 'Contact Person',
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

  // Helper function to get input type based on fieldCustomType
  const getInputType = () => {
    switch (fieldCustomType) {
      case 'EMAIL':
        return 'email';
      case 'NUMBER':
        return 'number';
      case 'PHONE':
        return 'tel';
      default:
        return type || 'text';
    }
  };

  return (
    <div className="space-y-2 w-full lg:max-w-sm items-center">
      <Label className="text-gray-600 font-semibold" htmlFor={name}>
        <span>{displayLabel}</span>
        {required && <span className="text-red-500 text-xl">*</span>}
      </Label>
      <Input
        type={getInputType()}
        id={id}
        placeholder={`Enter ${displayLabel.toLowerCase()}`}
        name={name}
        onChange={onChange}
        value={value}
        className={`${
          !isValid
            ? 'ring-2 ring-red-600 border border-red-600'
            : 'focus-visible:ring-2 focus-visible:ring-[#46B038]'
        }`}
        autoComplete="off"
        required={required}
      />
      {!isValid && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default TextInput;
