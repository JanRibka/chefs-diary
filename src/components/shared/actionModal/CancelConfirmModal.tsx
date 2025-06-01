import { mergeStyles } from "@/lib/utils/styles";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from "@heroui/react";

type Props = ModalProps & {
  headerLabel: string;
  cancelButtonLabel?: string;
  onCancel?: () => void;
  confirmButtonIsDisabled?: boolean;
  confirmButtonIsLoading?: boolean;
  confirmButtonLabel?: string;
  onConfirm?: () => void;
  hideFooter?: boolean;
};

export default function CancelConfirmModal({
  className,
  headerLabel,
  children,
  cancelButtonLabel = "Zrušit",
  onCancel,
  confirmButtonIsDisabled,
  confirmButtonIsLoading,
  confirmButtonLabel = "Potvrdit",
  onConfirm,
  hideFooter,
  ...restProps
}: Props) {
  return (
    <Modal className={mergeStyles("", className)} {...restProps}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader>{headerLabel}</ModalHeader>
            <ModalBody>{children}</ModalBody>
            {!hideFooter && (
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onCancel}>
                  {cancelButtonLabel}
                </Button>
                <Button
                  color="primary"
                  isDisabled={confirmButtonIsDisabled}
                  isLoading={confirmButtonIsLoading}
                  onPress={onConfirm}
                >
                  {confirmButtonLabel}
                </Button>
              </ModalFooter>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
