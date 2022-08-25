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
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"
import { GiShipWheel } from 'react-icons/gi';
import { FiLayers, FiSearch } from 'react-icons/fi';
import { theme } from "./theme";
import { useState } from "react";
import { Header } from "./components/Header";

export const App = () => {

  const [activeTab, setActiveTab] = useState('datastore')
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" templateRows='5rem 1fr'>
          <Header activeTab={activeTab} setActiveTab={setActiveTab}/>
          <Grid backgroundColor='#1c1340'></Grid>
        </Grid>
      </Box>
    </ChakraProvider>
  )
}
