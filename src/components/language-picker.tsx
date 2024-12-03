"use client";

import { redirect, useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Language,languages } from "@/i18n/settings";

export function LanguagePicker() {
  const { lng } = useParams<{ lng: Language }>();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{lng.toUpperCase()}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={lng} onValueChange={(newLng) => redirect(`/${newLng}`)}>
          {languages.map((optionLng) => (
            <DropdownMenuRadioItem key={optionLng} value={optionLng}>
              {optionLng.toUpperCase()}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
