/**
 * Helper function for case-insensitive search by name in Prisma models.
 * Uses case-insensitive exact match for reliable name lookups.
 * Reduces duplication for similar queries across repositories.
 *
 * @param model - The Prisma model delegate with findFirst capability.
 * @param name - The name to search for.
 * @returns Promise<T | null> - The found record or null.
 */
export async function findByNameCaseInsensitive<T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  model: any,
  name: string
): Promise<T | null> {
  return await model.findFirst({
    where: {
      name: {
        equals: name,
        mode: "insensitive",
      },
    },
  });
}

/**
 * Helper function for creating records in Prisma models.
 * Reduces duplication for create operations across repositories.
 *
 * @param model - The Prisma model delegate with create capability.
 * @param data - The data to create the record with.
 * @returns Promise<T> - The created record.
 */
export async function createRecord<T, D = Record<string, unknown>>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  model: any,
  data: D
): Promise<T> {
  return await model.create({ data });
}
