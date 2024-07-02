export type Wallet = 'Connected' | 'Disconnected';
export type Navbar = 'Minimized' | 'Collapsed' | 'Opened';
export type TabType = 'Actions' | 'Details' | 'Settings';
export type SubTabType =
  'Mint' | 'Burn' | 'NFTs' |
  'Zap' | 'Deposit' | 'Withdraw' |
  'Help' | 'Currency' | 'Signals' |
  'Merge' | 'BurnNFT' |
  'Harvest' | 'Claim' |
  'Distribute' | 'Manage' | 'ClaimNFT';
export type ButtonArea = 'Hidden' | 'Disabled' | 'Enabled';
export type Page = 'LandingPage' | 'Mission' | 'Wealth' | 'Work' | 'Community' | 'Dashboard' | 'Deposits' | 'Emissions' | 'MoneyApps' | 'Gallery' | 'Performance' | 'Analytics' | 'Subscriptions';
export type TDType = "Show" | "Hide";
export type ReflectType = "FRAX" | "CRV";
export type SignalType = "" | "Curve" | "Convex" | "Bent" | "CRV wallet";

export interface FieldType {
  name: string
  symbol?: string
  type: string
  tokens?: string[]
  depositsFullName?: string
  depositsSymbol?: string
  wrapperSymbol?: string
  depositsAPR?: number
  depositsTVL?: number
  depositsLP?: number
  depositsFlag?: boolean
  depositsDepositAsset?: number[]
  depositsReRouteAsset?: number
  emissionsFullName?: string
  emissionsSymbol?: string
  emissionsTCE?: number
  emissionsAPR?: number
  emissionsDeposit?: number
  emissionsCollected?: number
  emissionsBalance?: number
  emissionsAllocated?: number
  emissionLastSignalSymbol?: string
  emissionList?: EmissionListData[]
}

export interface NFTData {
  name: string
  symbol: string
  fieldSymbol: string
  requirementA: number
  requirementB: number
}

type ReduxAction = {
  type: string
  payload: any
}

export type ReduxDispatchType = (args: ReduxAction) => void

export interface EmissionListData {
  emissionName: string
  emissionLogo: string
  emissionAmount: number
  emissionAverage: any
}

export interface Asset {
  symbol: string
  amount: number
}

export interface DepositData {
  assets: Asset[]
  reroute: boolean
  acceptTerms: boolean
  value: number
}

export interface USDDistributeListData {
  name: string
  logo: string
  amount: number
}

export interface StepListData {
  index: number
  title: string
  type: string
  image: string
}