import { authMiddleware } from "@clerk/nextjs";

// specify which one should be public 
export default authMiddleware({
    publicRoutes : ["/"]
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};