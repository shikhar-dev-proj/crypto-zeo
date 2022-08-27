import Select, { MultiValue, SingleValue } from "react-select";
import { OptionType } from "../types/types";
export type QuerySearchBarProps = {
  options: OptionType[];
  selectedOptions?: OptionType[];
  placeholder?: string;
  multi?: boolean;
  onChange?: (selectedOptions: OptionType[]) => void;
  width?: number;
};
export function QuerySearchBar(props: QuerySearchBarProps) {
  const { width = "100%" } = props;
  const customStyles = {
    container: (provided: any, state: any) => ({
      ...provided,
      width: width,
    }),
    menu: (provided: any, state: any) => ({
      ...provided,
      color: "#000",
    }),
  };

  const handleMultiChange = (selectedOptions: MultiValue<OptionType>) =>
    props.onChange && props.onChange(selectedOptions as OptionType[]);

  const handleSingleChange = (selectedOptions: SingleValue<OptionType>) =>
    props.onChange && props.onChange([selectedOptions] as OptionType[]);

  return (
    <Select
      placeholder={props.placeholder || "Select"}
      defaultValue={props.selectedOptions}
      onChange={(options, action) =>
        props.multi && options
          ? handleMultiChange(options as MultiValue<OptionType>)
          : handleSingleChange(options as SingleValue<OptionType>)
      }
      isMulti={!!props.multi}
      styles={customStyles}
      options={props.options}
    />
  );
}
