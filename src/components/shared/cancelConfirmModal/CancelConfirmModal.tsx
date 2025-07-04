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
  cancelButtonColor?:
    | "danger"
    | "primary"
    | "secondary"
    | "success"
    | "warning";
  onCancel?: () => void;
  confirmButtonIsDisabled?: boolean;
  confirmButtonIsLoading?: boolean;
  confirmButtonLabel?: string;
  confirmButtonColor?:
    | "danger"
    | "primary"
    | "secondary"
    | "success"
    | "warning";
  onConfirm?: () => void;
  hideFooter?: boolean;
};

export default function CancelConfirmModal({
  className,
  headerLabel,
  children,
  cancelButtonLabel = "Zrušit",
  cancelButtonColor = "danger",
  onCancel,
  confirmButtonIsDisabled,
  confirmButtonIsLoading,
  confirmButtonLabel = "Potvrdit",
  confirmButtonColor = "primary",
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
                <Button
                  color={cancelButtonColor}
                  variant="flat"
                  onPress={onCancel}
                >
                  {cancelButtonLabel}
                </Button>
                <Button
                  color={confirmButtonColor}
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
