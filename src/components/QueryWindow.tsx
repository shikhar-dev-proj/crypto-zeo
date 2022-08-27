import {
  Box,
  Button,
  Flex,
  Grid,
  Spacer,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  ColumnDefinition,
  ColumnDefinitions,
  OptionType,
  QueryResultType,
  QueryType,
  Result,
} from "../types/types";
import {
  CatalogList,
  CatalogOperators,
  createQueryString,
  NftDefinition,
  Props,
  QueryMap,
  querySubgraph,
  UserPoolDefinition,
  UserProfitLossDefinition,
  Values,
} from "../utils/utils";
import { QueryResult } from "./QueryResult";
import { QuerySearchBar } from "./QuerySearchBar";
const url_primea =
  "https://gateway.thegraph.com/api/1464c9756cf848bb444930c8f1ccdf87/subgraphs/id/3nXfK3RbFrj6mhkGdoKRowEEti2WvmUdxmz73tben6Mb";
const url_nft =
  "https://api.thegraph.com/subgraphs/name/decentraland/marketplace";
const results: Result<any>[] = [
  { key: 1, value: { id: "12323", user: "12323234232", poolCount: 10 } },
  { key: 2, value: { id: "123sd", user: "sdfd3434343d", poolCount: 20 } },
  { key: 1, value: { id: "123sd", user: "343dddd34343", poolCount: 40 } },
];
export const QueryWindow = () => {
  const [isRunLoading, setRunLoading] = useState(false);
  const [isUpdateLoading, setUpdateLoading] = useState(false);
  const [resultValues, setResultValues] = useState<QueryResultType | null>(
    null
  );
  const [query, setQuery] = useState<QueryType>({});

  const handleRun = () => {
    const queryString = createQueryString(query);
    if (!queryString.length) return;
    const _query = QueryMap[queryString];
    if (!_query) return;
    setRunLoading(true);

    querySubgraph(`${_query}`, query.type == "accounts" ? url_nft : url_primea)
      .then((value) => {
        console.log(value);
        setResultValues(value.data.data);
        setRunLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = () => {
    setUpdateLoading(true);
    setTimeout(() => {
      setUpdateLoading(false);
    }, 2000);
  };
  const useResultValues = (): [ColumnDefinitions, unknown[]] => {
    if (resultValues?.userOwnedPools)
      return [UserPoolDefinition, resultValues?.userOwnedPools];
    if (resultValues?.userProfitLosses)
      return [UserProfitLossDefinition, resultValues?.userProfitLosses];
    if (resultValues?.accounts) return [NftDefinition, resultValues?.accounts];
    return [{ keyProperty: "", definations: [] }, []];
  };
  const [resultDefinition, resultQueryValues] = useResultValues();

  return (
    <Stack
      color="white"
      height="100%"
      direction="column"
      align="center"
      px={12}
      width="100vw"
      spacing={8}
    >
      <Stack spacing={2} width="100%" direction="row">
        <QuerySearchBar
          placeholder="Catalog"
          onChange={(change) => setQuery({ ...query, type: change[0].value })}
          options={CatalogList}
        ></QuerySearchBar>
        <QuerySearchBar
          placeholder="property"
          onChange={(change) => setQuery({ ...query, lhs: change[0].value })}
          options={query.type ? Props[query.type] : []}
        ></QuerySearchBar>
        <QuerySearchBar
          width={300}
          placeholder="operator"
          onChange={(change) =>
            setQuery({ ...query, operator: change[0].value })
          }
          options={CatalogOperators}
        ></QuerySearchBar>
        <QuerySearchBar
          placeholder="value"
          onChange={(change) => setQuery({ ...query, rhs: change[0].value })}
          options={query.type ? Values[query.type] : []}
        ></QuerySearchBar>
        <Box w={200}>
          <Stack spacing={2} width="100%" direction="row">
            <Button
              isLoading={isRunLoading}
              onClick={handleRun}
              colorScheme="teal"
              variant="solid"
            >
              Run
            </Button>

            <Button
              isLoading={isUpdateLoading}
              onClick={handleUpdate}
              colorScheme="teal"
              variant="solid"
            >
              Update
            </Button>
          </Stack>
        </Box>
      </Stack>
      <Box height="100%" width="100%" overflowY="scroll">
        {resultDefinition ? (
          <QueryResult
            cols={resultDefinition}
            results={resultQueryValues as Record<string, any>[]}
          ></QueryResult>
        ) : (
          ""
        )}
      </Box>
    </Stack>
  );
};
