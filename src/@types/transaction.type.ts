export type CsvColumn = {
  id: string;
  name: string;
  sampleData: string;
  hasError?: boolean;
};

export type TransactionField = {
  fieldName: string;
  required: boolean;
  description?: string;
};
