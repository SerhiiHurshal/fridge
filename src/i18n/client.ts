"use client";

import { useEffect, useState } from "react";
import i18next, { KeyPrefix } from "i18next";
import { initReactI18next, useTranslation as useTranslationOrg } from "react-i18next";
import { useCookies } from "react-cookie";
import resourcesToBackend from "i18next-resources-to-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { getOptions, languages, cookieName, Language, Namespace } from "./settings";

const runsOnServerSide = typeof window === "undefined";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: Language, namespace: Namespace) =>
        import(`./locales/${language}/${namespace}.json`),
    ),
  )
  .init({
    ...getOptions(),
    lng: undefined, // let detect the language on client side
    detection: {
      order: ["path", "htmlTag", "cookie", "navigator"],
    },
    preload: runsOnServerSide ? languages : [],
  });

export function useTranslation(
  ns?: Parameters<typeof useTranslationOrg<Namespace, KeyPrefix<Namespace>>>[0],
  options?: Parameters<typeof useTranslationOrg<Namespace, KeyPrefix<Namespace>>>[1],
  lng?: Language,
) {
  const [cookies, setCookie] = useCookies([cookieName]);
  const ret = useTranslationOrg<Namespace, KeyPrefix<Namespace>>(ns, options);
  const { i18n } = ret;

  if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
    i18n.changeLanguage(lng);
  }

  const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage);

  useEffect(() => {
    if (!runsOnServerSide || activeLng === i18n.resolvedLanguage) return;
    setActiveLng(i18n.resolvedLanguage);
  }, [activeLng, i18n.resolvedLanguage]);

  useEffect(() => {
    if (!runsOnServerSide || !lng || i18n.resolvedLanguage === lng) return;
    i18n.changeLanguage(lng);
  }, [lng, i18n]);

  useEffect(() => {
    if (!runsOnServerSide || cookies[cookieName] === lng) return;
    setCookie(cookieName, lng, { path: "/" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lng, cookies[cookieName]]);

  return ret;
}
