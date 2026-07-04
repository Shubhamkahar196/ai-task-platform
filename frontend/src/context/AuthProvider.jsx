import { AuthProvider as Provider } from "./authContext.js";

export default function AuthProvider({ children }) {
  return <Provider>{children}</Provider>;
}

