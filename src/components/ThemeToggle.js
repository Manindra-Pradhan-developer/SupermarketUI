import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { Switch, FormControlLabel } from '@mui/material';
import styled from 'styled-components';

const ToggleContainer = styled.div`
  margin: 10px;
`;

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <ToggleContainer>
      <FormControlLabel
        control={
          <Switch
            checked={theme === 'dark'}
            onChange={toggleTheme}
            name="themeToggle"
            color="primary"
          />
        }
        label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      />
    </ToggleContainer>
  );
};

export default ThemeToggle;