import {
  Grid,
  Flex,
  HStack,
  Spacer,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Text,
} from "@chakra-ui/react";
import { FiLayers, FiSearch } from "react-icons/fi";
import { GiShipWheel } from "react-icons/gi";

export type HeaderProps = {
  activeTab: string;
  setActiveTab: Function;
  activeSelection: string;
  onDatastoreChanged: (selection: string) => void;
};

export const Header = ({
  activeTab,
  setActiveTab,
  activeSelection,
  onDatastoreChanged,
}: HeaderProps) => {
  return (
    <Grid
      backgroundColor="#0c091d"
      templateColumns="11rem 16rem 1fr 5rem"
      p={2}
      alignItems="center"
      color="white"
    >
      <Flex alignItems="center" ml="1rem">
        <GiShipWheel color="pink" fontSize="3rem" />
      </Flex>
      <Flex gap="1rem">
        <HStack
          p={1}
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          fontSize="1rem"
          color={activeTab === "datastore" ? "pink" : "white"}
          onClick={() => setActiveTab("datastore")}
        >
          <FiLayers />
          <Text>DataStore</Text>
        </HStack>
        <HStack
          p={1}
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          fontSize="1rem"
          color={activeTab === "query" ? "pink" : "white"}
          onClick={() => setActiveTab("query")}
        >
          <Text> Populate </Text>
        </HStack>
      </Flex>
      <Spacer />
      <Menu>
        <MenuButton p={4} as={Button} colorScheme="pink">
          {activeSelection === "primea" ? "DefiX" : "NFT"}
        </MenuButton>
        <MenuList backgroundColor="#1c1340">
          <MenuItem
            onClick={() => onDatastoreChanged("primea")}
            _hover={{ bg: "#0c091d" }}
            _focus={{ bg: "#0c091d" }}
          >
            <Text> DefiX </Text>
          </MenuItem>
          <MenuItem
            onClick={() => onDatastoreChanged("nft")}
            _hover={{ bg: "#0c091d" }}
            _focus={{ bg: "#0c091d" }}
          >
            <Text> NFT </Text>
          </MenuItem>
        </MenuList>
      </Menu>
    </Grid>
  );
};
