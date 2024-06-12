import './globals.css'

// Import for invoke command rust
// import { invoke } from "@tauri-apps/api/tauri";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

function App() {
  // Example for commands with rust
  // const [greetMsg, setGreetMsg] = useState("");
  // const [name, setName] = useState("");
  //
  // async function greet() {
  //   // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  //   setGreetMsg(await invoke("greet", { name }));
  // }

  return (
    <RouterProvider router={router} />
  );
}

export default App;
