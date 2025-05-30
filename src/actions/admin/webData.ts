"use server";

// import { revalidatePath } from "next/cache";

import { revalidatePath } from "next/cache";

// import insertUnitActionValidator from "@/lib/actionValidators/auth/insertUnitActionValidator";
import PermissionTypeEnum from "@/lib/enums/PermissionTypeEnum";
import {
  insertUnit,
  insertUnitGroup,
} from "@/lib/repositories/webDataRepository";
import adminRoutes from "@/lib/routes/adminRoutes";
// import adminRoutes from "@/lib/routes/adminRoutes";
import { nameof } from "@/lib/utils/nameof";
import { getRequireAdminPermissions } from "@/lib/utils/server";
import { InsertUnitFormType } from "@/lib/validations/schemas/admin/insertUnitFormValidationSchema";

export async function insertUnitGroupAction(formData: FormData) {
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
  const name = formData.get(nameof<InsertUnitFormType>("name")) as string; // TODO: Vym2nit model

  try {
    throw new Error();
    await insertUnitGroup(name);
  } catch (error) {
    //TODO: Pokud se n2co posere, mus9m výhodit toast s chybovou hlaskou. Toas bude v komponentě. Spatně se to vyplnukje
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
