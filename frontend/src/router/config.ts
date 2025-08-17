export const AppRoutes = {
  home: '/',
  signin: '/signin',
} as const;

export type AppRouteKeys = keyof typeof AppRoutes;