import { useState, useEffect, createContext  } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import themes from '../utils/mui/themes.utils';

export const ColorModeContext = createContext({
    mode: null,
    toggleColorMode: () => {},
    setCustomTheme: () => {},
    phase: null,
    setPhase: () => {},
});


export const ColorModeProvider = ({children}) => {
    const [mode, setMode] = useState('light')
    const [phase, setPhase] = useState('focus')
    const [customTheme, setCustomTheme] = useState(themes[phase])

    useEffect(() => {
      setCustomTheme(themes[phase])
    }, [phase])

    const theme = createTheme({
        palette: {
          mode: mode,
          ...(mode === 'light' ? customTheme.light : customTheme.dark)
        },
      })
    
      const toggleColorMode = (prevMode) => {
        setMode(prevMode === 'light' ? prevMode = 'dark' : prevMode = 'light')
      };
    
    const value = {mode, toggleColorMode, setCustomTheme, phase, setPhase}

    return (
        <ColorModeContext.Provider value={value}>
            <ThemeProvider theme={theme}>
                <CssBaseline>
                {children}
                </CssBaseline>
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
};
