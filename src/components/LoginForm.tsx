import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import useFetchStore from '../store/useFetchStore';
import useLogStore from '../store/useLogStore';
import useFetchData from '../hooks/useFetchData';

type LoginFormProps = {
  email: string;
  password: string;
};

function LoginForm() {
  const { usersList } = useFetchStore();
  const { setIsLoggedin, isLoggedin } = useLogStore();
  useFetchData();
  console.log(usersList);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormProps>();

  const onSubmit: SubmitHandler<LoginFormProps> = (data) => {
    const foundUser = usersList.find(
      (user) => user.email === data.email && user.password === data.password
    );
    if (foundUser) {
      setIsLoggedin();
    }
  };
  console.log(isLoggedin);

  return (
    <div className="grid justify-items-center h-80 w-80 mt-20 rounded-md shadow-xl  bg-gray-900 ">
      <h2 className="text-2xl font-bold mt-12">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email:</label>
          <Controller
            name="email"
            control={control}
            rules={{ required: 'Email is required' }}
            render={({ field }) => (
              <input
                {...field}
                type="email"
                className="ml-2 mb-2 rounded-sm border-neutral-500"
              />
            )}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div>
          <label>Password:</label>
          <Controller
            name="password"
            control={control}
            rules={{ required: 'Password is required' }}
            render={({ field }) => (
              <input
                {...field}
                type="password"
                className="ml-2 mb-2 rounded-sm border-neutral-500"
              />
            )}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
