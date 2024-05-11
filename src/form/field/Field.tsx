import { Controller, useFormContext } from 'react-hook-form';

import styles from './Field.module.css';
import { Input } from '../../input';
import { Option, Select } from '../../select';
import { TextArea } from '../../textarea';
import { ContractField, CustomField } from '../types';

const inputField: CustomField<string> = {
  id: 'input',
  render: ({ value, onChange, fieldProps }: { value?: string; onChange: (value?: string) => void; fieldProps?: object }) => {
    return <Input {...fieldProps} value={value} onChange={(event) => onChange(event.target.value)} />;
  },
};

const textAreaField: CustomField<string> = {
  id: 'textarea',
  render: ({ value, onChange, fieldProps }: { value?: string; onChange: (value?: string) => void; fieldProps?: object }) => {
    return <TextArea {...fieldProps} value={value} onChange={(event) => onChange(event.target.value)} />;
  },
};

const selectField: CustomField<Option | Option[]> = {
  id: 'select',
  render: ({ value, onChange, fieldProps }: { value?: Option | Option[]; onChange: (value?: Option | Option[]) => void; fieldProps?: object }) => {
    return <Select {...fieldProps} value={value} onChange={(newValue: Option | Option[] | undefined) => onChange(newValue)} />;
  },
};

type Props = {
  field: ContractField;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customFields?: CustomField<any>[];
};

function Field({ field, customFields }: Props): JSX.Element {
  const { control } = useFormContext();
  const customField = customFields?.find((cf) => cf.id === field.type);
  if (customField) {
    return (
      <div className={styles.field}>
        {field.title && <>{field.title}:</>}
        <Controller
          name={field.id}
          control={control}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          render={({ field: { onChange, value } }) => <customField.render value={value} onChange={onChange} fieldProps={field.fieldProps} />}
        />
      </div>
    );
  }

  if (field.type === 'input') {
    return (
      <div className={styles.field}>
        {field.title && <>{field.title}:</>}
        <Controller
          name={field.id}
          control={control}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          render={({ field: { onChange, value } }) => <inputField.render value={value} onChange={onChange} fieldProps={field.fieldProps} />}
        />
      </div>
    );
  } else if (field.type === 'textarea') {
    return (
      <div className={styles.field}>
        {field.title && <>{field.title}:</>}
        <Controller
          name={field.id}
          control={control}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          render={({ field: { onChange, value } }) => <textAreaField.render value={value} onChange={onChange} fieldProps={field.fieldProps} />}
        />
      </div>
    );
  } else if (field.type === 'select') {
    return (
      <div className={styles.field}>
        {field.title && <>{field.title}:</>}
        <Controller
          name={field.id}
          control={control}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          render={({ field: { onChange, value } }) => <selectField.render value={value} onChange={onChange} fieldProps={field.fieldProps} />}
        />
      </div>
    );
  }

  return <></>;
}

export { Field };
