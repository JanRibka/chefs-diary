import PermissionTypeEnum from "@/lib/enums/PermissionTypeEnum";
import { getAllUsersPaginated } from "@/lib/repositories/userRepository";
import { handleApiError } from "@/lib/utils/error";
import { getRequireAdminPermissions } from "@/lib/utils/server";

export async function GET(request: Request) {
  try {
    await getRequireAdminPermissions([PermissionTypeEnum.USER_VIEW]);

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "50", 10);

    const data = await getAllUsersPaginated(page, pageSize);

    return Response.json(data);
  } catch (error) {
    return handleApiError(error, { consoleErrorTitle: "Get all users" });
  }
}
