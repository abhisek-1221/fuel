"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && user) {
      // Check if user already exists in our database
      const checkUser = async () => {
        try {
          const response = await fetch('/api/user/check');
          if (response.ok) {
            const data = await response.json();
            if (data.exists) {
              // User already exists, redirect to test page
              router.push('/test');
            }
          }
        } catch (error) {
          console.error('Error checking user:', error);
        }
      };

      checkUser();
    }
  }, [isLoaded, user, router]);

  return <>{children}</>;
}
