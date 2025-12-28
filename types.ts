
export enum SIMBrand {
  JIO = 'jio',
  AIRTEL = 'airtel',
  VI = 'vi',
  NONE = ''
}

export enum SIMType {
  NEW = 'New SIM',
  PORT = 'Port (MNP)',
  ESIM = 'eSIM',
  REPLACEMENT = 'SIM Replacement'
}

export interface OrderDetails {
  brand: SIMBrand;
  name: string;
  mobile: string;
  simType: string;
  address: string;
  location: string;
  orderId: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
