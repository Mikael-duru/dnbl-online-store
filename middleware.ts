import { NextResponse, NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const authCookie = req.cookies.get('auth');

  // Define routes that require authentication
  const protectedRoutes = ['/cart/checkout-page', '/wishlists', '/my-account', '/my-account/settings'];

  // Check if the pathname is part of the protected routes
  if (protectedRoutes.includes(pathname) && !authCookie) {
    return NextResponse.redirect(new URL('/sign-in', req.url)); // Redirect to sign-in page if not authenticated
  }

  // Allow the request to proceed if the user is authenticated or the route is not protected
  return NextResponse.next();
}
