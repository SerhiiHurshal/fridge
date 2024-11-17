export const fallbackLng = "en";
export const languages = [fallbackLng, "ua"] as const satisfies string[];
export const cookieName = "language";
export const defaultNS = "global";

export function getOptions(lng = fallbackLng, ns = defaultNS) {
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
