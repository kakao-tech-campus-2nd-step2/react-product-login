import { Suspense, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { useDisclosure } from '@chakra-ui/react';

import { ProductErrorFallback } from '@/api/components/ProductErrorFallback';
import BaseLayout from '@/layouts/BaseLayout';

import { UpDownDots } from '@/components/Loading/UpDownDots';
import { Alert } from '@/components/ui/Dialog/Alert';

import { OrderForm } from './components/OrderForm';
import { useOrderForm } from './hooks/useOrderForm';

export const OrderPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { form, handleSubmit, alertMessage, setAlertMessage } = useOrderForm();

  useEffect(() => {
    if (alertMessage) {
      onOpen();
    } else {
      onClose();
    }
  }, [alertMessage, onClose, onOpen]);

  useEffect(() => {
    if (!isOpen) {
      setAlertMessage('');
    }
  }, [setAlertMessage, isOpen]);

  return (
    <BaseLayout>
      <ErrorBoundary FallbackComponent={ProductErrorFallback}>
        <Suspense fallback={<UpDownDots />}>
          <OrderForm form={form} handleSubmit={handleSubmit} />
          {isOpen && (
            <Alert message={alertMessage} isOpen={isOpen} onClose={onClose} />
          )}
        </Suspense>
      </ErrorBoundary>
    </BaseLayout>
  );
};
