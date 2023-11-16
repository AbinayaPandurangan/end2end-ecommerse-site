
import { CssBaseline } from '@mui/material';
import { Container} from '@mui/system';
import Header from './Header';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';


function App() {

  const [darkMode, setDarkMode] = useState(false)
  const palletetype = darkMode? 'dark' : 'light'
  
  const theme = createTheme({
    palette: {
      mode: palletetype,
      background:{
        default: palletetype === 'light' ? '#eaeaea' : '#121212'
      }
    },
  });

  function handleThemeChange(){
    setDarkMode(!darkMode)
  }

  return (
   
    <ThemeProvider theme={theme}>
    <CssBaseline/>
    <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
    <Container>
      <Outlet />
      </Container>
      </ThemeProvider>
    
  )
}

export default App
