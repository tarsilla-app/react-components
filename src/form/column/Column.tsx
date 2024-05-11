import styles from './Column.module.css';
import { Field } from '../field';
import { Row } from '../row';
import { ContractColumn, CustomField } from '../types';

type Props = {
  contract: ContractColumn;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customFields?: CustomField<any>[];
};

function Column({ contract, customFields }: Props): JSX.Element {
  return (
    <div className={styles.column}>
      {contract.fields?.map((field, index) => <Field field={field} key={index} customFields={customFields} />)}
      {contract.rows?.map((row, index) => <Row contract={row} customFields={customFields} key={index} />)}
      {contract.columns?.map((column, index) => <Column contract={column} customFields={customFields} key={index} />)}
    </div>
  );
}

export { Column };
