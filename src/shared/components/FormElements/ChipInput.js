import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Chip,
  FormHelperText,
  InputLabel
} from '@mui/material';

const ChipInput = ({ 
  label, 
  helperText, 
  value = '', 
  onChange, 
  placeholder = "Type and press Enter to add",
  id,
  multiline = false
}) => {
  const [inputValue, setInputValue] = useState('');
  const [chips, setChips] = useState([]);

  // Initialize chips from value prop
  useEffect(() => {
    if (value) {
      // Handle both comma-separated strings and arrays
      const chipsArray = Array.isArray(value) 
        ? value 
        : value.split(',').map(item => item.trim()).filter(item => item);
      setChips(chipsArray);
    }
  }, [value]);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addChip();
    }
  };

  const addChip = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !chips.includes(trimmedValue)) {
      const newChips = [...chips, trimmedValue];
      setChips(newChips);
      setInputValue('');
      // Call onChange with comma-separated string for backend compatibility
      onChange(newChips.join(', '));
    }
  };

  const removeChip = (chipToRemove) => {
    const newChips = chips.filter(chip => chip !== chipToRemove);
    setChips(newChips);
    // Call onChange with comma-separated string for backend compatibility
    onChange(newChips.join(', '));
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <Box>
      <InputLabel htmlFor={id} sx={{ mb: 1, color: 'text.primary' }}>
        {label}
      </InputLabel>
      <TextField
        id={id}
        fullWidth
        multiline={multiline}
        rows={multiline ? 2 : 1}
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        variant="outlined"
        size="small"
        sx={{ mb: 1 }}
      />
      {chips.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
          {chips.map((chip, index) => (
            <Chip
              key={index}
              label={chip}
              onDelete={() => removeChip(chip)}
              color="primary"
              variant="outlined"
              size="small"
            />
          ))}
        </Box>
      )}
      {helperText && (
        <FormHelperText>
          {helperText}
        </FormHelperText>
      )}
    </Box>
  );
};

export default ChipInput;
