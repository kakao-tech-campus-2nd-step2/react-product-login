import { ReactNode } from 'react';
import FetchStatus from '@constants/FetchStatus';
import Container from '@components/atoms/container/Container';
import LoadingSpinner from '@components/atoms/LoadingSpinner';
import { FetchStatusType } from '@/types';

interface FetchStatusBoundaryProps {
  children: ReactNode;
  fetchStatus: FetchStatusType;
  loadingComponent?: ReactNode;
  errorComponent?: ReactNode;
  errorMessage?: string;
}

function FetchStatusBoundary({
  children, fetchStatus, loadingComponent, errorComponent, errorMessage,
}: FetchStatusBoundaryProps) {
  if (fetchStatus === FetchStatus.FETCHING) {
    return loadingComponent || (
      <Container elementSize="full-width" justifyContent="center">
        <Container elementSize={{ width: '80px', height: '80px' }}>
          <LoadingSpinner />
        </Container>
      </Container>
    );
  }

  if (fetchStatus === FetchStatus.FETCH_ERROR) {
    return errorComponent || (
      <Container elementSize="full-width" justifyContent="center">
        <p>{errorMessage || '서버에서 데이터 로드 중 오류가 발생했습니다.'}</p>
      </Container>
    );
  }

  return children;
}

export default FetchStatusBoundary;
