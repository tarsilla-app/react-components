import styles from './Tab.module.css';
import { Column } from '../column';
import { Field } from '../field';
import { Row } from '../row';
import { ContractTab, CustomField } from '../types';

type Props = {
  contract: ContractTab;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customFields?: CustomField<any>[];
};

function Tab({ contract, customFields }: Props): JSX.Element {
  return (
    <div
      className={styles.tab}
      style={{
        '--flex-flow': contract.rows ? 'column' : 'row',
      }}
    >
      {contract.fields?.map((field, index) => <Field field={field} key={index} customFields={customFields} />)}
      {contract.rows?.map((row, index) => <Row contract={row} customFields={customFields} key={index} />)}
      {contract.columns?.map((column, index) => <Column contract={column} customFields={customFields} key={index} />)}
    </div>
  );
}

export { Tab };
