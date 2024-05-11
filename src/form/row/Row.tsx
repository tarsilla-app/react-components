import styles from './Row.module.css';
import { Column } from '../column';
import { Field } from '../field';
import { ContractRow, CustomField } from '../types';

type Props = {
  contract: ContractRow;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customFields?: CustomField<any>[];
};

function Row({ contract, customFields }: Props): JSX.Element {
  return (
    <div className={styles.row}>
      {contract.fields?.map((field, index) => (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        <Field field={field} key={index} customFields={customFields} />
      ))}
      {contract.rows?.map((row, index) => <Row contract={row} customFields={customFields} key={index} />)}
      {contract.columns?.map((column, index) => <Column contract={column} customFields={customFields} key={index} />)}
    </div>
  );
}

export { Row };
