import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AppContextProvider } from './context/AppContext.jsx'
import { ClerkProvider } from "@clerk/clerk-react"
import { ToastContainer,Bounce } from 'react-toastify';

// import "tinymce/tinymce"; 
// import "tinymce/themes/silver"; 
// import "tinymce/icons/default"; 
// import "tinymce/plugins/advlist";
// import "tinymce/plugins/autolink";
// import "tinymce/plugins/lists";
// import "tinymce/plugins/link";
// import "tinymce/plugins/image";
// import "tinymce/plugins/charmap";
// import "tinymce/plugins/preview";
// import "tinymce/plugins/fullscreen";


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
     throw new Error("Missing Publishable Key")
}

createRoot(document.getElementById('root')).render(

     <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">

          <BrowserRouter>

               <AppContextProvider>
                    <ToastContainer
                         position="top-center"
                         autoClose={3000}
                         hideProgressBar={false}
                         newestOnTop={false}
                         closeOnClick={false}
                         rtl={false}
                         limit={3}
                         pauseOnFocusLoss
                         draggable
                         pauseOnHover
                         theme="light"
                         transition={Bounce}
                    />
                    <App />

               </AppContextProvider>

          </BrowserRouter>

     </ClerkProvider>

)
