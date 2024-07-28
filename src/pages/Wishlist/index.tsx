import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getProductDetail } from '@/api/hooks/useGetProductDetail';
import type { ProductData } from '@/types';

const WISHLIST_KEY = 'wishlist';

export const WishlistPage = () => {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [products, setProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
    if (storedWishlist.length === 0) {
      setWishlist([]);
    } else {
      setWishlist(storedWishlist);
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const productDetails = await Promise.all(
        wishlist.map(async (id) => {
          const product = await getProductDetail({ productId: id.toString() });
          return product;
        })
      );
      setProducts(productDetails);
    };

    if (wishlist.length > 0) {
      fetchProducts();
    }
  }, [wishlist]);

  const toggleFavorite = (productId: number) => {
    const updatedWishlist = wishlist.includes(productId)
      ? wishlist.filter((id) => id !== productId)
      : [...wishlist, productId];
    setWishlist(updatedWishlist);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(updatedWishlist));
  };

  return (
    <Wrapper>
      <Title>위시리스트</Title>
      {products.length > 0 ? (
        <ItemList>
          {products.map((product) => (
            <WishlistItem key={product.id}>
              <ProductImage src={product.imageUrl} alt={product.name} />
              <ProductDetails>
                <Link to={`/products/${product.id}`}>{product.name}</Link>
                <ProductPrice>{product.price.toLocaleString()}원</ProductPrice>
              </ProductDetails>
              <HeartButton
                onClick={() => toggleFavorite(product.id)}
                isFavorite={wishlist.includes(product.id)}
              >
                {wishlist.includes(product.id) ? '❤️' : '🤍'}
              </HeartButton>
            </WishlistItem>
          ))}
        </ItemList>
      ) : (
        <EmptyMessage>위시리스트가 비어 있습니다.</EmptyMessage>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const ItemList = styled.ul`
  list-style: none;
  padding: 0;
`;

const WishlistItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 20px;
`;

const ProductDetails = styled.div`
  flex-grow: 1;
`;

const ProductPrice = styled.p`
  margin-top: 5px;
  font-weight: bold;
`;

const HeartButton = styled.button<{ isFavorite: boolean }>`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${(props) => (props.isFavorite ? 'red' : 'grey')};
`;

const EmptyMessage = styled.p`
  font-size: 18px;
  color: #999;
`;
