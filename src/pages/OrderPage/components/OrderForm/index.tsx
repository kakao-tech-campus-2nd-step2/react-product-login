import { useEffect } from 'react';

import { Divider, useDisclosure } from '@chakra-ui/react';

import { useOrderForm } from '@/pages/OrderPage/hooks/useOrderForm';
import { OrderHistory } from '@/types/orderType';

import { Content } from '@/components/Content';
import { Alert } from '@/components/ui/Dialog/Alert';
import { Form } from '@/components/ui/Form';

import { GiftSection } from './GiftSection';
import { PaymentSection } from './PaymentSection';

type OrderFormProps = {
  orderHistory: OrderHistory;
};

export const OrderForm = ({ orderHistory }: OrderFormProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { form, handleSubmit, alertMessage, setAlertMessage } =
    useOrderForm(orderHistory);

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
    <Form {...form}>
      <form onSubmit={handleSubmit}>
        <Content height="92vh" maxWidth="1280px">
          <Divider orientation="vertical" />
          <GiftSection orderHistory={orderHistory} />
          <Divider orientation="vertical" />
          <PaymentSection orderHistory={orderHistory} />
          <Divider orientation="vertical" />
        </Content>
      </form>
      {isOpen && (
        <Alert message={alertMessage} isOpen={isOpen} onClose={onClose} />
      )}
    </Form>
  );
};
