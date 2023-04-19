import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from "axios";

interface SignUpFormInputs {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>({
    resolver: yupResolver(schema),
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: SignUpFormInputs) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/user`, data);
      localStorage.setItem("auth", response.data.accessToken);
      window.location.href = "/login"; 
    } catch (error) {
      console.error(error);
      setErrorMessage("Erro ao realizar cadastro.");
    }
  };

  const handleClick = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <form>
      <div>
        {errorMessage && <div>{errorMessage}</div>}
        <label htmlFor="email">Email</label>
        <input type="email" id="email" {...register('email')} />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div>
        <label htmlFor="password">Senha</label>
        <input type="password" id="password" {...register('password')} />
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      <button type="button" onClick={handleClick}>Cadastrar</button>
    </form>
  );
};

export default SignUpForm;