import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from "axios";
import { Link } from 'react-router-dom';
import './LoginForm.module.scss'

interface LoginFormInputs {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await axios.post<{ accessToken: string }>(`${process.env.REACT_APP_API_URL}/login`, data);
      localStorage.setItem("auth", response.data.accessToken);
      window.location.href = "/#/send-balance"; 
    } catch (error) {
      console.error(error);
      setErrorMessage("Usuário ou senha incorretos.");
    }
  };

  const handleClick = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <form className="login-form">
      <div>
        <h1>Formulário de Login</h1>
        {errorMessage && <div>{errorMessage}</div>}
        <label htmlFor="email">Email</label>
        <input type="email" id="email" {...register('email')} placeholder='Digite seu email' />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div>
        <label htmlFor="password">Senha</label>
        <input type="password" id="password" {...register('password')} placeholder='Digite sua senha' />
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      <Link to="/forgot-password">Esqueceu sua senha?</Link>
      <button type="button" onClick={handleClick}>Entrar</button>
    </form>
  );
};

export default LoginForm;