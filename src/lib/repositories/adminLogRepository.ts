import { prisma } from "../../config/prisma/prisma";
import LogAdminActionDataType from "../types/data/LogAdminActionDataType";

/**
 * Logs admin action
 * @param data Action data to log
 */
export async function logAdminAction(data: LogAdminActionDataType) {
  await prisma.adminLog.create({
    data: {
      idUser: data.idUser,
      action: data.action,
      entity: data.entity,
      idEntity: data.idEntity,
      changes: data.changes,
    },
  });
}
