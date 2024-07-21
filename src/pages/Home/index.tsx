import { Spacing } from '@/components/common/layouts/Spacing';
import { AiDiscoveryBanner } from '@/components/features/Home/AiDiscoveryBanner';
import { CategorySection } from '@/components/features/Home/CategorySection';
import { SelectFriendsBanner } from '@/components/features/Home/SelectFriendsBanner';

export const HomePage = () => {
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
