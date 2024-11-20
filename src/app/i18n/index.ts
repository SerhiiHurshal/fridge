import { createInstance, KeyPrefix } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { defaultNS, getOptions, Language, Namespace } from "./settings";

const initI18next = async (lng: Language, ns: Namespace) => {
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

export async function translate(
  lng: Language,
  ns: Namespace = defaultNS,
  keyPrefix?: KeyPrefix<Namespace>,
) {
  const i18nextInstance = await initI18next(lng, ns);
  return {
    t: i18nextInstance.getFixedT<Namespace, KeyPrefix<Namespace> | undefined, Namespace>(
      lng,
      ns,
      keyPrefix,
    ),
    i18n: i18nextInstance,
  };
}
