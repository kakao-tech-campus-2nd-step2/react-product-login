import BaseLayout from '@/layouts/BaseLayout';

import { Content } from '@/components/Content';
import { Divider } from '@/components/ui/Divider';

import { GiftSection } from './components/GiftSection';
import { PaymentSection } from './components/PaymentSection';
import { useOrderForm } from './hooks/useOrderForm';

export const OrderPage = () => {
  const { formData, handleCheckboxChange, handleInputChange, handleSubmit } =
    useOrderForm();

  return (
    <BaseLayout>
      <form onSubmit={handleSubmit}>
        <Content height="92vh" maxWidth="1280px">
          <Divider direction="vertical" />
          <GiftSection
            formData={formData}
            handleInputChange={handleInputChange}
          />
          <Divider direction="vertical" />
          <PaymentSection
            formData={formData}
            handleCheckboxChange={handleCheckboxChange}
            handleInputChange={handleInputChange}
          />
          <Divider direction="vertical" />
        </Content>
      </form>
    </BaseLayout>
  );
};
