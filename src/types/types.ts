export type ColumnDefinition = {
  label: string;
  property: string;
};
export type ColumnDefinitions = {
  definations: ColumnDefinition[];
  keyProperty: string;
};

export type Result<T> = {
  key: string | number;
  value: T;
};

export type CatalopOptions = {
  label: string;
  value: string;
};

export type OptionType = { value: string; label: string; dataKey: string };

export interface QueryResultType {
  userOwnedPools?: unknown[];
  userProfitLosses?: unknown[];
}
