import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useAppSelector } from '../../../../../../hooks';
import { RadioInput } from '../../../../../ui';
import SettingWrapper from '../../Wrapper/SettingWrapper';
import styles from './RadioForm.module.scss';

export const RadioForm = () => {
  const formName = useAppSelector((state) => state.settings.formName);

  const [inputValue, setInputValue] = useState<string>('');
  const [inputValueError, setInputValueError] = useState('');
  const [isFormCloseable, setIsFormCloseable] = useState(true);

  useEffect(() => {
    if (!inputValue) {
      setIsFormCloseable(false);
      setInputValueError("Form can't be empty");
    } else {
      setIsFormCloseable(true);
      setInputValueError('');
    }
  }, [inputValue]);

  return (
    <SettingWrapper
      formName={formName}
      inputValueDirty={true}
      inputValueError={inputValueError}
      isFormCloseable={isFormCloseable}
      inputValue={inputValue}
      setInputValue={
        setInputValue as Dispatch<SetStateAction<string | string[]>>
      }
    >
      <RadioInput
        name={formName!}
        value="male"
        checked={inputValue === 'male'}
        onChange={() => setInputValue('male')}
        text="Male"
        extraClassName={styles.radioInput}
      />
      <RadioInput
        name={formName!}
        value="female"
        checked={inputValue === 'female'}
        onChange={() => setInputValue('female')}
        text="Female"
        extraClassName={styles.radioInput}
      />
    </SettingWrapper>
  );
};
