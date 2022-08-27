export type IdName = {
  id: string;
  name: string;
};
export type Data = {
  headers: IdName[];
  rows: any[];
};

export const toData = (response: any, type: string): Data => {
  if (type === "nft") {
    return {
      headers: [
        {
          id: "walletId",
          name: "User",
        },
        {
          id: "spent",
          name: "Spent",
        },
        {
          id: "purchases",
          name: "Purchases($)",
        },
        {
          id: "earned",
          name: "Earned ($)",
        },
        {
          id: "nfts",
          name: "NFTs",
        },
      ],
      rows: [...response],
    };
  }
  return {
    headers: [
      {
        id: "walletId",
        name: "User",
      },
      {
        id: "pool",
        name: "Pools",
      },
      {
        id: "vaultsDepositsInUsd",
        name: "Vault Deposits ($)",
      },
      {
        id: "vaultsNetWorthInUsd",
        name: "Vault Net Worth ($)",
      },
      {
        id: "vaultsProfitLossInUsd",
        name: "Vault Profit/Loss ($)",
      },
      {
        id: "vaultsProfitLossPercent",
        name: "Vault Profit/Loss (%)",
      },
      {
        id: "transactions",
        name: "Vault Transactions",
      },
    ],
    rows: [...response],
  };
};
