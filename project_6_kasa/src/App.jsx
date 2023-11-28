import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { useScrollToTop } from "./hooks/use-scroll-to-top";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Housing from "./pages/housing/Housing";
import Error from "./pages/error/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: (
      <>
        <Header />
        <Error />
        <Footer />
      </>
    ),
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
  useScrollToTop();

  return (
    <>
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return <RouterProvider router={router} />;
}
