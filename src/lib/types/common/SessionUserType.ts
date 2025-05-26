import PermissionTypeEnum from "@/lib/enums/PermissionTypeEnum";

type SessionUserType = {
  id: string;
  email: string;
  emailVerified: Date | null;
  name?: string | null;
  image?: string | null;
  permissions: PermissionTypeEnum[];
};

export default SessionUserType;
