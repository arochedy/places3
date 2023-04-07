import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { WagmiConfig } from "wagmi";

import { App } from "./routes/App";
import { client } from "./wagmi";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Info } from "./routes/Info";
import { ChakraProvider } from "@chakra-ui/react";
import { DaoPage } from "./routes/DaoPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "info",
    element: <Info />,
  },
  {
    path: "dao",
    element: <DaoPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      {/* <App /> */}
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </WagmiConfig>
  </React.StrictMode>
);
