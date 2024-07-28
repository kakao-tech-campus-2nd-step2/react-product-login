import { Button } from '@chakra-ui/button';
import { Container } from '@chakra-ui/layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';

type WishProduct = {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  };
};

export default function InterestList() {
  const [wishes, setWishes] = useState<WishProduct[]>([]);

  useEffect(() => {
    fetchWishes();
  }, []);

  const fetchWishes = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('/api/wishes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWishes(response.data);
    } catch (err) {
      console.log('관심 목록을 불러오는 데 실패했습니다.');
    }
  };

  const handleDeleteWish = async (wishId: number) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`/api/wishes/${wishId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWishes(wishes.filter((wish) => wish.id !== wishId));
    } catch (err) {
      console.log('관심 목록 삭제에 실패했습니다.');
    }
  };

  return (
    <Wrapper>
      <Container>
        <Grid
          columns={{
            initial: 2,
            md: 4,
          }}
          gap={16}
          >
          {wishes.map((wish: WishProduct) => (
            <Container>
              <DefaultGoodsItems
                key={wish.id}
                imageSrc={wish.product.imageUrl}
                title={wish.product.name}
                amount={wish.product.price}
                subtitle={''}
              />
              <Button mt={2} colorScheme="yellow" onClick={() => handleDeleteWish(wish.id)}>
                삭제
              </Button>
            </Container>
          ))}
        </Grid>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  padding: 28px 16px 180px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 40px 16px 360px;
  }
`;
