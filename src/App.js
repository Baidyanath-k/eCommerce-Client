import { RouterProvider } from "react-router-dom";
import router from "./pages/Router/route";

function App() {
  return (
    <div >
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;