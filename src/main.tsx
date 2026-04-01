import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/default/default.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { PageLayout } from './components/default/PageLayout.tsx';
import { ErrorPage } from './pages/404-page/404page';

import { HomePage } from './pages/home-page/homePage';
import { ContactPage } from './pages/contact-page/ContactPage';
import { CguPage } from './pages/cgu-page/CGUPage'; 

// import MaintenancePage from './pages/maintenance-page/MaintenancePage'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <MaintenancePage />
//   </StrictMode>,
// )

const router = createBrowserRouter([
  {
    element: <PageLayout />,
    errorElement: <ErrorPage />, 
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/cgu",
        element: <CguPage />,
      },
    ]
  },
  {
    path: "*",
    element: <ErrorPage />,
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
