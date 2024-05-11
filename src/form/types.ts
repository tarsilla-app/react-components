type Contract = {
  rows?: ContractRow[];
  columns?: ContractColumn[];
  tabs?: ContractTab[];
};

type ContractRow = {
  id: string;
  fields?: ContractField[];
  rows?: ContractRow[];
  columns?: ContractColumn[];
};

type ContractColumn = {
  id: string;
  fields?: ContractField[];
  rows?: ContractRow[];
  columns?: ContractColumn[];
};

type ContractTab = {
  id: string;
  title: string;
  fields?: ContractField[];
  rows?: ContractRow[];
  columns?: ContractColumn[];
};

type ContractField = {
  id: string;
  type: string;
  title?: string;
  fieldProps?: object;
};

type CustomField<V> = {
  id: string;
  render: (props: { value?: V; onChange: (value?: V) => void; fieldProps?: object }) => JSX.Element;
};

type Value<V extends string | string[] | number | number[] | object | object[]> = {
  id: string;
  value?: V;
};

export { Contract, ContractRow, ContractColumn, ContractTab, ContractField, CustomField, Value };
