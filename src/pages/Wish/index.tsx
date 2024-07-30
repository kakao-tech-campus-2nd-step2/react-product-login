import { AsyncBoundary } from '@/components/common/AsyncBoundary';
import { SplitLayout } from '@/components/common/layouts/SplitLayout';
import { LoadingView } from '@/components/common/View/LoadingView';
import { Wish } from '@/components/features/Wish';
import { Sidebar } from '@/components/features/Wish/Sidebar';

export const WishPage = () => {
  return (
    <>
      <AsyncBoundary pendingFallback={<LoadingView />} rejectedFallback={<div>에러 페이지</div>}>
        <SplitLayout sidebar={<Sidebar />} isSidebarOnLeft={true}>
          <Wish />
        </SplitLayout>
      </AsyncBoundary>
    </>
  );
};
