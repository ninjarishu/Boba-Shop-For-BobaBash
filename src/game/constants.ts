import type { Flavor } from "./types";

export const COLORS = {
  cream: "#FFF5E5",
  espresso: "#49302C",
  strawberry: "#FFB8CA",
  peach: "#FFC99F",
  sage: "#C8E4AD",
  lavender: "#D9BDFF",
  skyBlue: "#B9DDFF",
} as const;

export const COIN_REWARD = 10;

export const FLAVORS: Flavor[] = [
  {
    id: "brown_sugar",
    name: "Brown Sugar Cloud",
    shortName: "Brown Sugar",
    color: "#B8743A",
    creamColor: "#F5E6D3",
    pearlColor: "#3B2418",
    description: "Rich brown sugar syrup with creamy milk.",
  },
  {
    id: "matcha",
    name: "Matcha Muse",
    shortName: "Matcha",
    color: "#9BC962",
    creamColor: "#E8F5D8",
    pearlColor: "#4A6B2A",
    description: "Earthy green tea with a frothy finish.",
  },
  {
    id: "taro",
    name: "Taro Dream",
    shortName: "Taro",
    color: "#C8A8E0",
    creamColor: "#EDE0F5",
    pearlColor: "#7A5A9E",
    description: "Sweet purple taro root blended with milk.",
  },
  {
    id: "strawberry",
    name: "Strawberry Cloud",
    shortName: "Strawberry",
    color: "#FF8FA8",
    creamColor: "#FFE0E8",
    pearlColor: "#D44A6A",
    description: "Fresh strawberry puree with fluffy cream.",
  },
  {
    id: "blueberry",
    name: "Blueberry Velvet",
    shortName: "Blueberry",
    color: "#8A9EF0",
    creamColor: "#D8E0FF",
    pearlColor: "#4A5AAE",
    description: "Smooth blueberry velvet with a hint of vanilla.",
  },
];

export const CUSTOMER_NAMES = [
  "Mochi", "Pip", "Coco", "Bean", "Suki", "Nori", "Yuki",
  "Tofu", "Bao", "Mango", "Sage", "Luna", "Penny", "Dango",
  "Whisk", "Olive", "Pepper", "Nico", "Hazel", "Pudding",
];

export const CUSTOMER_EMOJIS = [
  "🐱", "🐰", "🐻", "🐼", "🦊", "🐸", "🐹", "🐨",
  "🐯", "🐧", "🦄", "🐮", "🐷", "🦝",
];

export const DIALOGUE_LINES = [
  "I could really use a drink!",
  "Make it extra special, please!",
  "I'm so thirsty I could faint!",
  "Surprise me with the flavor!",
  "My favorite drink, please!",
  "I heard your café is the best!",
  "Make it bubbly and sweet!",
  "I've been craving this all day!",
  "Let's see what you've got!",
  "I love a cozy boba shop!",
];

export const LOADING_MESSAGES = [
  "Warming up the tea kettles...",
  "Cooking tapioca pearls...",
  "Polishing the glass cups...",
  "Arranging the counter...",
  "Fluffing the cream clouds...",
  "Opening the shop doors...",
];

export const TUTORIAL_SEEN_KEY = "bobaTycoon_tutorialSeen";
export const COINS_KEY = "bobaTycoon_coins";
export const ORDERS_KEY = "bobaTycoon_completedOrders";
export const SOUND_KEY = "bobaTycoon_soundEnabled";
