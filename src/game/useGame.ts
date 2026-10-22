import { useCallback, useEffect, useState } from "react";
import {
  COINS_KEY,
  COIN_REWARD,
  CUSTOMER_EMOJIS,
  CUSTOMER_NAMES,
  DIALOGUE_LINES,
  FLAVORS,
  ORDERS_KEY,
  SOUND_KEY,
  TUTORIAL_SEEN_KEY,
} from "./constants";
import type { Customer, Flavor, GameState, PrepStep } from "./types";
import { setSoundEnabled as setSndEnabled } from "./sounds";

const INGREDIENT_STEPS: PrepStep[] = ["cup", "straw", "pearls", "tea"];
const STEP_NAMES: Record<PrepStep, string> = {
  cup: "cup",
  straw: "straw",
  pearls: "tapioca pearls",
  tea: "tea",
  serve: "the bell",
};

function getRequiredSteps(customer: Pick<Customer, "needsPearls" | "needsTea">): PrepStep[] {
  return [
    "cup",
    "straw",
    ...(customer.needsPearls ? ["pearls" as const] : []),
    ...(customer.needsTea ? ["tea" as const] : []),
    "serve",
  ];
}

function createButtonOrder(): PrepStep[] {
  const order = [...INGREDIENT_STEPS];
  if (Math.random() < 0.35) {
    for (let index = order.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [order[index], order[swapIndex]] = [order[swapIndex], order[index]];
    }
  }
  return order;
}

function loadNumber(key: string, fallback: number): number {
  try {
    const v = localStorage.getItem(key);
    return v ? parseInt(v, 10) || fallback : fallback;
  } catch {
    return fallback;
  }
}

function loadBool(key: string, fallback: boolean): boolean {
  try {
    const v = localStorage.getItem(key);
    return v === null ? fallback : v === "true";
  } catch {
    return fallback;
  }
}

let customerIdCounter = 1;

function generateCustomer(): Customer {
  const nameIdx = Math.floor(Math.random() * CUSTOMER_NAMES.length);
  const emojiIdx = Math.floor(Math.random() * CUSTOMER_EMOJIS.length);
  const dialogueIdx = Math.floor(Math.random() * DIALOGUE_LINES.length);
  const flavorIdx = Math.floor(Math.random() * FLAVORS.length);
  const orderType = Math.floor(Math.random() * 3);
  return {
    id: customerIdCounter++,
    name: CUSTOMER_NAMES[nameIdx],
    emoji: CUSTOMER_EMOJIS[emojiIdx],
    dialogue: DIALOGUE_LINES[dialogueIdx],
    flavorId: FLAVORS[flavorIdx].id,
    needsPearls: orderType !== 1,
    needsTea: orderType !== 2,
  };
}

export function useGame() {
  const [coins, setCoins] = useState(() => loadNumber(COINS_KEY, 0));
  const [completedOrders, setCompletedOrders] = useState(() => loadNumber(ORDERS_KEY, 0));
  const [soundEnabled, setSoundEnabledState] = useState(() => loadBool(SOUND_KEY, true));
  const [tutorialSeen, setTutorialSeen] = useState(() => loadBool(TUTORIAL_SEEN_KEY, false));
  const [currentStep, setCurrentStep] = useState<PrepStep>("cup");
  const [drink, setDrink] = useState({ hasCup: false, hasStraw: false, hasPearls: false, hasTea: false });
  const [customer, setCustomer] = useState<Customer>(() => generateCustomer());
  const [buttonOrder, setButtonOrder] = useState<PrepStep[]>(() => createButtonOrder());
  const [mistakes, setMistakes] = useState(0);
  const [selectedFlavor, setSelectedFlavor] = useState<Flavor | null>(null);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState<"info" | "success" | "error">("info");
  const [showFlavorPicker, setShowFlavorPicker] = useState(false);
  const [isServing, setIsServing] = useState(false);
  const [showCoinAnim, setShowCoinAnim] = useState(false);

  useEffect(() => {
    try { localStorage.setItem(COINS_KEY, String(coins)); } catch { /* ignore */ }
  }, [coins]);
  useEffect(() => {
    try { localStorage.setItem(ORDERS_KEY, String(completedOrders)); } catch { /* ignore */ }
  }, [completedOrders]);
  useEffect(() => {
    try { localStorage.setItem(SOUND_KEY, String(soundEnabled)); } catch { /* ignore */ }
    setSndEnabled(soundEnabled);
  }, [soundEnabled]);
  useEffect(() => {
    try { localStorage.setItem(TUTORIAL_SEEN_KEY, String(tutorialSeen)); } catch { /* ignore */ }
  }, [tutorialSeen]);

  const currentFlavor = FLAVORS.find((f) => f.id === customer.flavorId) ?? FLAVORS[0];

  const giveFeedback = useCallback((msg: string, type: "info" | "success" | "error" = "info") => {
    setFeedback(msg);
    setFeedbackType(type);
  }, []);

  const resetPrep = useCallback(() => {
    setCurrentStep("cup");
    setDrink({ hasCup: false, hasStraw: false, hasPearls: false, hasTea: false });
    setSelectedFlavor(null);
    setShowFlavorPicker(false);
    setFeedback("");
    setFeedbackType("info");
    setMistakes(0);
    setIsServing(false);
  }, []);

  const advanceStep = useCallback(
    (step: PrepStep) => {
      const requiredSteps = getRequiredSteps(customer);
      const index = requiredSteps.indexOf(step);
      if (index < requiredSteps.length - 1) {
        setCurrentStep(requiredSteps[index + 1]);
      }
    },
    [customer]
  );

  const registerMistake = useCallback(
    (attemptedStep: PrepStep, customMessage?: string) => {
      if (isServing) return;
      const nextMistakes = mistakes + 1;
      setMistakes(nextMistakes);
      if (nextMistakes >= 3) {
        const runsAway = Math.random() < 0.5;
        setIsServing(true);
        giveFeedback(
          runsAway
            ? `${customer.name} ran away! A new customer is coming...`
            : `${customer.name} wants to restart the order. Try again!`,
          "error"
        );
        window.setTimeout(() => {
          resetPrep();
          setButtonOrder(runsAway ? createButtonOrder() : buttonOrder);
          if (runsAway) setCustomer(generateCustomer());
        }, 1400);
        return;
      }
      giveFeedback(
        `${customMessage ?? `Not yet! Do ${STEP_NAMES[currentStep]} next.`} Mistake ${nextMistakes}/3.`,
        "error"
      );
      void attemptedStep;
    },
    [buttonOrder, customer.name, currentStep, giveFeedback, isServing, mistakes, resetPrep]
  );

  const attemptStep = useCallback(
    (step: PrepStep): boolean => {
      if (isServing) return false;
      if (currentStep !== step) {
        registerMistake(step);
        return false;
      }
      return true;
    },
    [currentStep, isServing, registerMistake]
  );

  const selectCup = useCallback(() => {
    if (!attemptStep("cup")) return;
    setDrink((current) => ({ ...current, hasCup: true }));
    advanceStep("cup");
    giveFeedback("Cup selected! Keep working through the control unit.", "success");
  }, [advanceStep, attemptStep, giveFeedback]);

  const addStraw = useCallback(() => {
    if (!attemptStep("straw")) return;
    setDrink((current) => ({ ...current, hasStraw: true }));
    advanceStep("straw");
    giveFeedback("Straw added! Keep working through the control unit.", "success");
  }, [advanceStep, attemptStep, giveFeedback]);

  const addPearls = useCallback(() => {
    if (!attemptStep("pearls")) return;
    setDrink((current) => ({ ...current, hasPearls: true }));
    advanceStep("pearls");
    giveFeedback(customer.needsTea ? "Pearls scooped! Use the tea control next." : "Pearls scooped! Ring the bell next.", "success");
  }, [advanceStep, attemptStep, customer.needsTea, giveFeedback]);

  const openFlavorPicker = useCallback(() => {
    if (!attemptStep("tea")) return;
    setShowFlavorPicker(true);
  }, [attemptStep]);

  const selectFlavor = useCallback(
    (flavor: Flavor) => {
      if (!attemptStep("tea")) return;
      if (flavor.id === customer.flavorId) {
        setSelectedFlavor(flavor);
        setDrink((current) => ({ ...current, hasTea: true }));
        setShowFlavorPicker(false);
        advanceStep("tea");
        giveFeedback(`${flavor.name} poured! Ring the bell next.`, "success");
      } else {
        registerMistake("tea", `Wrong flavor! ${customer.name} ordered ${currentFlavor.name}.`);
      }
    },
    [advanceStep, attemptStep, currentFlavor.name, customer.flavorId, customer.name, giveFeedback, registerMistake]
  );

  const serve = useCallback(() => {
    if (!attemptStep("serve")) return;
    setIsServing(true);
    giveFeedback(`${customer.name} loved it!`, "success");
    setShowCoinAnim(true);

    window.setTimeout(() => {
      setCoins((c) => c + COIN_REWARD);
      setCompletedOrders((n) => n + 1);
    }, 600);

    window.setTimeout(() => {
      setShowCoinAnim(false);
      resetPrep();
      setButtonOrder(createButtonOrder());
      setCustomer(generateCustomer());
    }, 1800);
  }, [attemptStep, customer.name, giveFeedback, resetPrep]);

  const toggleSound = useCallback(() => setSoundEnabledState((s) => !s), []);
  const markTutorialSeen = useCallback(() => setTutorialSeen(true), []);

  const gameState: GameState = {
    screen: "shop",
    coins,
    completedOrders,
    soundEnabled,
    tutorialSeen,
  };

  return {
    coins,
    completedOrders,
    soundEnabled,
    tutorialSeen,
    currentStep,
    drink,
    customer,
    currentFlavor,
    buttonOrder,
    mistakes,
    selectedFlavor,
    feedback,
    feedbackType,
    showFlavorPicker,
    isServing,
    showCoinAnim,
    gameState,
    selectCup,
    addStraw,
    addPearls,
    openFlavorPicker,
    selectFlavor,
    serve,
    toggleSound,
    markTutorialSeen,
    giveFeedback,
    resetPrep,
  };
}
