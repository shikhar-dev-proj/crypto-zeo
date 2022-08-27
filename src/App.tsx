import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  Flex,
  Heading,
  Spacer,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  HStack,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Logo } from "./Logo";
import { GiShipWheel } from "react-icons/gi";
import { FiLayers, FiSearch } from "react-icons/fi";
import { theme } from "./theme";
import { useState } from "react";
import { Header } from "./components/Header";
import { DataStore } from "./components/DataStore";
import { QueryWindow } from "./components/QueryWindow";

export const App = () => {
  const [activeTab, setActiveTab] = useState("datastore");
  const [activeDatastore, setActiveDatastore] = useState("primea");
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" templateRows="5rem 1fr">
          <Header
            activeSelection={activeDatastore}
            onDatastoreChanged={(selection) => setActiveDatastore(selection)}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <Grid width="100%" height="100%" backgroundColor="#1c1340">
            {activeTab === "datastore" ? (
              <DataStore activeDatastore={activeDatastore} />
            ) : (
              <QueryWindow />
            )}
          </Grid>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};
