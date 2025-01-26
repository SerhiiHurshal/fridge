import Link from "next/link";

import { auth, signOut } from "@/auth";
import { translate } from "@/i18n";
import { Language } from "@/i18n/settings";

import { LanguagePicker } from "./language-picker";
import { Button, buttonVariants } from "./ui/button";

export default async function Header({ lng }: { lng: Language }) {
  const { t } = await translate(lng);
  const session = await auth();
  return (
    <div className="pt-safe-offset-3 px-safe-offset-3 flex justify-between p-3">
      <p className="px-4 py-2">LOGO</p>
      <div className="flex gap-2">
        <LanguagePicker />
        {session?.user ? (
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button variant="outline" type="submit">
              Sign Out
            </Button>
          </form>
        ) : (
          <Link href="/sign-in" className={buttonVariants()}>
            {t("Sign in")}
          </Link>
        )}
      </div>
    </div>
  );
}
