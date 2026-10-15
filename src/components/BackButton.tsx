import { useLocation, useNavigate } from 'react-router';

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handlerBack = () => {
    if (location.key !== 'default') navigate(-1);
    else navigate('/');
  };

  return (
    <button
      onClick={handlerBack}
      className="mb-3 rounded-xl bg-green-lime px-3 text-3xl transition duration-500 hover:bg-portal"
    >
      Back to home
    </button>
  );
};

export default BackButton;
