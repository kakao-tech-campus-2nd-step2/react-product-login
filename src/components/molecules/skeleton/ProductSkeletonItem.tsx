import SkeletonBox from '@components/atoms/skeleton/ProportionalSkeleton';
import SizedSkeleton from '@components/atoms/skeleton/SizedSkeleton';
import Container from '@components/atoms/container/Container';

function ProductSkeletonItem() {
  return (
    <Container flexDirection="column" cssProps={{ gap: '6px' }}>
      <SkeletonBox ratio={1} />
      <SizedSkeleton
        elementSize={{
          width: '100%',
          height: '19px',
        }}
        radius="3px"
      />
      <SizedSkeleton
        elementSize={{
          width: '100%',
          height: '38px',
        }}
        radius="3px"
      />
    </Container>
  );
}

export default ProductSkeletonItem;
