import { useEffect } from 'react';

import { useDisclosure } from '@chakra-ui/react';

import BaseLayout from '@/layouts/BaseLayout';

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
      <OrderForm form={form} handleSubmit={handleSubmit} />
      {isOpen && (
        <Alert message={alertMessage} isOpen={isOpen} onClose={onClose} />
      )}
    </BaseLayout>
  );
};
