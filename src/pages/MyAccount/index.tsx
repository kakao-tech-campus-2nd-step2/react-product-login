import React from 'react';
import Layout from '@components/features/Layout';
import AccountOverview from '@components/features/Account/AccountOverview';
import WishList from '@components/features/Account/WishList';

export default function MyAccount() {
  return (
    <Layout>
      <AccountOverview />
      <WishList />
    </Layout>
  );
}
