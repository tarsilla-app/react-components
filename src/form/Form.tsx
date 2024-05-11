import { FieldValues, FormProvider, UseFormReturn, useForm as useHookForm } from 'react-hook-form';

import { Column } from './column';
import styles from './Form.module.css';
import { Row } from './row';
import { Tab } from './tab';
import { Contract, ContractColumn, ContractField, ContractRow, ContractTab, CustomField } from './types';
import { TabWrapper } from '../tab';

function validateContract(contract: Contract): void {
  const v = [contract.rows, contract.columns, contract.tabs].filter(Boolean);
  if (v.length > 1) {
    throw new Error(); // TODO: message
  }
  contract.rows?.forEach((row) => {
    const rv = [row.fields, row.rows, row.columns].filter(Boolean);
    if (rv.length > 1) {
      throw new Error(); // TODO: message
    }
  });
  contract.columns?.forEach((column) => {
    const rv = [column.fields, column.rows, column.columns].filter(Boolean);
    if (rv.length > 1) {
      throw new Error(); // TODO: message
    }
  });
  contract.tabs?.forEach((tab) => {
    const rv = [tab.fields, tab.rows, tab.columns].filter(Boolean);
    if (rv.length > 1) {
      throw new Error(); // TODO: message
    }
  });
  // TODO validate IDs -> n pode ser igual, no pode ter caracter especial nem espaço
}

type FormModelProps<T> = {
  contract: Contract;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  values?: T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customFields?: CustomField<any>[];
};

type FormModelType<T extends FieldValues> = {
  contract: Contract;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customFields: CustomField<any>[] | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  methods: UseFormReturn<T, any, undefined>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildFieldsValues<T>({ fields, values }: { fields?: ContractField[]; values?: T }): { id: string; value?: any }[] {
  return (
    fields?.flatMap((field) => ({
      id: field.id,
      value: values?.[field.id as keyof T] ?? '',
    })) ?? []
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildColumnsValues<T>({ columns, values }: { columns?: ContractColumn[]; values?: T }): { id: string; value?: any }[] {
  return (
    columns?.flatMap((column) => {
      return [
        ...buildFieldsValues({ fields: column.fields, values }),
        ...buildRowsValues({ rows: column.rows, values }),
        ...buildColumnsValues({ columns: column.columns, values }),
      ];
    }) ?? []
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildRowsValues<T>({ rows, values }: { rows?: ContractRow[]; values?: T }): { id: string; value?: any }[] {
  return (
    rows?.flatMap((row) => {
      return [
        ...buildFieldsValues({ fields: row.fields, values }),
        ...buildRowsValues({ rows: row.rows, values }),
        ...buildColumnsValues({ columns: row.columns, values }),
      ];
    }) ?? []
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildTabsValues<T>({ tabs, values }: { tabs?: ContractTab[]; values?: T }): { id: string; value?: any }[] {
  return (
    tabs?.flatMap((tab) => {
      return [
        ...buildFieldsValues({ fields: tab.fields, values }),
        ...buildRowsValues({ rows: tab.rows, values }),
        ...buildColumnsValues({ columns: tab.columns, values }),
      ];
    }) ?? []
  );
}

function buildValues<T>({ contract, values }: FormModelProps<T>): T {
  const allValues = [
    ...buildTabsValues({ tabs: contract.tabs, values }),
    ...buildRowsValues({ rows: contract.rows, values }),
    ...buildColumnsValues({ columns: contract.columns, values }),
  ];
  return allValues.reduce((returnValue, value) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    returnValue[value.id as keyof T] = value.value;
    return returnValue;
  }, {} as T);
}

function useForm<T extends FieldValues>({ contract, values, customFields }: FormModelProps<T>): FormModelType<T> {
  const methods = useHookForm<T>({ values: buildValues({ contract, values }) });
  return {
    contract,
    customFields,
    methods,
  };
}

function Form<T extends FieldValues>({ form }: { form: FormModelType<T> }): JSX.Element {
  const { contract, methods, customFields } = form;
  validateContract(contract);

  //TODO reset nao ta limpando
  return (
    <FormProvider {...methods}>
      <div
        className={styles.form}
        style={{
          '--flex-flow': contract.rows ? 'column' : 'row',
        }}
      >
        {contract.rows?.map((row, index) => <Row contract={row} customFields={customFields} key={index} />)}
        {contract.columns?.map((column, index) => <Column contract={column} customFields={customFields} key={index} />)}
        {contract.tabs && (
          <TabWrapper
            tabs={contract.tabs.map((tab, index) => ({
              header: <>{tab.title}</>,
              content: <Tab contract={tab} customFields={customFields} key={index} />,
            }))}
          />
        )}
      </div>
    </FormProvider>
  );
}

export { Form, useForm };
