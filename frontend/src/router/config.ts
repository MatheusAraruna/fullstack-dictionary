export const AppRoutes = {
  home: '/',
  signin: '/signin',
  signup: '/signup',
} as const;

export type AppRouteKeys = keyof typeof AppRoutes;