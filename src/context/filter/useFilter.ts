import { useContext } from 'react';
import FilterContext from './FilterContext';

const ERROR_MESSAGE = 'useFilter must be used within an FilterProvider';

export const useFilter = () => {
  const context = useContext(FilterContext);

  if (!context) throw new Error(ERROR_MESSAGE);
  return context;
};
