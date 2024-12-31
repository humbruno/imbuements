import { Ingredient } from "@/lib/constants";
import { NumberInput } from "./number-input";

type Props = {
  ingredient: Ingredient;
};

export function IngredientInput({ ingredient }: Props) {
  return (
    <div className="mt-2">
      <div key={ingredient.name} className="flex gap-2 items-center">
        <img
          src={ingredient.imgUrl}
          alt={`${ingredient.name} icon`}
          className="size-8"
        />
        <p>
          x{ingredient.quantity} {ingredient.name}
        </p>
      </div>
      <div className="flex mt-2 items-center gap-2">
        <NumberInput placeholder="41781" />
        <p>gp</p>
      </div>
    </div>
  );
}
