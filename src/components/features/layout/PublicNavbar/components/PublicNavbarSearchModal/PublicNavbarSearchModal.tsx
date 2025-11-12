"use client";

import { memo, useMemo } from 'react';
import { IoSearch } from 'react-icons/io5';

import { Button, Input, Modal, ModalBody, ModalContent } from '@heroui/react';

import { SEARCH_TAGS } from '../../constants/searchTags';
import { searchModalStyles } from './styles/searchModalStyles';

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
    // Get styles from tailwind-variants
    const styles = searchModalStyles();

    // PERFORMANCE: useMemo - memoizace mapovaných tagů (nevytvářet znovu při každém re-renderu)
    const searchTagButtons = useMemo(
      () =>
        SEARCH_TAGS.map((tag) => (
          <Button
            key={tag}
            size="sm"
            variant="flat"
            className={styles.tagButton()}
          >
            {tag}
          </Button>
        )),
      [styles]
    );

    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        backdrop="blur"
        size="2xl"
        placement="top"
        classNames={{
          backdrop: styles.modalBackdrop(),
          wrapper: styles.modalWrapper(),
          base: styles.modalBase(),
        }}
      >
        <ModalContent>
          <ModalBody className={styles.modalBody()}>
            <div className={styles.content()}>
              <div className={styles.header()}>
                <h3 className={styles.title()}>Hledat recepty</h3>
                <p className={styles.subtitle()}>
                  Objevte tisíce skvělých receptů
                </p>
              </div>

              <Input
                placeholder="Napište název receptu, ingredienci nebo kategorii..."
                startContent={<IoSearch className={styles.searchIcon()} />}
                size="lg"
                classNames={{
                  input: styles.inputInput(),
                  inputWrapper: styles.inputWrapper(),
                }}
                autoFocus
              />

              <div className={styles.tagsContainer()}>{searchTagButtons}</div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }
);

// PERFORMANCE: displayName for React DevTools
PublicNavbarSearchModal.displayName = "PublicNavbarSearchModal";
