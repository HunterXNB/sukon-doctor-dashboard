"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
const variants = [
  "default",
  "destructive",
  "secondary",
  "ghost",
  "link",
  "outline",
  "extra",
  "destructive-outline",
  "destructive-extra",
  "destructive-ghost",
  "destructive-link",
] as const;
type TVariant = (typeof variants)[number];

export default function Home() {
  const [variant, setVariant] = useState<TVariant>("default");
  const [isDisabled, setIsDisabled] = useState(false);
  return (
    <div className="p-20 ">
      <select
        onChange={(e) =>
          setVariant(e.target.selectedOptions[0].value as TVariant)
        }
      >
        {variants.map((variant) => (
          <option key={variant} value={variant}>
            {variant}
          </option>
        ))}
      </select>
      <br />
      <label htmlFor="disable">تعطيل</label>
      <input
        id="disable"
        type="checkbox"
        checked={isDisabled}
        onChange={() => setIsDisabled(!isDisabled)}
      />
      <br />
      <Button disabled={isDisabled} variant={variant}>
        سكون
      </Button>
    </div>
  );
}
