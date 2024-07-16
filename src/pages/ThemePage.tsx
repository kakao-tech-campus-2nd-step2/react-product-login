import { useNavigate, useParams } from 'react-router-dom';
import Page from '@components/templates/Page';
import Banner from '@components/organisms/banner/Banner';
import { MAX_CONTENT_WIDTH } from '@styles/size';
import { Suspense, useContext, useEffect } from 'react';
import FetchStatus from '@constants/FetchStatus';
import ThemeProductDisplaySection
  from '@components/organisms/theme/ThemeProductDisplaySection';
import Container from '@components/atoms/container/Container';
import ProductSkeletonGrid
  from '@components/molecules/skeleton/ProductSkeletonGrid';
import ErrorBoundary from '@components/atoms/boundary/ErrorBoundary';
import ThemeContextProvider, { ThemeContext } from '@/providers/ThemeContextProvider';

function ThemePage() {
  const { themeKey } = useParams();
  const { themes, fetchStatus: themeFetchStatus } = useContext(ThemeContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (themeFetchStatus === FetchStatus.FETCHING) return;

    if (!themeKey || !(themeKey in themes)) {
      navigate(-1);
    }
  }, [navigate, themes, themeKey, themeFetchStatus]);

  return (
    <ThemeContextProvider>
      <Page>
        <Banner themeKey={themeKey as string} />
        <Container elementSize="full-width" justifyContent="center">
          <Container
            elementSize="full-width"
            maxWidth={MAX_CONTENT_WIDTH}
            alignItems="center"
            flexDirection="column"
            padding="40px 16px"
            cssProps={{
              gap: '16px',
            }}
          >
            <ErrorBoundary>
              <Suspense fallback={
                <ProductSkeletonGrid columnsDefault={4} itemCount={8} columnsSm={2} />
              }
              >
                <ThemeProductDisplaySection
                  themeKey={themeKey as string}
                />
              </Suspense>
            </ErrorBoundary>
          </Container>
        </Container>
      </Page>
    </ThemeContextProvider>
  );
}

export default ThemePage;
