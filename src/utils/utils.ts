import axios from "axios";
import {
  ColumnDefinition,
  ColumnDefinitions,
  OptionType,
  QueryType,
} from "../types/types";

export async function querySubgraph(queryString: String) {
  const pools = await axios.post(
    "https://gateway.thegraph.com/api/1464c9756cf848bb444930c8f1ccdf87/subgraphs/id/3nXfK3RbFrj6mhkGdoKRowEEti2WvmUdxmz73tben6Mb",
    {
      query: queryString,
    }
  );
  //   console.log(pools);
  return pools;
}

export const UserPoolDefinition: ColumnDefinitions = {
  keyProperty: "id",
  definations: [
    { label: "User Address", property: "user", formatter: "formatAddress" },
    { label: "PoolName", property: "poolName" },
    {
      label: "Net Size of pool",
      property: "netSize",
      formatter: "formatBigNumber",
    },
    {
      label: " Average Return ",
      property: "averageReturn",
      formatter: "formatBigNumber",
    },
  ],
};

export const UserProfitLossDefinition: ColumnDefinitions = {
  keyProperty: "id",
  definations: [
    { label: "User Address", property: "user", formatter: "formatAddress" },
    {
      label: "Total Deposits",
      property: "totalDepositsInUsd",
      formatter: "formatBigNumber",
    },
    {
      label: "Total Net Worth",
      property: "totalNetWorthInUsd",
      formatter: "formatBigNumber",
    },
    {
      label: "Total Profit Loss",
      property: "totalProfitLossInUsd",
      formatter: "formatBigNumber",
    },
  ],
};

export const CatalogOperators = [
  { label: "=", value: "=" },
  { label: "<", value: "<" },
  { label: ">", value: ">" },
];

export const CatalogList = [
  { label: "User owned pool", value: "userOwnedPools" },
  { label: "User Profit Losses", value: "userProfitLosses" },
  { label: "NFT", value: "userProfitLosses" },
];

export const Props: Record<string, OptionType[]> = {
  userOwnedPools: [
    { label: "Base Coin", value: "base" },
    { label: "Net Pool Size", value: "netSize" },
  ],
  userProfitLosses: [
    { label: "Total Deposits", value: "totalDepositsInUsd" },
    { label: "Total Profit", value: "totalProfitLossInUsd" },
  ],
};

export const createQueryString = ({ type, lhs, rhs, operator }: QueryType) =>
  `${type}(${lhs}${operator}${rhs})`;

export const Values: Record<string, OptionType[]> = {
  userOwnedPools: [
    { label: "Eth", value: "eth" },
    { label: "DAI", value: "dai" },
  ],
  userProfitLosses: [
    { label: "0", value: "0" },
    { label: "10", value: "10" },
  ],
};

export const QueryMap: Record<string, string> = {
  "userOwnedPools(base=eth)": `{userOwnedPools(where :{poolName_contains:"alETH"}) {
        id
        address
        user
        poolName
        totalLocked
        totalAvailable
        netSize
        averageReturn
      }}`,

  "userProfitLosses(totalProfitLossInUsd>0)": `{
  
    userProfitLosses(where:{totalProfitLossInUsd_gt:0} ) {
    id
    user
    optionNetWorthInUsd
    optionProfitLossPercent
    optionProfitLossInUsd
    vaultsDepositsInUsd
    vaultsNetWorthInUsd
    vaultsProfitLossPercent
    vaultsProfitLossInUsd
    totalDepositsInUsd
    totalNetWorthInUsd
    totalProfitLossPercent
    totalProfitLossInUsd
  
    }
  }`,
};
