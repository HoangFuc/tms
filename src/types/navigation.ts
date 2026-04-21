import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';

// ─── Auth ────────────────────────────────────────────────────────────────────
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  RegisterSuccess: undefined;
  ForgotPassword: undefined;
};

// ─── Entry Stack ─────────────────────────────────────────────────────────────
export type EntryStackParamList = {
  Entry: undefined;
  EstablishRoutes: { warehouseQrCode: string };
  ListDelivery: { warehouseQrCode: string };
};

// ─── Route Stack ─────────────────────────────────────────────────────────────
export type RouteStackParamList = {
  Route: undefined;
  RouteDetail: { routeId: string };
};

// ─── Status Stack ────────────────────────────────────────────────────────────
export type StatusStackParamList = {
  Status: undefined;
  FilterStatus: { date?: string };
};

// ─── Setting Stack ───────────────────────────────────────────────────────────
export type SettingStackParamList = {
  Setting: undefined;
  ChangeInfo: undefined;
};

// ─── Main Tabs ───────────────────────────────────────────────────────────────
export type MainTabParamList = {
  EntryTab: undefined;
  RouteTab: undefined;
  AssignmentList: undefined;
  StatusTab: undefined;
  SettingTab: undefined;
};

// ─── Root ─────────────────────────────────────────────────────────────────────
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

// ─── Screen Props helpers ─────────────────────────────────────────────────────
export type AuthScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;

export type EntryScreenProps<T extends keyof EntryStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<EntryStackParamList, T>,
    BottomTabScreenProps<MainTabParamList>
  >;
