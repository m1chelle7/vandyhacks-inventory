import React, { useRef } from 'react';

import { Group, Title, Stack, Button, Card, Flex, Table, TableData, ScrollArea, HoverCard, Text} from "@mantine/core";
import '@mantine/core/styles.css';
import { IconNavigationUp, IconNavigationDown } from "@tabler/icons-react"


const DeliveryTable: React.FC = () => {
  const viewport = useRef<HTMLDivElement>(null);
  const scrollToBottom = () =>
    viewport.current!.scrollTo({ top: viewport.current!.scrollHeight, behavior: 'smooth' });

  const scrollToCenter = () =>
    viewport.current!.scrollTo({ top: viewport.current!.scrollHeight / 2, behavior: 'smooth' });

  const scrollToTop = () => viewport.current!.scrollTo({ top: 0, behavior: 'smooth' });
  const deliveryTableData: TableData = {
    head: ['ID', 'Name', 'Quantity', 'Price', 'Company', 'Expected Delivery Date', 'Delivered'],
    body: [
      [1, "T-Shirt", 10, 11.11, "Costco", "10-30-2023", "11-23-2024"],
      [2, "Swag", 10, 11.11, "Costco", "10-30-2023", "11-23-2024"],
      [3, "Stickers", 10, 11.11, "Costco", "10-30-2023", "11-23-2024"],
      [3, "Stickers", 10, 11.11, "Costco", "10-30-2023", "11-23-2024"],
      [3, "Stickers", 10, 11.11, "Costco", "10-30-2023", "11-23-2024"],
      [3, "Stickers", 10, 11.11, "Costco", "10-30-2023", "11-23-2024"],
      [3, "Stickers", 10, 11.11, "Costco", "10-30-2023", "11-23-2024"],
      [3, "Stickers", 10, 11.11, "Costco", "10-30-2023", "11-23-2024"],
      [3, "Stickers", 10, 11.11, "Costco", "10-30-2023", "11-23-2024"],
      [3, "Stickers", 10, 11.11, "Costco", "10-30-2023", "11-23-2024"],
      [3, "Stickers", 10, 11.11, "Costco", "10-30-2023", "11-23-2024"],
    ],
  };

  return (
    <Flex direction="column" align="flex-start" w="100rem" >
      <Group justify="center" mb={10} gap={7}>
        <Title order={3}>
            Deliveries
        </Title>
        <HoverCard width="10rem" shadow="md">
          <HoverCard.Target>
            <IconNavigationUp onClick={scrollToTop}/>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Text size="sm" style={{ textAlign: 'center' }}>
              Scroll to Top
            </Text>
          </HoverCard.Dropdown>
        </HoverCard>
        <HoverCard width="10rem" shadow="md">
          <HoverCard.Target>
            <IconNavigationDown onClick={scrollToBottom}/>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Text size="sm" style={{ textAlign: 'center' }}>
              Scroll to Bottom
            </Text>
          </HoverCard.Dropdown>
        </HoverCard>
      </Group>
      
      
      <ScrollArea w="100%" h={300} scrollbars="y" viewportRef={viewport}>
        <Table stickyHeader striped highlightOnHover withColumnBorders data={deliveryTableData} w="100%"/>
      </ScrollArea>
    </Flex>
  );
}

export default DeliveryTable;
