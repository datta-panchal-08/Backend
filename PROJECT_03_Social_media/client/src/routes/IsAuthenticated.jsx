import { useUser } from '../context/UserContext'
import Dashboard from '../components/Dashboard';
import Login from '../pages/Login';

const IsAuthenticated = () => {
  const { user } = useUser();
  return (
    <div>
      {user ? (
        <Dashboard />
      ) : (
        <Login />
      )}
    </div>
  );
}

export default IsAuthenticated