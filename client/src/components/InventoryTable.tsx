import React, { useState } from 'react';

import { Text, createTheme, MantineProvider, Container, Burger, Group, Title, Stack, Button, Card, Flex, Table, TableData, Modal} from "@mantine/core";
import '@mantine/core/styles.css';
import { IconSquarePlus, IconSquareX } from '@tabler/icons-react';

const InventoryTable: React.FC = () => {
  const [openedAddQuant, setOpenedAddQuant] = useState(false);
  const [openedDelQuant, setOpenedDelQuant] = useState(false);

  const inventoryTableData: TableData = {
    head: ['ID', 'Type', 'Quantity'],
    body: [
      [1, "T-Shirt", 10],
      [2, "Swag", 11],
      [3, "Stickers", 20],
    ],
  };
  return (
    <Flex direction="column" align="flex-start" w="100%" style={{minWidth: '30vw'}}>
        <Group gap={7} mb={10} align="center">
          <Title order={3}>
              Inventory
          </Title>
          <Modal opened={openedAddQuant} onClose={() => setOpenedAddQuant(false)} title="Authentication" centered>
            <Text>
              oiwjefjw
            </Text>
          </Modal>
          <Modal opened={openedDelQuant} onClose={() => setOpenedDelQuant(false)} title="Authentication" centered>
            <Text>
              123
            </Text>
          </Modal>
          <IconSquarePlus onClick={() => setOpenedAddQuant(true)} size={"1.5rem"}></IconSquarePlus>
          <IconSquareX onClick={() => setOpenedDelQuant(true)} size={"1.5rem"}></IconSquareX>

        </Group>
        
        <Table striped highlightOnHover withColumnBorders data={inventoryTableData} />

    </Flex>
    
  );
}

export default InventoryTable;
