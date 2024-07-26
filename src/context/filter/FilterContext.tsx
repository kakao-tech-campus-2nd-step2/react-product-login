import { createContext } from 'react';
import { TargetType, WishType } from '@components/features/Home/Filter/constants';

interface FilterContextProps {
  selectedTarget: TargetType;
  selectedWish: WishType;
  selectTarget: (target: TargetType) => void;
  selectWish: (wish: WishType) => void;
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export default FilterContext;
