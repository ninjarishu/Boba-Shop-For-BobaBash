export type Screen = "loading" | "menu" | "shop";

export type PrepStep =
  | "cup"
  | "straw"
  | "pearls"
  | "tea"
  | "serve";

export const PREP_STEPS: PrepStep[] = ["cup", "straw", "pearls", "tea", "serve"];

export interface Flavor {
  id: string;
  name: string;
  shortName: string;
  color: string;
  creamColor: string;
  pearlColor: string;
  description: string;
}

export interface Customer {
  id: number;
  name: string;
  emoji: string;
  dialogue: string;
  flavorId: string;
  needsPearls: boolean;
  needsTea: boolean;
}

export interface GameState {
  screen: Screen;
  coins: number;
  completedOrders: number;
  soundEnabled: boolean;
  tutorialSeen: boolean;
}
