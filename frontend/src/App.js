import { RouterProvider } from "react-router-dom";
import router from "./router";
import { useEffect } from "react";
import { v4 } from 'uuid';

function App() {
  
  useEffect(() => {
    const id = localStorage.getItem('sessionId')
    if(!id) {
      const newSessionId = v4()
      localStorage.setItem('sessionId', newSessionId)
    }
  }, [])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;