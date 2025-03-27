import FiberCanvas from "../components/FiberCanvas";
import Navbar from "../components/Navbar";

function PlaygroundPage() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <FiberCanvas />
    </div>
  );
}

export default PlaygroundPage;
