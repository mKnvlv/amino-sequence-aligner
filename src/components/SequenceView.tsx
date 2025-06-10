import { FC, useCallback } from 'react';
import { toast } from 'react-toastify';
import { Box } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import { AMINO_COLORS, ERROR_COLOR } from '../utils/config';

type SequenceViewProps = {
  seq1: string;
  seq2: string;
};
export const SequenceView: FC<SequenceViewProps> = ({ seq1, seq2 }) => {
  const handleSelection = useCallback(() => {
    const selection = window.getSelection()?.toString();
    if (selection) {
      navigator.clipboard.writeText(selection);
      toast.success('Скопировано в буфер!', { autoClose: 1000 });
    }
  }, []);

  return (
    <Box
      sx={{
        wordWrap: 'break-word',
        backgroundColor: '#f5f5f5',
        p: 2,
        borderRadius: 1,
      }}
      onMouseUp={handleSelection}
    >
      {/* Верхняя строка с цветами из AMINO_COLORS*/}
      <Box sx={{ mb: 1 }}>
        {seq1.split('').map((char) => (
          <span
            key={char}
            style={{ backgroundColor: AMINO_COLORS[char], padding: '2px' }}
          >
            {char}
          </span>
        ))}
      </Box>

      {/* Нижняя строка с различиями красим только в ERROR_COLOR*/}
      <Box>
        {seq2.split('').map((char, index) => (
          <span
            key={char}
            style={{
              backgroundColor:
                char !== seq1[index] ? ERROR_COLOR : 'transparent',
              padding: '2px',
            }}
          >
            {char}
          </span>
        ))}
      </Box>
    </Box>
  );
};
