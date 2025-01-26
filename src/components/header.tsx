import { translate } from "@/i18n";
import { Language } from "@/i18n/settings";

import { LanguagePicker } from "./language-picker";
import { Button } from "./ui/button";

export default async function Header({ lng }: { lng: Language }) {
  const { t } = await translate(lng);
  return (
    <div className="pt-safe-offset-3 px-safe-offset-3 flex justify-between p-3">
      <p className="px-4 py-2">LOGO</p>
      <div className="flex gap-2">
        <LanguagePicker />
        <Button variant="outline">{t("Sign in")}</Button>
        <Button>{t("Sign up")}</Button>
      </div>
    </div>
  );
}
