export type IdName = {
  id: string
  name: string
}
export type Data = {
  headers: IdName[]
  rows: any[]
}

export const toData = (response: any): Data => {
  return {
    headers: [{
      id: 'walletId',
      name: 'User'
    }, {
      id: 'pool',
      name: 'Pools'
    }, {
      id: 'vaultsDepositsInUsd',
      name: 'Vault Deposits ($)'
    }, {
      id: 'vaultsNetWorthInUsd',
      name: 'Vault Net Worth ($)'
    }, {
      id: 'vaultsProfitLossInUsd',
      name: 'Vault Profit/Loss ($)'
    }, {
      id: 'vaultsProfitLossPercent',
      name: 'Vault Profit/Loss (%)'
    }, {
      id: 'transactions',
      name: 'Vault Transactions'
    }],
    rows: [...response]
  }
}