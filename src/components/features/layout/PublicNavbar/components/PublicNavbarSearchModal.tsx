"use client";

import { memo, useMemo } from "react";
import { IoSearch } from "react-icons/io5";

import { Button, Input, Modal, ModalBody, ModalContent } from "@heroui/react";

import { SEARCH_TAGS } from "../constants/searchTags";

interface PublicNavbarSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * PublicNavbarSearchModal - Search modal with input and tags
 * DATA COLOCATION: SEARCH_TAGS constant is here because it's only used here
 *
 * @param isOpen - Whether the modal is open
 * @param onClose - Callback to close the modal
 *
 * @example
 * <PublicNavbarSearchModal
 *   isOpen={true}
 *   onClose={() => setOpen(false)}
 * />
 */
export const PublicNavbarSearchModal = memo(
  ({ isOpen, onClose }: PublicNavbarSearchModalProps) => {
    // PERFORMANCE: useMemo - memoizace mapovaných tagů (nevytvářet znovu při každém re-renderu)
    const searchTagButtons = useMemo(
      () =>
        SEARCH_TAGS.map((tag) => (
          <Button
            key={tag}
            size="sm"
            variant="flat"
            className="bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light hover:bg-primary/15 dark:hover:bg-primary/25 transition-colors"
          >
            {tag}
          </Button>
        )),
      []
    );

    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        backdrop="blur"
        size="2xl"
        placement="top"
        classNames={{
          backdrop: "bg-black/50",
          wrapper: "pt-20",
          base: "bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-white/20 dark:border-slate-800/40",
        }}
      >
        <ModalContent>
          <ModalBody className="py-8">
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-primary via-primary-dark to-primary-light bg-clip-text text-transparent mb-2">
                  Hledat recepty
                </h3>
                <p className="text-default-600">
                  Objevte tisíce skvělých receptů
                </p>
              </div>

              <Input
                placeholder="Napište název receptu, ingredienci nebo kategorii..."
                startContent={<IoSearch className="w-5 h-5 text-default-400" />}
                size="lg"
                classNames={{
                  input: "text-lg",
                  inputWrapper:
                    "bg-default-100 hover:bg-default-200 border-2 border-transparent focus-within:border-primary transition-all duration-200 shadow-lg",
                }}
                autoFocus
              />

              <div className="flex flex-wrap gap-2">{searchTagButtons}</div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }
);

// PERFORMANCE: displayName for React DevTools
PublicNavbarSearchModal.displayName = "PublicNavbarSearchModal";
