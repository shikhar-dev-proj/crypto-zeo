import axios from "axios";
import {
  ColumnDefinition,
  ColumnDefinitions,
  OptionType,
  QueryType,
} from "../types/types";

export async function querySubgraph(queryString: String, url: string) {
  const pools = await axios.post(url, {
    query: queryString,
  });
  //   console.log(pools);
  return pools;
}
export async function updateProfile(body: any, url: string) {
  const pools = await axios.post(url, body);
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

export const NftDefinition: ColumnDefinitions = {
  keyProperty: "id",
  definations: [
    { label: "User Address", property: "address", formatter: "formatAddress" },
    {
      label: "Purchases",
      property: "purchases",
      //   formatter: "formatBigNumber",
    },
    {
      label: "Spent",
      property: "spent",
      formatter: "formatBigNumber",
    },
    {
      label: "Earned",
      property: "earned",
      formatter: "formatBigNumber",
    },
    {
      label: "NFTs",
      property: "nfts",
      formatter: "formatNftObject",
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
  { label: "NFT", value: "accounts" },
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
  accounts: [
    { label: "Category", value: "category" },
    { label: "Purchases", value: "purchases" },
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
  accounts: [
    {
      label: "parcel",
      value: "parcel",
    },
    { label: "wearable", value: "wearable" },
  ],
};

export const QueryMap: Record<string, string> = {
  "userOwnedPools(base=eth)": `{userOwnedPools(where :{poolName_contains:"WETH"}) {
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
  "accounts(category=parcel)": `
  {
    accounts (where:{
      nfts_: {
        category: parcel
      }
    }) {
      address
      purchases
      spent
      earned
      nfts {
        category
        name
        contractAddress
      }
    }
  }
  `,
};
