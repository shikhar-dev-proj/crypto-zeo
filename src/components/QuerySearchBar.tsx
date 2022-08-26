import Select, { MultiValue, SingleValue } from "react-select";
import { OptionType } from "../types/types";
export type QuerySearchBarProps = {
  options: OptionType[];
  selectedOptions?: OptionType[];
  onChange?: (selectedOptions: OptionType[]) => void;
};
export function QuerySearchBar(props: QuerySearchBarProps) {
  const customStyles = {
    container: (provided: any, state: any) => ({
      ...provided,
      width: "100%",
    }),
    menu: (provided: any, state: any) => ({
      ...provided,
      color: "#000",
    }),
  };

  const handleMultiChange = (
    selectedOptions: MultiValue<OptionType>,
    action: unknown
  ) => props.onChange && props.onChange(selectedOptions as OptionType[]);

  const handleSingleChange = (
    selectedOptions: SingleValue<OptionType>,
    action: unknown
  ) => props.onChange && props.onChange([selectedOptions] as OptionType[]);

  return (
    <Select
      defaultValue={props.selectedOptions}
      isMulti
      onChange={handleMultiChange}
      styles={customStyles}
      options={props.options}
    />
  );
}
