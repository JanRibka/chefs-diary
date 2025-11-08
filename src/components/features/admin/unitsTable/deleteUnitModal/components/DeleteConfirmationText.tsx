import { memo } from "react";

import { TEXT_CONTENT } from "../constants";
import { DeleteConfirmationTextProps } from "../types";

const DeleteConfirmationText = memo<DeleteConfirmationTextProps>(
  ({ unitName }) => <p>{TEXT_CONTENT.confirmationText(unitName)}</p>
);

DeleteConfirmationText.displayName = "DeleteConfirmationText";

export default DeleteConfirmationText;
