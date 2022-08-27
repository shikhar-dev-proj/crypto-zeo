import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { ColumnDefinition, ColumnDefinitions, Result } from "../types/types";
import { format } from "../utils";

export type QueryResultProps = {
  results: Record<string, any>[];
  cols: ColumnDefinitions;
};
export function QueryResult(props: QueryResultProps) {
  const columnHeads = props.cols.definations.map((definition) => (
    <Th>{definition.label}</Th>
  ));
  const rows = props.results.map((result) => (
    <Tr key={result[props.cols.keyProperty]}>
      {props.cols.definations.map((definition) => (
        <Td>
          {definition.formatter
            ? format(result[definition.property], definition.formatter)
            : result[definition.property]}
        </Td>
      ))}
    </Tr>
  ));
  return (
    <Box overflowY="auto" bg="#1c1340" m="3rem" maxHeight="52rem">
      <Table color="white" bg="#0c091d" size="sm" variant="simple">
        <Thead color="pink" bg="#0c091d" position="sticky" top={0}>
          <Tr>{columnHeads}</Tr>
        </Thead>
        <Tbody>{rows}</Tbody>
      </Table>
    </Box>
  );
}
