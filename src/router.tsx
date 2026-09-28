import { createBrowserRouter } from 'react-router'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { Product } from './pages/Product'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'productos/:slug', element: <Product /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])
