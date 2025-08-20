import { useState } from 'react';
import { FormInput } from './components/form-input';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { regexPresets } from '@/constants';
import { repository } from '@/repositories';
import { useNavigate } from 'react-router';

type FormData = {
  name: string;
  email: string;
  password: string;
}

export function SignupPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async data => {
    await repository.auth.signup(data)
    setIsLoading(true)
  };

  return (
    <div className="flex h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-background p-8 shadow-md">
        <h1 className="text-center text-2xl font-bold text-gray-800">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center gap-4">
          <FormInput 
            id='name' 
            label='Name' 
            type='text' 
            {...register("name", { 
              required: true, 
            })} 
            error={errors.name && errors.name.message}
          />
          <FormInput 
            id='email' 
            label='Email' 
            type='text' 
            {...register("email", { 
              required: true, 
              pattern: { 
                value: regexPresets.email.value, 
                message: regexPresets.email.message 
              } 
            })} 
            error={errors.email && errors.email.message}
          />
          <FormInput 
            id='password' 
            label='Senha' 
            type='password' 
            {...register("password", { 
              required: "A senha é obrigatória", 
              pattern: { 
                value: regexPresets.password.value, 
                message: regexPresets.password.message 
              } 
            })} 
            error={errors.password && errors.password.message}
          />
          <button
            type='submit'
            disabled={isLoading}
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:brightness-75 cursor-pointer"
          >
            Create account
          </button>
          <button
            type='button'
            disabled={isLoading}
            onClick={() => navigate('/signin')}
            className="rounded bg-white border border-blue-700 px-4 py-2 font-bold text-blue-700 hover:bg-blue-700 hover:text-white disabled:brightness-75 cursor-pointer"
          >
            I already have an account
          </button>
        </form>
      </div>
    </div>
  );
}