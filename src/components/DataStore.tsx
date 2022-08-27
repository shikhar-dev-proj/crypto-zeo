import {
  Box,
  Flex,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Sample } from "../const";
import { Data, toData } from "../types";
import { formatAddress, formatBigNumber } from "../utils";

export const DataStore = ({ activeDatastore }: { activeDatastore: string }) => {
  const [data, setData] = useState<Data>(Sample);
  const [loading, setLoading] = useState<boolean>(true);
  async function getAudience() {
    const audience = await axios.get(
      activeDatastore === "nft"
        ? "http://idu-onboarding-qa.zeotap.net/decentraland/getAllWalletProfiles"
        : "http://idu-onboarding-qa.zeotap.net/premia/getAllWalletProfiles"
    );
    setData(toData(audience.data, activeDatastore));
    setLoading(false);
  }

  useEffect(() => {
    console.log(activeDatastore);
    getAudience();
  }, [activeDatastore]);

  return loading ? (
    <Flex justifyContent="center" alignItems="center">
      <Spinner color="pink" height="8rem" width="8rem" />
    </Flex>
  ) : (
    <Box overflowY="auto" bg="#1c1340" m="3rem" maxHeight="52rem">
      <Table color="white" bg="#0c091d" variant="simple">
        <Thead color="pink" bg="#0c091d" position="sticky" top={0}>
          <Tr>
            {data.headers.map((h, i) => (
              <Th key={`${h.id}-${i}`} borderBottom="1px solid" color="pink">
                {h.name}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.rows.map((r, i) => (
            <Tr borderBottom="0.75px solid white" key={`row-${i}`}>
              {data.headers.map((h, i) => {
                if (Array.isArray(r[h.id])) {
                  if (h.id === "pool") {
                    return (
                      <Td key={`${h.id}-row-${i}`}>
                        {r[h.id].map((subAttr: any) => {
                          return (
                            <Text border="unset !important" fontSize="0.8rem">
                              name:{subAttr.name}
                            </Text>
                          );
                        })}
                      </Td>
                    );
                  } else if (h.id == "nfts") {
                    return (
                      <Td key={`${h.id}-row-${i}`}>
                        {r[h.id].map((subAttr: any) => {
                          return (
                            <Text border="unset !important" fontSize="0.8rem">
                              category:{subAttr.category}
                            </Text>
                          );
                        })}
                      </Td>
                    );
                  } else {
                    return (
                      <Td key={`${h.id}-row-${i}`}>
                        {r[h.id].map((subAttr: any) => {
                          return (
                            <Text border="unset !important" fontSize="0.8rem">
                              action:{subAttr.action}
                            </Text>
                          );
                        })}
                      </Td>
                    );
                  }
                } else {
                  return (
                    <Td
                      key={`row--${i}`}
                      border="unset !important"
                      fontSize="0.8rem"
                    >
                      {h.id === "walletId" || h.id === 'address'
                        ? formatAddress(r[h.id])
                        : h.id === "vaultsProfitLossPercent"
                        ? `${formatBigNumber(r[h.id])} %`
                        : formatBigNumber(r[h.id])}
                    </Td>
                  );
                }
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
