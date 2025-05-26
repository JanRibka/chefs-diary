"use server";

// import { revalidatePath } from "next/cache";

// import insertUnitActionValidator from "@/lib/actionValidators/auth/insertUnitActionValidator";
import PermissionTypeEnum from "@/lib/enums/PermissionTypeEnum";
import { insertUnit } from "@/lib/repositories/webDataRepository";
// import adminRoutes from "@/lib/routes/adminRoutes";
import { nameof } from "@/lib/utils/nameof";
import { getRequireAdminPermissions } from "@/lib/utils/server";
import { InsertUnitFormType } from "@/lib/validations/schemas/admin/insertUnitFormValidationSchema";

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

  await insertUnit(name, displayName);
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
