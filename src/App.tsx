//import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Input from "./assets/pages/loginForm";
import Register from "./assets/pages/registerForm";
import ProductList from "./assets/pages/productList";
import ProductDetail from "./assets/pages/ProductDetail";
import Header from "./assets/components/header";
import Footer from "./assets/components/footer";
import Dashboard from "./assets/pages/Dashboard"; // Import the Dashboard component
import ProtectedRoute from "./assets/components/ProtectedRoute"; // Import the ProtectedRoute wrapper

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <ProductList />
        <Footer />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Header />
        <Input />
        <Footer />
      </>
    ),
  },
  {
    path: "/register",
    element: (
      <>
        <Header />
        <Register />
        <Footer />
      </>
    ),
  },
  {
    path: "/product/:id",
    element: (
      <>
        <Header />
        <ProductDetail />
        <Footer />
      </>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <>
        <Header />
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
        <Footer />
      </>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;