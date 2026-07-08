"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface HeroContextType {
  isHeroUiVisible: boolean;
  setHeroUiVisible: (val: boolean) => void;
}

const HeroContext = createContext<HeroContextType>({
  isHeroUiVisible: false,
  setHeroUiVisible: () => {},
});

export const HeroProvider = ({ children }: { children: ReactNode }) => {
  const [isHeroUiVisible, setHeroUiVisible] = useState(false);
  return (
    <HeroContext.Provider value={{ isHeroUiVisible, setHeroUiVisible }}>
      {children}
    </HeroContext.Provider>
  );
};

export const useHero = () => useContext(HeroContext);
