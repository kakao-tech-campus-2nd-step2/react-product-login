import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Spacing } from '@/components/common/layouts/Spacing';
import { AiDiscoveryBanner } from '@/components/features/Home/AiDiscoveryBanner';
import { CategorySection } from '@/components/features/Home/CategorySection';
import { SelectFriendsBanner } from '@/components/features/Home/SelectFriendsBanner';
import { authSessionStorage } from '@/utils/storage';

export const HomePage = () => {
  const navigate = useNavigate();
  const user = authSessionStorage.get();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <>
      <SelectFriendsBanner />
      <CategorySection />
      <AiDiscoveryBanner />
      <Spacing
        height={{
          initial: 40,
          sm: 80,
          md: 120,
        }}
      />
    </>
  );
};
