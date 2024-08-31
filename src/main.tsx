import { createRoot } from "react-dom/client"
import "./index.css"
import AppRoutes from "./routes/Routes.tsx"

createRoot(document.getElementById("root")!).render(<AppRoutes />)
