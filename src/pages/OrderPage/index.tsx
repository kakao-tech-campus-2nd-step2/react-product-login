import { useEffect } from 'react';

import { Divider, useDisclosure } from '@chakra-ui/react';

import BaseLayout from '@/layouts/BaseLayout';

import { Content } from '@/components/Content';
import { Alert } from '@/components/ui/Dialog/Alert';
import { Form } from '@/components/ui/Form';

import { GiftSection } from './components/GiftSection';
import { PaymentSection } from './components/PaymentSection';
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
      <Form {...form}>
        <form onSubmit={handleSubmit}>
          <Content height="92vh" maxWidth="1280px">
            <Divider orientation="vertical" />
            <GiftSection form={form} />
            <Divider orientation="vertical" />
            <PaymentSection form={form} />
            <Divider orientation="vertical" />
          </Content>
        </form>
      </Form>
      {isOpen && (
        <Alert message={alertMessage} isOpen={isOpen} onClose={onClose} />
      )}
    </BaseLayout>
  );
};
