import { RouterProvider } from "react-router-dom";
import router from "./router";
import { useEffect, useState } from "react";
import { v4 } from 'uuid';

function App() {
  
  const [sessionId, setSessionId] = useState(null)
  
  useEffect(() => {
    const id = localStorage.getItem('sessionId')
    if(!id) {
      const newSessionId = v4()
      localStorage.setItem('sessionId', newSessionId)
      setSessionId(newSessionId)
    } else {
      setSessionId(id);
    }
  }, [])

  console.log(sessionId)

  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;