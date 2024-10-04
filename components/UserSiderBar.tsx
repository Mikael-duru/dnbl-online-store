'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Icon from './DynamicIcon';
import { userSidebarLinks } from '@/constants';
import { signOut, useSession } from 'next-auth/react';

const UserSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();  // Use Next.js router to navigate
  const { data: session } = useSession();  // Get session data

  const handleClick = async (label: string) => {
    if (label === 'Log out') {
      await signOut({ redirect: false });  // Prevent auto redirection
      if (!session) {  // Check if session is empty
        router.push('/');  // Navigate to root page
      }
    }
  };

  return (
    <section className='flex h-fit w-fit flex-col gap-20 p-6 max-sm:hidden lg:w-64 border-r-[1px] rounded-sm bg-[#fdfdfd]'>
      <div className='flex flex-col gap-3'>
        <p className='font-bold text-xl max-lg:hidden'>My Account</p>
        <div className='flex flex-1 flex-col w-full gap-5'>
          {userSidebarLinks.map((link) => {
            const isActive = pathname === link.route;
            const isLogOut = link.label === 'Log out';
            return (
              <Link
                href={link.route}
                key={link.label}
                className={cn(
                  'flex gap-4 p-3 items-center justify-start',
                  { 'bg-black text-white': isActive },
                  { 'text-red-500': isLogOut }
                )}
                onClick={async (e) => {
                  if (isLogOut) {
                    e.preventDefault();  // Prevents navigation if signOut is triggered
                    await handleClick(link.label);
                  }
                }}
              >
                <Icon name={link.icon} />
                <p className='max-lg:hidden'>{link.label}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UserSidebar;
