
import { Route, Routes } from "react-router-dom";
import PlaygroundPage from './pages/PlaygroundPage.tsx'

function App() {
  return (
    <Routes>
      <Route path="/playground" element={<PlaygroundPage/>}/>
      <Route path="*" element="Not Found"/>
    </Routes>
  )
}

export default App
