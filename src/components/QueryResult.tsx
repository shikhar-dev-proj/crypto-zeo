import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { ColumnDefinition, ColumnDefinitions, Result } from "../types/types";

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
        <Td>{result[definition.property]}</Td>
      ))}
    </Tr>
  ));
  return (
    <TableContainer>
      <Table size="sm" variant="simple">
        <Thead>
          <Tr>{columnHeads}</Tr>
        </Thead>
        <Tbody>{rows}</Tbody>
      </Table>
    </TableContainer>
  );
}
