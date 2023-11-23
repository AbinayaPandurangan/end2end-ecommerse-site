import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import '../src/app/layout/styles.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/layout/router/Routes';
import { StoreProvider } from './app/context/StoreContext';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider>
    <RouterProvider router={router}/>
    </StoreProvider>
  </React.StrictMode>,
)
