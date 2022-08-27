export const formatAddress = (addr: string): string =>
  addr?.slice(0, 4) + "...." + addr?.slice(addr.length - 4, addr.length);

export const formatBigNumber = (val: string) => {
  // Nine Zeroes for Billions
  // const val = Math.round(+labelValue/1e+18).toString()
  var sign = "";
  if (Number(val) < 0) sign = "-";
  return (
    sign +
    (Math.abs(Number(val)) >= 1.0e9
      ? Math.abs(Number(val)) / 1.0e9 + "B"
      : // Six Zeroes for Millions
      Math.abs(Number(val)) >= 1.0e6
      ? Math.abs(Number(val)) / 1.0e6 + "M"
      : // Three Zeroes for Thousands
      Math.abs(Number(val)) >= 1.0e3
      ? Math.abs(Number(val)) / 1.0e3 + "K"
      : Math.abs(Number(val)))
  );
};

export const formatNftObject = (value: any) => {
  return `category:${value.category} name:${
    value.name ? formatAddress(value.name) : ""
  }`;
};

export const format = (value: any, formatter: string): string => {
  switch (formatter) {
    case "formatBigNumber":
      return `${formatBigNumber(value)}`;
    case "formatAddress":
      return formatAddress(value);
    case "formatNftObject":
      return formatNftObject(value);
    default:
      return value.toString();
  }
};
