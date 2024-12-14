import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from '@pages/Login';
import Home from '@pages/Home';
import Menu from '@pages/Menu';
import Users from '@pages/Users';
import Register from '@pages/Register';
import Error404 from '@pages/Error404';
import Root from '@pages/Root';
import CreateWorkerPage from '@pages/CreateWorkerPage';
import EditWorkerPage from '@pages/EditWorkerPage';
import GestionarInventarioPage from "@pages/inventario/GestionarInventarioPage";
import CrearIngredientePage from "@pages/inventario/CrearIngredientePage";
import VerIngredientesPage from "@pages/inventario/VerIngredientesPage";
import EliminarIngredientePage from "@pages/inventario/EliminarIngredientePage";
import VerIngredientePage from "@pages/inventario/VerIngredientePage";
import EditarIngredientePage from "@pages/inventario/EditarIngredientePage";
import GenerarReportePage from "@pages/inventario/GenerarReportePage";
import ProtectedRoute from '@components/ProtectedRoute';
import '@styles/styles.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error404 />,
    children: [
      {
        path: '/home',
        element: <Home />,
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
        path: '/create-worker',
        element: (
          <ProtectedRoute allowedRoles={['administrador']}>
            <CreateWorkerPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/workers',
        element: (
          <ProtectedRoute allowedRoles={['administrador']}>
            <Users />
          </ProtectedRoute>
        ),
      },
      {
        path: '/edit-worker/:id',
        element: (
          <ProtectedRoute allowedRoles={['administrador']}>
            <EditWorkerPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/inventario',
        element: <GestionarInventarioPage />,
      },
      {
        path: '/inventario/crear',
        element: <CrearIngredientePage />,
      },
      {
        path: '/inventario/ver',
        element: <VerIngredientesPage />,
      },
      {
        path: '/inventario/eliminar',
        element: <EliminarIngredientePage />,
      },
      {
        path: '/inventario/ver-un-ingrediente',
        element: <VerIngredientePage />,
      },
      {
        path: '/inventario/editar',
        element: <EditarIngredientePage />,
      },
      {
        path: '/inventario/generar-reporte',
        element: <GenerarReportePage />,
      },
      {
        path: '/menu',
        element: <Menu />,
      },
    ],
  },
  {
    path: '/auth',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);