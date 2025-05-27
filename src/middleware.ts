import { withAuth } from "next-auth/middleware";

export default withAuth(
    function middleware() {
        // Middleware logic can be added here if needed
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                const { pathname } = req.nextUrl;

                // Allow access to auth pages without token
                if (pathname.startsWith("/auth")) {
                    return true;
                }
                if (pathname.startsWith("/api/test")) {
                    return true;
                }

                // Require token for all other pages
                return !!token;
            },
        },
    },
);

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api/auth (auth API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$).*)",
    ],
};
