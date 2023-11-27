
import { CssBaseline } from '@mui/material';
import { Container} from '@mui/system';
import Header from './Header';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCookie } from '../util/util';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useAppDispatch } from '../store/configureStore';
import { setBasket } from '../../feature/basket/basketSlice';


function App() {
const dispatch = useAppDispatch();
const [loading, setLoading] = useState(true);

useEffect(() => {
  const buyerId = getCookie('buyerId');
  if (buyerId) {
    agent.Basket.get()
    .then(basket => dispatch(setBasket(basket)))
    .catch(error => console.log(error))
    .finally(()=> setLoading(false))

  } else{
    setLoading(false)
  }
}, [dispatch])

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

  if (loading) return <LoadingComponent message='Loading...'/>

  return (
   
    <ThemeProvider theme={theme}>
      <ToastContainer position='bottom-right'hideProgressBar theme='colored'/>
    <CssBaseline/>
    <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
    <Container>
      <Outlet />
      </Container>
      </ThemeProvider>
    
  )
}

export default App
