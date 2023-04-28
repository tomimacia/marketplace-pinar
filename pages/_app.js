import { ChakraProvider, Progress } from "@chakra-ui/react";
import "@fontsource/raleway/200.css";
import "@fontsource/roboto-mono/400.css";
import { RecoilRoot } from "recoil";
import { theme } from "../chakra/theme";
import { UserProvider } from "../contexts/userContext";
import { useRouterEvent } from "../items/customHooks/useRouterEvent";

export default function App({ Component, pageProps }) {
  const { loading } = useRouterEvent()

  return (
    <UserProvider>
      <RecoilRoot>
        <ChakraProvider theme={theme}>
          {loading && <Progress
            h={2}
            colorScheme="blue"
            bg="transparent"
            top={["140px","105px","105px","105px"]}            
            w="100%"            
            isIndeterminate
            position="absolute"
            zIndex={100}
          />}
          <Component {...pageProps} />
        </ChakraProvider>
      </RecoilRoot>
    </UserProvider>
  );
}
