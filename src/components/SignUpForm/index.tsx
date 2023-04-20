import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from "axios";
import './SignUpForm.module.scss';

interface SignUpFormInputs {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(8).matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 'Senha fraca. A senha deve ter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.'),
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
      window.location.href = '/#/';  
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
        <h1>Formulário de Registro</h1>
        {errorMessage && <div>{errorMessage}</div>}
        <label htmlFor="email">Email</label>
        <input type="email" id="email" {...register('email')} placeholder='Digite seu email' />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div>
        <label htmlFor="password">Senha</label>
        <input type="password" id="password" {...register('password')} placeholder='Maiúsculas, minúsculas, números e caracteres especiais' />
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      <button type="button" onClick={handleClick}>Cadastrar</button>
    </form>
  );
};

export default SignUpForm;