import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Paths from '@constants/Paths';
import Page from '@components/templates/Page';
import Container from '@components/atoms/container/Container';
import { defaultBorderColor } from '@styles/colors';
import ProductMessageForm from '@components/organisms/product/ProductMessageForm';
import ProductOrderHistorySection from '@components/organisms/product/ProductOrderHistorySection';
import ProductOrderForm from '@components/organisms/product/ProductOrderForm';
import { ProductOrderPageState } from '@/types';

function ProductOrderPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [cardMessage, setCardMessage] = useState('');

  useEffect(() => {
    if (!location.state) {
      navigate(Paths.MAIN_PAGE);
    }
  }, [location.state, navigate]);

  const state = location.state as ProductOrderPageState;
  const { count, productDetails: product } = state;

  return (
    <Page>
      <Container
        elementSize={{
          width: '100%',
          height: '100vh',
        }}
        justifyContent="center"
      >
        <Container
          elementSize="full-width"
          maxWidth="1280px"
          cssProps={{
            borderLeft: `1px solid ${defaultBorderColor}`,
            borderRight: `1px solid ${defaultBorderColor}`,
          }}
        >
          <Container
            elementSize="full-width"
            alignItems="center"
            flexDirection="column"
            padding="44px 0px 32px"
          >
            <ProductMessageForm cardMessage={cardMessage} setCardMessage={setCardMessage} />
            <ProductOrderHistorySection productDetails={product} count={count} />
          </Container>
          <Container
            elementSize="full-width"
            alignItems="center"
            flexDirection="column"
            maxWidth="360px"
          >
            <ProductOrderForm productDetails={product} count={count} cardMessage={cardMessage} />
          </Container>
        </Container>
      </Container>
    </Page>
  );
}

export default ProductOrderPage;
