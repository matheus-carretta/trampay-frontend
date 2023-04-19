import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from "axios";
import { useParams } from 'react-router-dom';

interface ResetPasswordFormInputs {
  password: string;
}

const schema = yup.object().shape({
  password: yup.string().required().min(8),
});

const FormResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormInputs>({
    resolver: yupResolver(schema),
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { token } = useParams();

  const onSubmit = async (data: ResetPasswordFormInputs) => {
    try {
      setIsLoading(true);
      const response = await axios.patch<{ message: string }>(`${process.env.REACT_APP_API_URL}/user/reset-password/${token}`, data);
      setSuccessMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setErrorMessage("Ocorreu um erro ao redefinir a senha.");
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
        {successMessage && <div>{successMessage}</div>}
        {errorMessage && <div>{errorMessage}</div>}
        <label htmlFor="password">Nova senha</label>
        <input type="text" id="password" {...register('password')} />
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      <button type="button" onClick={handleClick} disabled={isLoading}>
        {isLoading ? <div>Carregando...</div> : <div>Redefinir senha</div>}
      </button>
    </form>
  );
};

export default FormResetPassword;