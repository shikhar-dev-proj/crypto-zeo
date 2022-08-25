import { Grid, Flex, HStack, Spacer, Menu, MenuButton, Button, MenuList, MenuItem, Text } from "@chakra-ui/react"
import { FiLayers, FiSearch } from "react-icons/fi"
import { GiShipWheel } from "react-icons/gi"

export type HeaderProps = {
  activeTab: string,
  setActiveTab: Function
}

export const Header = ({ activeTab, setActiveTab }: HeaderProps) => {
  return (
    <Grid backgroundColor='#0c091d' templateColumns='11rem 16rem 1fr 5rem' p={2} alignItems='center' color='white'>
      <Flex alignItems='center' ml='1rem'>
        <GiShipWheel color="pink" fontSize='3rem'/>
      </Flex>
      <Flex gap='1rem'>
        <HStack 
          p={1} alignItems='center' justifyContent='center' cursor='pointer' fontSize='1rem'
          color={activeTab === 'datastore' ? 'pink' : 'white'} 
          onClick={() => setActiveTab('datastore')}>
          <FiLayers/>
          <Text>DataStore</Text>
        </HStack>
        <HStack p={1} alignItems='center' justifyContent='center' cursor='pointer' fontSize='1rem'
          color={activeTab === 'query' ? 'pink' : 'white'} 
          onClick={() => setActiveTab('query')}>
          <FiSearch/>
          <Text>Query</Text>
        </HStack>
      </Flex>
      <Spacer/>
      <Menu>
        <MenuButton as={Button} colorScheme='pink'>
          DefiX
        </MenuButton>
        <MenuList backgroundColor='#1c1340'>
          <MenuItem _hover={{ bg: '#0c091d' }} _focus={{ bg: '#0c091d' }}>DefiX</MenuItem>
          <MenuItem _hover={{ bg: '#0c091d' }} _focus={{ bg: '#0c091d' }}>CryptoKitties</MenuItem>
        </MenuList>
      </Menu>
    </Grid>
  )
}