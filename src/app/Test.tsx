import { useDispatch } from 'react-redux';
import authReducer from '../logic/auth/authReducer';

export default function Test() {
  const updateToken = authReducer.updateToken;
  const dispatch = useDispatch();

  return (
    <div>
      <p>Main</p>
      <button
        onClick={() => {
          localStorage.removeItem('bellybuttonToken');
          dispatch(updateToken(''));
        }}
      >
        Click
      </button>
    </div>
  );
}
