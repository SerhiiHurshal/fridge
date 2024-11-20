import { translate } from "@/i18n";
import { LanguagePicker } from "./language-picker";
import { Button } from "./ui/button";
import { Language } from "@/i18n/settings";

export default async function Header({ lng }: { lng: Language }) {
  const { t } = await translate(lng, "global");
  return (
    <div className="flex justify-between p-3 pt-safe-offset-3 px-safe-offset-3">
      <p className="px-4 py-2">LOGO</p>
      <div className="flex gap-2">
        <LanguagePicker />
        <Button variant="outline">{t("Sign in")}</Button>
        <Button>{t("Sign up")}</Button>
      </div>
    </div>
  );
}
