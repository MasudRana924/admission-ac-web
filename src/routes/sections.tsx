import type { RouteObject } from 'react-router';

import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';

import { AuthRedirect } from 'src/components/auth-redirect';
import { ProtectedRoute } from 'src/components/protected-route';

// ----------------------------------------------------------------------

export const DashboardPage = lazy(() => import('src/pages/dashboard/dashboard'));
export const SignInPage = lazy(() => import('src/pages/auth/sign-in'));
export const SignUpPage = lazy(() => import('src/pages/auth/sign-up'));
export const VerifyOtpPage = lazy(() => import('src/pages/auth/verify-otp'));
export const ForgotPasswordPage = lazy(() => import('src/pages/auth/forgot-password'));
export const FoodsPage = lazy(() => import('src/pages/foods/foods'));
export const NewFoodPage = lazy(() => import('src/pages/foods/new-food'));
export const EditFoodPage = lazy(() => import('src/pages/foods/edit-food'));
export const FoodDetailsPage = lazy(() => import('src/pages/foods/food-details'));
export const ProfilePage = lazy(() => import('src/pages/profile/profile'));
export const ChangePasswordPage = lazy(() => import('src/pages/auth/change-password'));
export const AdvisorChatPage = lazy(() => import('src/pages/chat/advisor-chat'));
export const InstitutionsPage = lazy(() => import('src/pages/institutions/institutions'));
export const InstitutionDetailsPage = lazy(() => import('src/pages/institutions/institution-details'));
export const InstitutionApplyPage = lazy(() => import('src/pages/institutions/institution-apply'));
export const EventsPage = lazy(() => import('src/pages/events/events'));
export const EventDetailsPage = lazy(() => import('src/pages/events/event-details'));
export const EventRegisterPage = lazy(() => import('src/pages/events/event-register'));
export const ResumeBuilderPage = lazy(() => import('src/pages/resume/resume-builder'));
export const Page404 = lazy(() => import('src/pages/error/page-not-found'));

const renderFallback = () => (
  <Box
    sx={{
      display: 'flex',
      flex: '1 1 auto',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export const routesSection: RouteObject[] = [
  {
    path: '/',
    element: (
      <AuthRedirect>
        <SignInPage />
      </AuthRedirect>
    ),
  },
  {
    path: 'sign-up',
    element: (
      <AuthRedirect>
        <SignUpPage />
      </AuthRedirect>
    ),
  },
  {
    path: 'verify-otp',
    element: (
      <AuthRedirect>
        <VerifyOtpPage />
      </AuthRedirect>
    ),
  },
  {
    path: 'forgot-password',
    element: (
      <AuthRedirect>
        <ForgotPasswordPage />
      </AuthRedirect>
    ),
  },
  {
    path: 'dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <Suspense fallback={renderFallback()}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'foods', element: <FoodsPage /> },
      { path: 'foods/new', element: <NewFoodPage /> },
      { path: 'foods/:id', element: <FoodDetailsPage /> },
      { path: 'foods/:id/edit', element: <EditFoodPage /> },
    ],
  },
  {
    path: 'profile',
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <Suspense fallback={renderFallback()}>
            <ProfilePage />
          </Suspense>
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: 'change-password',
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <Suspense fallback={renderFallback()}>
            <ChangePasswordPage />
          </Suspense>
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: 'advisor-chat',
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <Suspense fallback={renderFallback()}>
            <AdvisorChatPage />
          </Suspense>
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: 'institutions',
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <Suspense fallback={renderFallback()}>
            <InstitutionsPage />
          </Suspense>
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: 'institutions/:id',
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <Suspense fallback={renderFallback()}>
            <InstitutionDetailsPage />
          </Suspense>
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: 'institutions/:id/apply',
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <Suspense fallback={renderFallback()}>
            <InstitutionApplyPage />
          </Suspense>
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: 'events',
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <Suspense fallback={renderFallback()}>
            <EventsPage />
          </Suspense>
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: 'events/:id',
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <Suspense fallback={renderFallback()}>
            <EventDetailsPage />
          </Suspense>
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: 'events/:id/register',
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <Suspense fallback={renderFallback()}>
            <EventRegisterPage />
          </Suspense>
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: 'resume-builder',
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <Suspense fallback={renderFallback()}>
            <ResumeBuilderPage />
          </Suspense>
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: 'sign-in',
    element: (
      <AuthRedirect>
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      </AuthRedirect>
    ),
  },
  {
    path: '404',
    element: <Page404 />,
  },
  { path: '*', element: <Page404 /> },
];
