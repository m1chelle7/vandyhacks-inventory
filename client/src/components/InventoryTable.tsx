import React, { useState, useEffect } from 'react';
import { 
  Text, 
  Group, 
  Title, 
  Flex, 
  Table, 
  TableData, 
  Modal, 
  HoverCard
} from "@mantine/core";
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

  const [tableData, setTableData] = useState<TableData>({
    head: ['ID', 'Quantity'],
    body: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/data/inventory');
        const data = await response.json();

        const body = data.map((item: any) => [
          item.id,
          item.quantity,
        ]);
        
        setTableData({
          ...tableData,
          body: body,
        });

        console.log(data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <Flex direction="column" align="flex-start" w="100%" style={{minWidth: '30vw'}}>
        <Group gap={7} mb={6} align="center">
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
          <HoverCard width="9rem" shadow="md">
            <HoverCard.Target>
              <IconSquarePlus onClick={() => setOpenedAddQuant(true)} size={"1.5rem"}/>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Text size="sm" style={{ textAlign: 'center' }}>
                Add to Inventory
              </Text>
            </HoverCard.Dropdown>
          </HoverCard>
          <HoverCard width="12rem" shadow="md">
            <HoverCard.Target>
              <IconSquareX onClick={() => setOpenedDelQuant(true)} size={"1.5rem"}/>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Text size="sm" style={{ textAlign: 'center' }}>
                Delete From Inventory
              </Text>
            </HoverCard.Dropdown>
          </HoverCard>

        </Group>
        <Text c="dimmed" size="sm" mb={3}>
          Status of club inventory
        </Text>
        
        <Table striped highlightOnHover withColumnBorders data={tableData}/>

    </Flex>
    
  );
}

export default InventoryTable;
