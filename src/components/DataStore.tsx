import { TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot, Container, List, ListItem, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Sample } from "../sampleDataStore"
import { Data } from "../types"

export const DataStore = () => {

  const [data, setData] = useState<Data>(Sample)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {

  }, [])

  return (
    <Container width='100%' height='100%' p={3} maxWidth='60rem !important' maxHeight='58rem !important' overflow='scroll'>
      <TableContainer color='white' m={2}>
        <Table variant='simple'>
          <Thead color='pink'>
            <Tr>
              {data.headers.map(h => <Th color='pink'>{h.name}</Th>)}
            </Tr>
          </Thead>
          <Tbody>
            {data.rows.map(r => <Tr borderBottom='0.75px solid white'>
              {data.headers.map(h => {
                if (Array.isArray(r[h.id])) {
                  return <Td>
                    {r[h.id].map((subAttr: any) => {
                      if (typeof subAttr === 'object') {
                        return Object.keys(subAttr).map((subSubAttr) => <Text border='unset !important' fontSize='0.8rem'>{subSubAttr}:{subAttr[subSubAttr]}</Text>)
                      } else return <Text border='unset !important' fontSize='0.8rem'>{subAttr}:{r[h.id][subAttr]}</Text>
                  })}
                  </Td>
                } else {
                  return <Td border='unset !important' fontSize='0.8rem'>{r[h.id]}</Td>
                }
              })}
              {/* <Td border='unset !important'>inches</Td>
              <Td border='unset !important'>millimetres (mm)</Td>
              <Td border='unset !important' isNumeric>25.4</Td> */}
            </Tr>)}
            {/* <Tr borderBottom='0.75px solid white'>
              <Td border='unset !important'>inches</Td>
              <Td border='unset !important'>millimetres (mm)</Td>
              <Td border='unset !important' isNumeric>25.4</Td>
            </Tr>
            <Tr borderBottom='0.75px solid white'>
              <Td border='unset !important'>feet</Td>
              <Td border='unset !important'>centimetres (cm)</Td>
              <Td border='unset !important' isNumeric>30.48</Td>
            </Tr>
            <Tr borderBottom='0.75px solid white'>
              <Td border='unset !important'>yards</Td>
              <Td border='unset !important'>metres (m)</Td>
              <Td border='unset !important' isNumeric>0.91444</Td>
            </Tr> */}
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  )
}