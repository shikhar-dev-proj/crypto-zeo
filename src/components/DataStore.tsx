import { TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot, Container, List, ListItem, Text, Box } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Sample } from "../sampleDataStore"
import { Data } from "../types"
import { formatAddress, formatBigNumber } from "../utils"


export const DataStore = () => {

  const [data, setData] = useState<Data>(Sample)
  const [loading, setLoading] = useState<boolean>(true)

  

  return (
      <Box overflowY='auto' bg='#1c1340' m='3rem' maxHeight='52rem'>
        <Table color='white' bg='#0c091d' variant='simple'>
          <Thead color='pink' bg='#0c091d' position="sticky" top={0}>
            <Tr>
              {data.headers.map((h, i) => <Th key={`${h.id}-${i}`} borderBottom='1px solid' color='pink'>{h.name}</Th>)}
            </Tr>
          </Thead>
          <Tbody>
            {data.rows.map((r, i) => <Tr borderBottom='0.75px solid white' key={`row-${i}`}>
              {data.headers.map((h, i) => {
                if (Array.isArray(r[h.id])) {
                  return <Td key={`${h.id}-row-${i}`}>
                    {r[h.id].map((subAttr: any) => {
                      if (typeof subAttr === 'object') {
                        return Object.keys(subAttr).map((subSubAttr) => <Text key={`text-${subSubAttr}`} border='unset !important' fontSize='0.8rem'>{subSubAttr}:{subAttr[subSubAttr]}</Text>)
                      } else return <Text key={`text-${subAttr}`} border='unset !important' fontSize='0.8rem'>{subAttr}:{r[h.id][subAttr]}</Text>
                  })}
                  </Td>
                } else {
                  return <Td key={`row--${i}`} border='unset !important' fontSize='0.8rem'>{h.id === 'user' ? formatAddress(r[h.id]) : formatBigNumber(r[h.id])}</Td>
                }
              })}
            </Tr>)}
          </Tbody>
        </Table>
      </Box>
  )
}