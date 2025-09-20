import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Chip,
  FormHelperText,
  InputLabel
} from '@mui/material';

const SkillsChipInput = ({ 
  label, 
  helperText, 
  value = '', 
  onChange, 
  placeholder = "Type a skill and press Enter",
  id 
}) => {
  const [inputValue, setInputValue] = useState('');
  const [skills, setSkills] = useState([]);

  // Initialize skills from value prop
  useEffect(() => {
    if (value) {
      // Handle both comma-separated strings and arrays
      const skillsArray = Array.isArray(value) 
        ? value 
        : value.split(',').map(skill => skill.trim()).filter(skill => skill);
      setSkills(skillsArray);
    }
  }, [value]);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addSkill();
    }
  };

  const addSkill = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !skills.includes(trimmedValue)) {
      const newSkills = [...skills, trimmedValue];
      setSkills(newSkills);
      setInputValue('');
      // Call onChange with comma-separated string for backend compatibility
      onChange(newSkills.join(', '));
    }
  };

  const removeSkill = (skillToRemove) => {
    const newSkills = skills.filter(skill => skill !== skillToRemove);
    setSkills(newSkills);
    // Call onChange with comma-separated string for backend compatibility
    onChange(newSkills.join(', '));
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
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        variant="outlined"
        size="small"
        sx={{ mb: 1 }}
      />
      {skills.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
          {skills.map((skill, index) => (
            <Chip
              key={index}
              label={skill}
              onDelete={() => removeSkill(skill)}
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

export default SkillsChipInput;
