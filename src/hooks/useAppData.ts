import { useContext } from 'react';
import AppDataContext from '../contexts/AppDataContext';

export default () => {
  return useContext(AppDataContext);
};
