import { MdOutlineDriveFileRenameOutline } from 'react-icons/md';

import ValidateInput from '@/components/shared/validateInput/ValidateInput';
import { nameof } from '@/lib/utils/nameof';
import unitFormValidationSchema, {
    UnitFormType
} from '@/lib/validations/schemas/admin/unitFormValidationSchema';

import { EDIT_UNIT_MODAL_TEXTS } from '../constants';
import { UnitNameInputProps } from '../types';

const UnitNameInput = ({
  value,
  onChange,
  errors,
  disabled = false,
}: UnitNameInputProps) => (
  <ValidateInput
    name={nameof<UnitFormType>("name")}
    value={value}
    label={EDIT_UNIT_MODAL_TEXTS.UNIT_NAME_LABEL}
    className="mb-4"
    required={true}
    errors={errors}
    autoComplete="off"
    fullWidth={true}
    variant="faded"
    color="primary"
    validationSchema={unitFormValidationSchema}
    onValueChange={onChange}
    disabled={disabled}
    endContent={
      <MdOutlineDriveFileRenameOutline className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
    }
  />
);

export default UnitNameInput;
