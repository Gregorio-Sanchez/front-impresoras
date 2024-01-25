import { ReactKeycloakProvider } from "@react-keycloak/web";
import { AppRouter } from "./router/AppRouter";
import keycloak from "./keycloak";
import { BusquedaProvider } from "./context/BusquedaProvider";

export const SapsprintApp2 = () => {
  return (
    <BusquedaProvider>
      <ReactKeycloakProvider
        authClient={keycloak}
        initOptions={{ onLoad: "check-sso" }}
      >
        <AppRouter />
      </ReactKeycloakProvider>
    </BusquedaProvider>
  );
}

export default SapsprintApp2;