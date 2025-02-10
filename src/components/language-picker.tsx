"use client";

import { redirect, useParams, usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Language, languages } from "@/i18n/settings";

export function LanguagePicker() {
  const { lng } = useParams<{ lng: Language }>();
  const pathname = usePathname();

  const changeLanguage = (newLng: string) => {
    // Replace the language segment in the pathname
    const newPath = pathname.replace(/^\/[^/]+/, `/${newLng}`);
    redirect(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{lng.toUpperCase()}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={lng} onValueChange={changeLanguage}>
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
