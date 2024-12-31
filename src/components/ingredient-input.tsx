import { Ingredient } from "@/lib/constants";
import { InputHTMLAttributes } from "react";
import { NumberInput } from "./number-input";

type Props = {
  ingredient: Ingredient;
} & InputHTMLAttributes<HTMLInputElement>;

export function IngredientInput({ ingredient, ...inputProps }: Props) {
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
        <NumberInput placeholder="41781" {...inputProps} />
        <p>gp</p>
      </div>
    </div>
  );
}
