import PermissionTypeEnum from "@/lib/enums/PermissionTypeEnum";
import { getAllUnitsPaginated } from "@/lib/repositories/webDataRepository";
import { handleApiError } from "@/lib/utils/error";
import { getRequireAdminPermissions } from "@/lib/utils/server";
import { capitalizeFirstLetter } from "@/lib/utils/string";

export async function GET(request: Request) {
  try {
    await getRequireAdminPermissions([PermissionTypeEnum.UNIT_VIEW]);

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "50", 10);
    let orderByField = searchParams.get("orderByField") ?? undefined;
    const orderDirection = searchParams.get("orderDirection") ?? undefined;

    if (orderByField) {
      orderByField = capitalizeFirstLetter(orderByField);
    }

    const data = await getAllUnitsPaginated(
      page,
      pageSize,
      orderByField,
      orderDirection
    );

    return Response.json(data);
  } catch (error) {
    return handleApiError(error, { consoleErrorTitle: "Get all units" });
  }
}
