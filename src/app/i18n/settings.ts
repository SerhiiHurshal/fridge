export const fallbackLng = "en" as const;
export const languages = [fallbackLng, "ua"] as const;
export const cookieName = "language";
export const defaultNS = "global" as const;
export const namespaces = [defaultNS, "home"] as const;

export type Language = (typeof languages)[number];
export type Namespace = (typeof namespaces)[number];

export function getOptions(lng: Language = fallbackLng, ns: Namespace = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
