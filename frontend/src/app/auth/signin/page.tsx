import { useEffect, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { regexPresets } from '@/constants';
import { repository } from '@/repositories';
import { useNavigate } from 'react-router';
import { isAuthenticated } from '@/utils/token';
import { FormInput } from '../components/form-input';

type FormData = {
  email: string;
  password: string;
}

export function SigninPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async data => {
    await repository.auth.signin(data)
    setIsLoading(true)
  };

  useEffect(() => {
    const isUserAuthenticated = isAuthenticated();
    if (isUserAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isLoading, navigate]);

  return (
    <div className="flex h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-background p-8 shadow-md">
        <h1 className="text-center text-2xl font-bold text-gray-800">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center gap-4">
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
            Sign In
          </button>
          <button
            type='button'
            disabled={isLoading}
            onClick={() => navigate('/signup')}
            className="rounded bg-white border border-blue-700 px-4 py-2 font-bold text-blue-700 hover:bg-blue-700 hover:text-white disabled:brightness-75 cursor-pointer"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}