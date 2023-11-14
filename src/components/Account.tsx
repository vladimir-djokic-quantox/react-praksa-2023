import { useNavigate } from 'react-router-dom';
import useLogStore from '../store/useLogStore';
import Button from './layout/assets/Button';

function Account() {
  const { userData, logout, isLoggedin } = useLogStore();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    if (!isLoggedin) {
      navigate('/login');
    }
  };
  return (
    <div className="grid  justify-items-center">
      <div className=" bg-gray-900 overflow-hidden shadow-xl rounded-md  mt-20">
        <div className="px-4 text-center py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium ">User Profile</h3>
          <p className="mt-1 max-w-2xl text-sm ">Information about the user.</p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium ">First name</dt>
            <dd className="mt-1 text-sm  sm:mt-0 sm:col-span-2">
              {userData?.firstName}
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium ">Last name</dt>
            <dd className="mt-1 text-sm  sm:mt-0 sm:col-span-2">
              {userData?.lastName}
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium ">Username</dt>
            <dd className="mt-1 text-sm  sm:mt-0 sm:col-span-2">
              {userData?.username}
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium ">Email address</dt>
            <dd className="mt-1 text-sm  sm:mt-0 sm:col-span-2">
              {userData?.email}
            </dd>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
}

export default Account;
