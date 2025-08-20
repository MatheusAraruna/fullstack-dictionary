import { createElement, Suspense } from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router';

import { AppRoutes } from './config';
import { routeConfig, type AppRoute } from './routes';
import { AuthGuard } from '../lib/auth-guard';
import { AppLayout } from '../app/layout/app-layout';
import { SigninPage } from '@/app/auth/signin/page';
import { SignupPage } from '@/app/auth/signup/page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      ...routeConfig.map((route: AppRoute) => ({
        path: route.path,
        element:
          <AuthGuard>
            {createElement(route.element, { argument: route?.argument })}
          </AuthGuard>
      })),
    ],
  },
  {
    path: '/signin',
    element: <SigninPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '*',
    element: <Navigate to={AppRoutes.signin} replace />,
  },
]);

export function AppRouter() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}