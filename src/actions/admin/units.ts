"use server";

import { revalidatePath } from "next/cache";

import editUnitGroupActionValidator from "@/lib/actionValidators/admin/editUnitGroupActionValidator";
import insertUnitGroupActionValidator from "@/lib/actionValidators/admin/insertUnitGroupActionValidator";
import { ActionResponseDTO } from "@/lib/dTOs/shared/ActionResponseDTO";
import PermissionTypeEnum from "@/lib/enums/PermissionTypeEnum";
import { insertUnit } from "@/lib/repositories/unitsRepository"; // TODO: Bude z service s logovanim
import adminRoutes from "@/lib/routes/adminRoutes";
import {
  attemptEditUnitGroup,
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
import { UnitGroup } from "@prisma/client";

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

export async function insertUnitAction(formData: FormData) {
  // ): Promise<
  //   FormActionState<InsertUnitStatusEnum, InsertUnitFormType, InsertUnitFormType>
  // > {
  // try {
  debugger;

  // try {
  await getRequireAdminPermissions([PermissionTypeEnum.UNIT_EDIT]);
  // const validationResult = await insertUnitActionValidator(formData);
  //TODO: kontrola na to, 6e jednotka existuje. POdle p5ihlasen9
  //TODO: Bude tu servisa s attempt insertUnit
  //TODO: Podle enumu bud pak okno zvaru, nebo pkld je validacni chyba, kterou dam do enumu, tak ji vratim na pkna, nebo vyhodim n2jakou jinou hlasku. Okno zavru jenom pro success
  const name = formData.get(nameof<InsertUnitFormType>("name")) as string;
  const displayName = formData.get(
    nameof<InsertUnitFormType>("displayName")
  ) as string;

  try {
    await insertUnit(name, displayName);
  } catch (error) {
  } finally {
    revalidatePath(adminRoutes.UnitGroups);
  }

  // } catch (error) {
  // } finally {
  //console.log("revalidate");
  //TODO: M9sto revalidate path budu muset na klientovi volat refatch z hooku
  //revalidatePath(adminRoutes.Units);
  //}

  //   return {
  //     generalState: InsertUnitStatusEnum.SUCCESS
  //   }
  // } catch () {

  // }
}
