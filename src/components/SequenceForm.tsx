import { FC, useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { AMINO_ACID_REGEX } from '../utils/config';

type SequenceFormProps = {
  setResult: (result: { seq1: string; seq2: string }) => void;
};
export const SequenceForm: FC<SequenceFormProps> = ({ setResult }) => {
  const [seq1, setSeq1] = useState('');
  const [seq2, setSeq2] = useState('');

  const [errors, setErrors] = useState({ seq1: '', seq2: '', length: '' });

  const validateInput = (value: string, field: 'seq1' | 'seq2') => {
    if (!AMINO_ACID_REGEX.test(value)) {
      setErrors((prev) => ({
        ...prev,
        [field]: 'Допустимые символы "ARNDCQEGHILKMFPSTWYV-"',
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, [field]: '' }));
    return true;
  };

  const handleSubmit = () => {
    const isValidSeq1 = validateInput(seq1, 'seq1');
    const isValidSeq2 = validateInput(seq2, 'seq2');

    if (!isValidSeq1 || !isValidSeq2) return;

    if (seq1.length !== seq2.length) {
      setErrors((prev) => ({
        ...prev,
        length: 'Длины последовательностей должны совпадать',
      }));
      return;
    }

    setErrors({ seq1: '', seq2: '', length: '' });
    setResult({ seq1, seq2 });
  };

  return (
    <Box
      component="form"
      sx={{ mb: 4 }}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <TextField
        label="Последовательность 1"
        value={seq1}
        onChange={(e) => {
          setSeq1(e.target.value.toUpperCase());
          validateInput(e.target.value, 'seq1');
        }}
        error={errors.seq1.length > 0}
        helperText={errors.seq1}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Последовательность 2"
        value={seq2}
        onChange={(e) => {
          setSeq2(e.target.value.toUpperCase());
          validateInput(e.target.value, 'seq2');
        }}
        error={errors.seq2.length > 0}
        helperText={errors.seq2 || errors.length}
        fullWidth
        margin="normal"
      />

      <Button
        variant="contained"
        disabled={!seq1 || !seq2}
        sx={{ mt: 2 }}
        type="submit"
      >
        Выровнять
      </Button>
    </Box>
  );
};
