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
      imgUrl: "/rope-belt.gif",
      quantity: 25,
    },
    {
      name: "Silencer Claws",
      imgUrl: "/silencer-claws.gif",
      quantity: 25,
    },
    {
      name: "Some Grimeleech Wings",
      imgUrl: "/some-grimeleech-wings.gif",
      quantity: 5,
    },
  ],
  vampirism: [
    {
      name: "Vampire Teeth",
      imgUrl: "/vampire-teeth.gif",
      quantity: 25,
    },
    {
      name: "Bloody Pincers",
      imgUrl: "/bloody-pincers.gif",
      quantity: 15,
    },
    {
      name: "Piece of Dead Brain",
      imgUrl: "/piece-of-dead-brain.gif",
      quantity: 5,
    },
  ],
  strike: [
    {
      name: "Protective Charm",
      imgUrl: "/protective-charm.gif",
      quantity: 20,
    },
    {
      name: "Sabretooth",
      imgUrl: "/sabretooth.gif",
      quantity: 25,
    },
    {
      name: "Vexclaw Talon",
      imgUrl: "/vexclaw-talon.gif",
      quantity: 5,
    },
  ],
};
