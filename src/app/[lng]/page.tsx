import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Language, translate } from "../i18n";
import { Trans } from "react-i18next/TransWithoutContext";

export default async function Home({ params }: { params: Promise<{ lng: Language }> }) {
  const { lng } = await params;

  const { t } = await translate(lng, "home");
  return (
    <main className="p-3">
      <section className="mb-5">
        <Card className="p-6 shadow-md">
          <CardHeader>
            <CardTitle className="mb-2 text-2xl font-semibold">{t("Recipe card title")}</CardTitle>
            <CardDescription className="mb-4">{t("Recipe card description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5">
              <Trans
                i18nKey="Recipe card content point one"
                components={{ strong: <strong /> }}
                t={t}
                parent="li"
              />
              <Trans
                i18nKey="Recipe card content point two"
                components={{ strong: <strong /> }}
                t={t}
                parent="li"
              />
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="mb-3">
        <Card className="p-6 shadow-md">
          <CardHeader>
            <CardTitle className="mb-2 text-2xl font-semibold">
              {t("Shopping card title")}
            </CardTitle>
            <CardDescription className="mb-4">{t("Shopping card description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5">
              <Trans
                i18nKey="Shopping card content point one"
                components={{ strong: <strong /> }}
                t={t}
                parent="li"
              />
              <Trans
                i18nKey="Shopping card content point two"
                components={{ strong: <strong /> }}
                t={t}
                parent="li"
              />
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12 flex w-full justify-center">
        <Button className="mt-4" size="lg">
          {t("Get Started")}
        </Button>
      </section>
    </main>
  );
}
