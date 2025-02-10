"use client";

import type { KeyPrefix } from "i18next";
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";
import { useEffect } from "react";
import type { FallbackNs, UseTranslationOptions } from "react-i18next";
import { initReactI18next, useTranslation as useTranslationOrg } from "react-i18next";

import { defaultNS, getOptions, Language, languages, Namespace } from "./settings";

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

export function useTranslation<T extends Namespace = typeof defaultNS>(
  ns?: T,
  options?: UseTranslationOptions<KeyPrefix<FallbackNs<T>>>,
  lng?: Language,
) {
  const returnValue = useTranslationOrg<T, KeyPrefix<FallbackNs<T>>>(ns, options);
  const { i18n } = returnValue;

  if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
    i18n.changeLanguage(lng);
  }

  useEffect(() => {
    if (!runsOnServerSide || !lng || i18n.resolvedLanguage === lng) return;
    i18n.changeLanguage(lng);
  }, [lng, i18n]);

  return returnValue;
}
