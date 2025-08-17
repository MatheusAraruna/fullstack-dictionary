import { SigninPage } from '../app/auth/login/page';
import { HomePage } from '../app/pages/home/page';
import { AppRoutes } from './config';

export interface AppRoute {
  index?: boolean;
  path: string;
  element: React.ComponentType<{ argument?: string }>;
  isProtected?: boolean;
  argument?: string;
}

export const routeConfig: AppRoute[] = [
  {
    index: true,
    path: AppRoutes.home,
    element: HomePage,
    isProtected: true,
  },
  {
    path: AppRoutes.signin,
    element: SigninPage,
    isProtected: false,
  }
];