import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "sonner";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_KEY}>
          <App />
          <Toaster position="top-center" />
        </ClerkProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
