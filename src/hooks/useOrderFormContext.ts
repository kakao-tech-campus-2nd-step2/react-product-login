import { useFormContext } from 'react-hook-form';

import type { OrderFormData } from '@/types';

export const useOrderFormContext = useFormContext<OrderFormData>;
