// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/firebase/firebase'; // Adjust according to your file structure

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Define routes that require authentication
  const protectedRoutes = ['/cart/checkout', '/wishlist', '/favorites'];

  // Check if the request is for a protected route
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    const user = await new Promise((resolve) => {
      auth.onAuthStateChanged((user) => {
        resolve(user);
      });
    });

    // If the user is not authenticated, redirect to the sign-in page
    if (!user) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
  }

  // Allow the request to proceed if the user is authenticated or the route is not protected
  return NextResponse.next();
}

// Specify the routes that this middleware applies to
export const config = {
  matcher: ['/cart/checkout', '/wishlist', '/favorites'], // Add other protected routes as necessary
};