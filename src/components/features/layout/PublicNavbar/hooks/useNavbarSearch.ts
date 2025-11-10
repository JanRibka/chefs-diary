"use client";

import { useMemo } from "react";

import { useDisclosure } from "@heroui/react";

/**
 * useNavbarSearch - hook for search modal state
 * Uses HeroUI disclosure for modal control
 *
 * @returns object with { isOpen, onOpen, onClose }
 *
 * @example
 * const { isOpen, onOpen, onClose } = useNavbarSearch();
 * <button onClick={onOpen}>Search</button>
 */
export const useNavbarSearch = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // PERFORMANCE: stabilní object reference (prevence re-renderů)
  return useMemo(
    () => ({ isOpen, onOpen, onClose }),
    [isOpen, onOpen, onClose]
  );
};
