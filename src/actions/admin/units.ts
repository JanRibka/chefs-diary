"use server";

import { revalidatePath } from "next/cache";

import editUnitGroupActionValidator from "@/lib/actionValidators/admin/editUnitGroupActionValidator";
import insertUnitActionValidator from "@/lib/actionValidators/admin/insertUnitActionValidator";
import insertUnitGroupActionValidator from "@/lib/actionValidators/admin/insertUnitGroupActionValidator";
import { ActionResponseDTO } from "@/lib/dTOs/shared/ActionResponseDTO";
import PermissionTypeEnum from "@/lib/enums/PermissionTypeEnum";
import adminRoutes from "@/lib/routes/adminRoutes";
import {
  attemptEditUnitGroup,
  attemptInsertUnit,
  attemptInsertUnitGroup,
  deleteUnitGroup,
} from "@/lib/services/unitsService";
import {
  getConflictErrorFromError,
  getErrorMessageFromError,
  getNotFoundErrorFromError,
} from "@/lib/utils/error";
import { nameof } from "@/lib/utils/nameof";
import { getRequireAdminPermissions } from "@/lib/utils/server";
import { EditUnitGroupFormType } from "@/lib/validations/schemas/admin/editUnitGroupFormValidationSchema";
import { InsertUnitFormType } from "@/lib/validations/schemas/admin/insertUnitFormValidationSchema";
import { InsertUnitGroupFormType } from "@/lib/validations/schemas/admin/insertUnitGroupFormValidationSchema";
import { Unit, UnitGroup } from "@prisma/client";

export async function insertUnitGroupAction(
  formData: FormData
): Promise<ActionResponseDTO<UnitGroup>> {
  await getRequireAdminPermissions([PermissionTypeEnum.UNIT_EDIT]);

  try {
    const validationResult = await insertUnitGroupActionValidator(formData);

    if (!validationResult.success) {
      return {
        data: null,
        success: false,
        error: validationResult.error,
        timeStamp: new Date(),
      };
    }

    const name = formData.get(
      nameof<InsertUnitGroupFormType>("name")
    ) as string;
    const unitGroup = await attemptInsertUnitGroup(name);

    return {
      data: unitGroup,
      success: true,
      timeStamp: new Date(),
    };
  } catch (error) {
    const conflictError = getConflictErrorFromError(
      error,
      "Skupina jednotek již existuje"
    );
    let errorMessage = conflictError.errorMessage;

    if (!conflictError.isConflictError) {
      errorMessage = getErrorMessageFromError(error);
    }

    return {
      data: null,
      success: false,
      error: errorMessage,
      timeStamp: new Date(),
    };
  } finally {
    revalidatePath(adminRoutes.UnitGroups);
  }
}

export async function updateUnitGroupAction(
  idUnitGroup: number,
  formData: FormData
): Promise<ActionResponseDTO<UnitGroup>> {
  await getRequireAdminPermissions([PermissionTypeEnum.UNIT_EDIT]);

  try {
    const validationResult = await editUnitGroupActionValidator(formData);

    if (!validationResult.success) {
      return {
        data: null,
        success: false,
        error: validationResult.error,
        timeStamp: new Date(),
      };
    }

    const name = formData.get(nameof<EditUnitGroupFormType>("name")) as string;

    const unitGroup = await attemptEditUnitGroup(idUnitGroup, name);

    return {
      data: unitGroup,
      success: true,
      timeStamp: new Date(),
    };
  } catch (error) {
    const notFoundError = getNotFoundErrorFromError(
      error,
      "Skupina jednotek neexistuje"
    );
    let errorMessage = notFoundError.errorMessage;

    if (!notFoundError.isNotFoundError) {
      errorMessage = getErrorMessageFromError(error);
    }

    return {
      data: null,
      success: false,
      error: errorMessage,
      timeStamp: new Date(),
    };
  } finally {
    revalidatePath(adminRoutes.UnitGroups);
  }
}

export async function deleteUnitGroupAction(
  idUnitGroup: number
): Promise<ActionResponseDTO<UnitGroup>> {
  await getRequireAdminPermissions([PermissionTypeEnum.UNIT_DELETE]);

  try {
    await deleteUnitGroup(idUnitGroup);

    return {
      data: null,
      success: true,
      timeStamp: new Date(),
    };
  } catch (error) {
    const conflictError = getConflictErrorFromError(
      error,
      "Skupina jednotek nelze smazat"
    );
    let errorMessage = conflictError.errorMessage;

    if (!conflictError.isConflictError) {
      errorMessage = getErrorMessageFromError(error);
    }

    return {
      data: null,
      success: false,
      error: errorMessage,
      timeStamp: new Date(),
    };
  } finally {
    revalidatePath(adminRoutes.UnitGroups);
  }
}

export async function insertUnitAction(
  formData: FormData
): Promise<ActionResponseDTO<Unit>> {
  await getRequireAdminPermissions([PermissionTypeEnum.UNIT_EDIT]);

  try {
    const validationResult = await insertUnitActionValidator(formData);

    if (!validationResult.success) {
      return {
        data: null,
        success: false,
        error: validationResult.error,
        timeStamp: new Date(),
      };
    }

    const name = formData.get(nameof<InsertUnitFormType>("name")) as string;
    const unit = await attemptInsertUnit(name);

    return {
      data: unit,
      success: true,
      timeStamp: new Date(),
    };
  } catch (error) {
    const conflictError = getConflictErrorFromError(
      error,
      "Jednotka již existuje"
    );
    let errorMessage = conflictError.errorMessage;

    if (!conflictError.isConflictError) {
      errorMessage = getErrorMessageFromError(error);
    }

    return {
      data: null,
      success: false,
      error: errorMessage,
      timeStamp: new Date(),
    };
  } finally {
    revalidatePath(adminRoutes.Units);
  }
}
