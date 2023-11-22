import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import useLogStore from '../../store/useLogStore';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

type LoginFormProps = {
  username: string;
  password: string;
};

function LoginForm() {
  const { setIsLoggedin, fetchAuth, isLoggedin } = useLogStore();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormProps>();

  const onSubmit: SubmitHandler<LoginFormProps> = async (data) => {
    await fetchAuth(data.username, data.password);
    setIsLoggedin(true);
  };

  if (isLoggedin) {
    navigate('/products');
  }

  return (
    <div className="grid justify-items-center h-80 w-80 mt-20 rounded-md shadow-xl bg-gray-900 ">
      <h2 className="text-2xl font-bold mt-12">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-right">
          {' '}
          <label className="text-left">Username:</label>
          <Controller
            name="username"
            control={control}
            rules={{ required: 'Username is required' }}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                type="username"
                className="ml-2 mb-2 rounded-sm border-neutral-500"
              />
            )}
          />
          {errors.username && <span>{errors.username.message}</span>}
        </div>

        <div className="text-right">
          {' '}
          <label className="text-left">Password:</label>
          <Controller
            name="password"
            control={control}
            rules={{ required: 'Password is required' }}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                type="password"
                className="ml-2 mb-2 rounded-sm border-neutral-500 justify-end"
              />
            )}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <div className="grid justify-items-center mt-8">
          <Button type="submit">Login</Button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
