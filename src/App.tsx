import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SequenceAligner from './components/SequenceAligner';

export const App = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <SequenceAligner />
      <ToastContainer position="top-right" />
    </div>
  );
};
