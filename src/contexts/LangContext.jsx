import { createContext, useContext, useState } from "react";
import { T } from "../i18n/translations";

const LangContext = createContext();

export function LangProvider({ children }) {
  const [lang, setLang] = useState("es");
  const t = T[lang];
  const toggleLang = () => setLang((l) => (l === "es" ? "en" : "es"));

  return (
    <LangContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
