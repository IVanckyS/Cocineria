import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from '@pages/Login';
import Home from '@pages/Home';
import Menu from '@pages/menu/Menu';
import GestionPlato from '@pages/menu/GestionPlato';
import EditarPlato from '@pages/menu/EditarPlato';
import CrearPlato from '@pages/menu/CrearPlato';
import GestionAsignacion from '@pages/platoingr/GestionAsignacion';
import EditarAsignacion from '@pages/platoingr/EditarAsignacion';
import CrearAsignacion from '@pages/platoingr/CrearAsignacion';
import Users from '@pages/Users';
import Register from '@pages/Register';
import Error404 from '@pages/Error404';
import Root from '@pages/Root';
import ProtectedRoute from '@components/ProtectedRoute';
import '@styles/styles.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    errorElement: <Error404/>,
    children: [
      {
        path: '/home',
        element: <Home/>
      },
      {
        path: '/users',
        element: (
        <ProtectedRoute allowedRoles={['administrador']}>
          <Users />
        </ProtectedRoute>
        ),
    },
      {
        path: '/menu',
        element: <Menu/>
      },
      {
        path: '/menu/gestion-platos',
        element: <GestionPlato/>
      },
      {
        path: '/menu/editar-plato/:id',
        element: <EditarPlato/>
      },
      {
        path: '/menu/crear-plato',
        element: <CrearPlato/>
      },
      {
        path: '/gestion-asignaciones',
        element: <GestionAsignacion/>
      },
      {
        path: '/editar-asignacion/:platoId/:ingredienteId',
        element: <EditarAsignacion/>
      },
      {
        path: '/crear-asignacion',
        element: <CrearAsignacion/>
      },
    ]
  },
  {
    path: '/auth',
    element: <Login/>
  },
  {
    path: '/register',
    element: <Register/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)