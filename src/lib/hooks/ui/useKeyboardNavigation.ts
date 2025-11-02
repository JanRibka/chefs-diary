import { useEffect } from "react";

type KeyboardHandler = () => void;

interface KeyboardConfig {
  [key: string]: {
    handler: KeyboardHandler;
    condition?: boolean;
  };
}

export function useKeyboardNavigation(config: KeyboardConfig) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const keyConfig = config[event.key];

      if (keyConfig && (!keyConfig.condition || keyConfig.condition)) {
        event.preventDefault();
        keyConfig.handler();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [config]);
}
