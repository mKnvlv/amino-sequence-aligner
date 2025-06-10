import { useCallback, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import { SequenceView } from './SequenceView';
import { SequenceForm } from './SequenceForm';
import 'react-toastify/dist/ReactToastify.css';

export default function SequenceAligner() {
  const [result, setResult] = useState<{ seq1: string; seq2: string } | null>(
    null
  );

  const setResultHandler = useCallback(
    (value: { seq1: string; seq2: string }) => {
      setResult(value);
    },
    []
  );

  return (
    <Box sx={{ p: 3, maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h4">
        Анализ последовательностей аминокислот
      </Typography>

      <SequenceForm setResult={setResultHandler} />

      {result && <SequenceView seq1={result.seq1} seq2={result.seq2} />}

      <ToastContainer position="top-right" />
    </Box>
  );
}
