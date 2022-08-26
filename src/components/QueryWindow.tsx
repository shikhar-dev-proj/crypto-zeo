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
  OptionType,
  QueryResultType,
  Result,
} from "../types/types";
import {
  CatalogOptionsData,
  querySubgraph,
  UserPoolDefinition,
  UserProfitLossDefinition,
} from "../utils/utils";
import { QueryResult } from "./QueryResult";
import { QuerySearchBar } from "./QuerySearchBar";

const results: Result<any>[] = [
  { key: 1, value: { id: "12323", user: "12323234232", poolCount: 10 } },
  { key: 2, value: { id: "123sd", user: "sdfd3434343d", poolCount: 20 } },
  { key: 1, value: { id: "123sd", user: "343dddd34343", poolCount: 40 } },
];
export const QueryWindow = () => {
  const [isRunLoading, setRunLoading] = useState(false);
  const [isUpdateLoading, setUpdateLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);
  const [resultValues, setResultValues] = useState<QueryResultType | null>(
    null
  );
  const handleChange = (_selectedOptions: OptionType[]) => {
    setSelectedOptions(_selectedOptions);
  };
  const handleRun = () => {
    if (!selectedOptions.length) return;
    const query = selectedOptions.map((options) => options.value).join("");
    setRunLoading(true);
    querySubgraph(`{${query}}`)
      .then((value) => {
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

  const tabs = resultValues
    ? selectedOptions.map((option) => <Tab>{option.label}</Tab>)
    : "";

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
      <Stack spacing={4} width="100%" direction="row">
        <QuerySearchBar
          onChange={handleChange}
          options={CatalogOptionsData}
        ></QuerySearchBar>
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

      <Tabs width="100%" variant="soft-rounded" colorScheme="green">
        <TabList>{tabs}</TabList>
        {resultValues ? (
          <TabPanels>
            <TabPanel>
              {resultValues.userOwnedPools ? (
                <Box>
                  <QueryResult
                    cols={UserPoolDefinition}
                    results={
                      resultValues.userOwnedPools as Record<string, any>[]
                    }
                  ></QueryResult>
                </Box>
              ) : (
                "No data available"
              )}
            </TabPanel>
            <TabPanel>
              {resultValues.userProfitLosses ? (
                <Box>
                  <QueryResult
                    cols={UserProfitLossDefinition}
                    results={
                      resultValues.userProfitLosses as Record<string, any>[]
                    }
                  ></QueryResult>
                </Box>
              ) : (
                "No data available"
              )}
            </TabPanel>
          </TabPanels>
        ) : (
          ""
        )}
      </Tabs>
      {/* <Stack spacing={4} direction="column" width="100%">
        {resultValues.userOwnedPools ? (
          <Box>
            <QueryResult
              cols={UserPoolDefinition}
              results={resultValues.userOwnedPools as Record<string, any>[]}
            ></QueryResult>
          </Box>
        ) : (
          ""
        )}
        {resultValues.userProfitLosses ? (
          <Box>
            <QueryResult
              cols={UserProfitLossDefinition}
              results={resultValues.userProfitLosses as Record<string, any>[]}
            ></QueryResult>
          </Box>
        ) : (
          ""
        )}
      </Stack> */}
    </Stack>
  );
};
