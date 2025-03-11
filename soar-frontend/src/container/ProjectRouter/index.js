import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CustomLayout from "../CustomLayout";
import RestrictedRoute from "./RestrictedRoute";
import SignIn from "../SignIn";
import NoInternet from "../NoInternet";
import Circle from "components/Loader";
import Page404ContentNotFound from "container/Page404ContentNotFound";
import { LINK_STORE } from "constants/Link";
import Playbooks from "routes/playbooks";
import Users from "routes/user_management/config";
import Mitre from "routes/mitre";
import Login from "routes/auth/Login";  // Import the Login page


const Home = React.lazy(() => import("routes/main/home"));
const Changelog = React.lazy(() => import("routes/help/changelog"));
const Profile = React.lazy(() => import("routes/user_management/profile"));
const Configuration = React.lazy(() => import("routes/playbooks"));
const Dashboard1 = React.lazy(() => import("routes/dashboard/dashboard1"));
const Dashboard5 = React.lazy(() => import("routes/dashboard/dashboard5"));

/**
 * Renders the project router component, which sets up the routing configuration for the application.
 */
const ProjectRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <RestrictedRoute>
          <CustomLayout />
        </RestrictedRoute>
      ),

      children: [
        {
          path: LINK_STORE.HOME,
          element: <Home />,
        },
        {
          path: LINK_STORE.PROFILE,
          element: <Profile />,
        },
        {
          path: LINK_STORE.PLAYBOOKS,
          element: <Playbooks />,
        },
        {
          path: LINK_STORE.MITRE,
          element: <Mitre />,
        },
        {
          path: LINK_STORE.USERS,
          element: <Users />,
        },
        {
          path: LINK_STORE.CHANGE_lOG,
          element: <Changelog />,
        },
        {
          path: LINK_STORE.DASHBOARD1,
          element: <Dashboard1 />,
        },
        {
          path: LINK_STORE.DASHBOARD5,
          element: <Dashboard5 />,
        },
      ],
    },

    {
      path: "/login",
      element: <SignIn />,
    },
    {
      path: "/no_internet",
      element: <NoInternet />,
    },
    { path: "*", element: <Page404ContentNotFound /> },
  ]);

  return (
    <React.Suspense fallback={<Circle />}>
      <RouterProvider router={router} />
    </React.Suspense>
  );
};

export default ProjectRouter;
