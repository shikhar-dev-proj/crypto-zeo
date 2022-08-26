export const formatAddress = (addr: string): string => addr?.slice(0, 4) + '....' + addr?.slice(addr.length - 4, addr.length)

export const formatBigNumber = (val: string) => {
  // Nine Zeroes for Billions
  // const val = Math.round(+labelValue/1e+18).toString()
  return Math.abs(Number(val)) >= 1.0e+9

    ? Math.abs(Number(val)) / 1.0e+9 + "B"
    // Six Zeroes for Millions 
    : Math.abs(Number(val)) >= 1.0e+6

      ? Math.abs(Number(val)) / 1.0e+6 + "M"
      // Three Zeroes for Thousands
      : Math.abs(Number(val)) >= 1.0e+3

        ? Math.abs(Number(val)) / 1.0e+3 + "K"

        : Math.abs(Number(val));
}