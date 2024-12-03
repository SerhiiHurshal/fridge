import type { KeyPrefix } from "i18next";
import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";

import { defaultNS, getOptions, Language, Namespace } from "./settings";

const initI18next = async (lng: Language, ns?: Namespace) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: Language, namespace: Namespace) =>
          import(`./locales/${language}/${namespace}.json`),
      ),
    )
    .init(getOptions(lng, ns));
  return i18nInstance;
};

export async function translate<T extends Namespace = typeof defaultNS>(
  lng: Language,
  ns?: T,
  keyPrefix?: KeyPrefix<T>,
) {
  const i18nextInstance = await initI18next(lng, ns);
  return {
    t: i18nextInstance.getFixedT<T, KeyPrefix<T> | undefined, T>(lng, ns, keyPrefix),
    i18n: i18nextInstance,
  };
}
