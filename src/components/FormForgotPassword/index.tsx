import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from "axios";
import styles from './FormForgotPassword.module.scss'
import Loading from '../Loading';

interface ForgotPasswordFormInputs {
  email: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

const FormForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormInputs>({
    resolver: yupResolver(schema),
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (data: ForgotPasswordFormInputs) => {
    try {
      setIsLoading(true);
      const response = await axios.post<{ message: string }>(`${process.env.REACT_APP_API_URL}/send-recover-email`, data);
      setSuccessMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setErrorMessage("Ocorreu um erro ao enviar o email de redefinição de senha.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <form>
      <div>
        <h1>Digite o seu email cadastrado</h1>
        {successMessage && <div>{successMessage}</div>}
        {errorMessage && <div>{errorMessage}</div>}
        <label htmlFor="email">Email</label>
        <input type="email" id="email" {...register('email')} placeholder='Digite sua senha' />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <button type="button" onClick={handleClick} disabled={isLoading} className={styles['send-button']}>
        {isLoading ? <Loading /> : <div>Enviar</div>}
      </button>
    </form>
  );
};

export default FormForgotPassword;