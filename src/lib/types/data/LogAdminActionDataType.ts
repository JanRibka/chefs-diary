import AdminLogActionTypeEnum from "@/lib/enums/AdminLogActionTypeEnum";
import AdminLogEntityTypeEnum from "@/lib/enums/AdminLogEntityTypeEnum";
import { JsonObject } from "@prisma/client/runtime/library";

type LogAdminActionDataType = {
  idUser: string;
  action: AdminLogActionTypeEnum;
  entity: AdminLogEntityTypeEnum;
  idEntity: number;
  changes?: JsonObject;
};

export default LogAdminActionDataType;
