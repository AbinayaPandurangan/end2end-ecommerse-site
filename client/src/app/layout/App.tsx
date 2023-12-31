
import { CssBaseline } from '@mui/material';
import { Container} from '@mui/system';
import Header from './Header';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useCallback, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingComponent from './LoadingComponent';
import { useAppDispatch } from '../store/configureStore';
import { fetchBasketAsync} from '../../feature/basket/basketSlice';
import { fetchCurrentUser } from '../../feature/account/AccountSlice';
import HomePage from '../../feature/Homepage';



function App() {
  const location = useLocation()
const dispatch = useAppDispatch();
const [loading, setLoading] = useState(true);

const initApp = useCallback (async () => {
  try {
    await dispatch(fetchCurrentUser());
    await dispatch(fetchBasketAsync());
  } catch (error) {
    console.log(error)
  }
}, [dispatch])

useEffect(() => {
 initApp().then(() => setLoading(false))
}, [initApp])

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
      <ToastContainer position='bottom-right'hideProgressBar theme='colored'/>
    <CssBaseline/>
    <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
    {loading? <LoadingComponent message='Loading...'/> 
    : location.pathname === "/" ? <HomePage/>
    : <Container sx={{mt: 4}}>
    <Outlet />
    </Container>
    }
    
      </ThemeProvider>
    
  )
}

export default App
