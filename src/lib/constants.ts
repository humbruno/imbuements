import bloodyPincers from "@/assets/bloody-pincers.gif";
import deadBrain from "@/assets/piece-of-dead-brain.gif";
import protectiveCharm from "@/assets/protective-charm.gif";
import ropeBelt from "@/assets/rope-belt.gif";
import sabretooth from "@/assets/sabretooth.gif";
import silencerClaws from "@/assets/silencer-claws.gif";
import grimeleechWings from "@/assets/some-grimeleech-wings.gif";
import vampireTeeth from "@/assets/vampire-teeth.gif";
import vexclawTalon from "@/assets/vexclaw-talon.gif";

export const TABS = ["strike", "void", "vampirism"] as const;
export type Tab = (typeof TABS)[number];

export type Ingredient = {
  name: string;
  imgUrl: string;
  quantity: number;
};

export const RASHID: Map<number, string> = new Map([
  [1, "Svargrond"],
  [2, "Liberty Bay"],
  [3, "Port Hope"],
  [4, "Ankrahmun"],
  [5, "Darashia"],
  [6, "Edron"],
  [7, "Carlin"],
]);

export const INGREDIENTS: Record<Tab, Ingredient[]> = {
  void: [
    {
      name: "Rope Belt",
      imgUrl: ropeBelt,
      quantity: 25,
    },
    {
      name: "Silencer Claws",
      imgUrl: silencerClaws,
      quantity: 25,
    },
    {
      name: "Some Grimeleech Wings",
      imgUrl: grimeleechWings,
      quantity: 5,
    },
  ],
  vampirism: [
    {
      name: "Vampire Teeth",
      imgUrl: vampireTeeth,
      quantity: 25,
    },
    {
      name: "Bloody Pincers",
      imgUrl: bloodyPincers,
      quantity: 15,
    },
    {
      name: "Piece of Dead Brain",
      imgUrl: deadBrain,
      quantity: 5,
    },
  ],
  strike: [
    {
      name: "Protective Charm",
      imgUrl: protectiveCharm,
      quantity: 20,
    },
    {
      name: "Sabretooth",
      imgUrl: sabretooth,
      quantity: 25,
    },
    {
      name: "Vexclaw Talon",
      imgUrl: vexclawTalon,
      quantity: 5,
    },
  ],
};
