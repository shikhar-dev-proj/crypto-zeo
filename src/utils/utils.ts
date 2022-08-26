import axios from "axios";
import {
  ColumnDefinition,
  ColumnDefinitions,
  OptionType,
} from "../types/types";

export async function querySubgraph(queryString: String) {
  const pools = await axios.post(
    "https://gateway.thegraph.com/api/1464c9756cf848bb444930c8f1ccdf87/subgraphs/id/3nXfK3RbFrj6mhkGdoKRowEEti2WvmUdxmz73tben6Mb",
    {
      query: queryString,
    }
  );
  console.log(pools);
  return pools;
}

export const UserPoolDefinition: ColumnDefinitions = {
  keyProperty: "id",
  definations: [
    { label: "User Address", property: "user" },
    { label: "PoolName", property: "poolName" },
    { label: "Net Size of pool", property: "netSize" },
    { label: " Average Return ", property: "averageReturn" },
  ],
};

export const UserProfitLossDefinition: ColumnDefinitions = {
  keyProperty: "id",
  definations: [
    { label: "User Address", property: "user" },
    { label: "Total Deposits", property: "totalDepositsInUsd" },
    { label: "Total Net Worth", property: "totalNetWorthInUsd" },
    { label: "Total Profit Loss", property: "totalProfitLossInUsd" },
  ],
};
export const CatalogOptionsData: OptionType[] = [
  {
    label: "Owns a Pool that contains ETH",
    value: `userOwnedPools(where :{poolName_contains:"alETH"}) {
        id
        address
        user
        poolName
        totalLocked
        totalAvailable
        netSize
        averageReturn
      }`,
    dataKey: "userOwnedPools",
  },
  {
    label: "Users who have made a Profit",
    dataKey: "userOwnedPools",
    value: `
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
  `,
  },
];
