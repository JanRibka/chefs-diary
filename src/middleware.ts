import { authMiddleware } from "@/middleware/authMiddleware";
import { chain } from "@/middleware/chain";

export default chain([authMiddleware]);

// export const config = {
//  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)'],
// };
