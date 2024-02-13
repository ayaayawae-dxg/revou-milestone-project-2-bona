import { AuthenticatedLayout, GeneralLayout } from "layouts";
import { Home, Dashboard, Login, Store } from "pages";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "",
    element: <GeneralLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "store",
    element: <AuthenticatedLayout />,
    children: [
      {
        path: "",
        element: <Store />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
]);

export default router;
