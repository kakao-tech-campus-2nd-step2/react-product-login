import Page from '@components/templates/Page';
import Container from '@components/atoms/container/Container';
import MainBanner from '@components/organisms/main/MainBanner';
import CategorySection from '@components/organisms/main/category/CategorySection';
import AIButtonSection from '@components/organisms/main/AIButtonSection';
import ResponsiveContainer
  from '@components/atoms/container/ResponsiveContainer';
import CategoryContextProvider from '@/providers/CategoryContextProvider';

function MainPage() {
  return (
    <CategoryContextProvider>
      <Page>
        <Container flexDirection="column" elementSize="full-width">
          <MainBanner />
          <CategorySection />
          <AIButtonSection />
          <ResponsiveContainer
            sizeDefault={{ width: '100%', height: '120px' }}
            sizeSm={{ width: '100%', height: '0px' }}
          />
        </Container>
      </Page>
    </CategoryContextProvider>
  );
}

export default MainPage;
