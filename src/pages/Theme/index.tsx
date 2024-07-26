import React from 'react';
import Layout from '@components/features/Layout';
import GoodsItemList from '@components/features/Theme/GoodsItemList';
import ThemeHeader from '@components/features/Theme/ThemeHeader';

export default function Theme() {
  return (
    <Layout>
      <ThemeHeader />
      <GoodsItemList />
    </Layout>
  );
}
