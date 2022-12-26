import { redirect } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./Dashboard";
import ErrorPage from "./Error";
import Root from "./Root";

const user = true;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/error",
    element: <ErrorPage />,
  },
]);

export default router;
