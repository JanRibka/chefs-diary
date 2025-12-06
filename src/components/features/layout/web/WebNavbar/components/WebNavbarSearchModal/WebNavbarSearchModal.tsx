"use client";

import { memo } from "react";
import { Modal, ModalBody, ModalContent } from "@heroui/react";

import { searchModalStyles } from "./styles/searchModalStyles";
import { WebNavbarSearchModalProps } from "./types/WebNavbarSearchModalProps";
import { WebNavbarSearchModalHeader } from "./components/WebNavbarSearchModalHeader/WebNavbarSearchModalHeader";
import { WebNavbarSearchModalInput } from "./components/WebNavbarSearchModalInput/WebNavbarSearchModalInput";
import { WebNavbarSearchModalTags } from "./components/WebNavbarSearchModalTags/WebNavbarSearchModalTags";
import { WebNavbarSearchModalTips } from "./components/WebNavbarSearchModalTips/WebNavbarSearchModalTips";

/**
 * WebNavbarSearchModal - Search modal orchestrator
 * Orchestrates the search modal layout and subcomponents
 *
 * @param isOpen - Whether the modal is open
 * @param onClose - Callback to close the modal
 */
export const WebNavbarSearchModal = memo(
  ({ isOpen, onClose }: WebNavbarSearchModalProps) => {
    // Get styles from tailwind-variants
    const styles = searchModalStyles();

    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        backdrop="blur"
        size="4xl"
        placement="top"
        classNames={{
          backdrop: styles.modalBackdrop(),
          wrapper: styles.modalWrapper(),
          base: styles.modalBase(),
          closeButton: styles.closeButton(),
        }}
        // PERFORMANCE: Disable animation for faster feel on mobile if needed, but keeping default for now
      >
        <ModalContent className={styles.modalContent()}>
          <ModalBody className={styles.modalBody()}>
            <div className={styles.gridContainer()}>
              {/* Left Column - Search & Tags */}
              <div className={styles.leftColumn()}>
                <WebNavbarSearchModalHeader />
                <WebNavbarSearchModalInput />
                <WebNavbarSearchModalTags />
              </div>

              {/* Right Column - Tips */}
              <WebNavbarSearchModalTips />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }
);

// PERFORMANCE: displayName for React DevTools
WebNavbarSearchModal.displayName = "WebNavbarSearchModal";
