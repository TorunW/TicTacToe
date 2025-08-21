'use client';
import { StoreProvider } from 'easy-peasy';
import { store } from './store';

export const StoreProviderCom = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <StoreProvider store={store}>{children}</StoreProvider>;
};
