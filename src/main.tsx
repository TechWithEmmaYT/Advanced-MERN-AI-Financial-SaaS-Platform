import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { NuqsAdapter } from "nuqs/adapters/react";
import './index.css'
import App from './App.tsx'
import { Toaster } from 'sonner'
import { Provider } from 'react-redux';
import { store } from './app/store';
import { persistor } from './app/store';
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <NuqsAdapter>
        <App />
      </NuqsAdapter>
      <Toaster 
      position="top-center" 
        expand={true}
        duration={5000}
        richColors
        closeButton
      />
    </PersistGate>
    </Provider>
  </StrictMode>,
)
