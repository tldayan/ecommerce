"use client"
import React, { ReactNode } from 'react';
import { createStytchUIClient } from '@stytch/nextjs/ui';
import { StytchProvider } from "@stytch/nextjs";

interface Props {
  children: ReactNode;
}

const stytchPublicToken = process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN;

if (!stytchPublicToken) {
  throw new Error("STYTCH_PUBLIC_TOKEN environment variable is not set");
}

const stytchClient = createStytchUIClient(stytchPublicToken);

export default function StytchProviderComponent({ children }: Props) {
  return (
    <StytchProvider stytch={stytchClient}>
      {children}
    </StytchProvider>
  );
}
