//import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./assets/components/layout";
// import Header from "./assets/components/header";
// import Footer from "./assets/components/footer";
import Input from "./assets/pages/loginForm";
import Register from "./assets/pages/registerForm";
import ProductList from "./assets/pages/productList";
import ProductDetail from "./assets/pages/ProductDetail";
import Dashboard from "./assets/pages/Dashboard"; // Import the Dashboard component
import ProtectedRoute from "./assets/components/ProtectedRoute"; // Import the ProtectedRoute wrapper

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <ProductList />
      </Layout>
    ),
  },
  {
    path: "/login",
    element: (
      <Layout>
        <Input />
      </Layout>
    ),
  },
  {
    path: "/register",
    element: (
      <Layout>
        <Register />
      </Layout>
    ),
  },
  {
    path: "/product/:id",
    element: (
      <Layout>
        <ProductDetail />
      </Layout>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Layout>
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </Layout>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;