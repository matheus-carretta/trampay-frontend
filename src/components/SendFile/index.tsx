import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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
  } = useForm<SendFileFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<SendFileFormInputs> = (data) => {
    console.log(data.csvFile[0]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="csvFile">Enviar arquivo CSV</label>
        <input type="file" id="csvFile" {...register('csvFile')} />
        {errors.csvFile && <span>{errors.csvFile.message}</span>}
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default SendFile;