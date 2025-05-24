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
  confirmButtonLabel?: string;
  onConfirm?: () => void;
  hideFooter?: boolean;
};

export default function ConfirmModal({
  className,
  headerLabel,
  children,
  cancelButtonLabel = "Zrušit",
  onCancel,
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
                <Button color="primary" onPress={onConfirm}>
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
