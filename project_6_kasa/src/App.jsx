import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Housing from "./pages/housing/Housing";
import Error from "./pages/error/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "housing/:id",
        element: <Housing />,
      },
    ],
  },
]);

function Root() {
  return (
    <>
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
    </>
  );
}

export default function App() {
  return <RouterProvider router={router} />;
}
