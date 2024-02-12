import { GeneralLayout } from "layouts";
import { Home, Dashboard, Login } from "pages";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
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
    path: "login",
    element: <Login />,
  },
]);

export default router;
