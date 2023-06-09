import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import Loading from '../Loading';
import './SendFile.module.scss';

interface SendFileFormInputs {
  csvFile: FileList;
}

const schema = yup.object().shape({
  csvFile: yup
    .mixed()
    .test('fileType', 'O arquivo deve estar no formato CSV', (value: unknown) => {
      const fileList = value as FileList;
      if (!fileList || !fileList[0]) {
        return true;
      }
      return fileList[0].type === 'text/csv';
    }),
});

const SendFile: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SendFileFormInputs>({
    resolver: yupResolver(schema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit: SubmitHandler<SendFileFormInputs> = async (data) => {
    const formData = new FormData();
    formData.append('file', data.csvFile[0]);
    const token = localStorage.getItem('auth');
    setIsLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/balance`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccessMessage(response.data.message);
      reset();
    } catch (error: any) {
      console.log(error.message)
      setErrorMessage('Não foi possível enviar o arquivo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="csvFile">Enviar arquivo CSV</label>
        <input type="file" id="csvFile" {...register('csvFile')} />
        {errors.csvFile && <span>{errors.csvFile.message}</span>}
      </div>
      {isLoading && <Loading />}
      {successMessage && <div>{successMessage}</div>}
      {errorMessage && <div>{errorMessage}</div>}
      <button type="submit">Enviar</button>
    </form>
  );
};

export default SendFile;