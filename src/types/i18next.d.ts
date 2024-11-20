// import the original type declarations
import "i18next";
// import all namespaces (for the default language, only)
import global from "./app/i18n/locales/en/global.json";
import home from "./app/i18n/locales/en/home.json";

declare module "i18next" {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    defaultNS: "global";
    // custom resources type
    resources: {
      global: typeof global;
      home: typeof home;
    };
    // other
  }
}
