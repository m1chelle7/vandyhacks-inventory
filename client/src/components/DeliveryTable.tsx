import React, { useRef, useState, useEffect } from "react";
import {
  Group,
  Title,
  Flex,
  Table,
  TableData,
  ScrollArea,
  HoverCard,
  Text,
} from "@mantine/core";
import "@mantine/core/styles.css";
import {
  IconNavigationUp,
  IconNavigationDown,
  IconTrash,
} from "@tabler/icons-react";

interface Props {
  colorScheme: string;
}

const DeliveryTable: React.FC<Props> = ({ colorScheme }) => {
  // data displayed in the delivery table
  const [tableData, setTableData] = useState<TableData>({
    head: [
      "ID",
      "Type",
      "Quantity",
      "Price",
      "Company",
      "Date Placed",
      "Arrival Date",
    ],
    body: [],
  });

  // scrollbar and viewport
  const viewport = useRef<HTMLDivElement>(null);
  const scrollToBottom = () =>
    viewport.current!.scrollTo({
      top: viewport.current!.scrollHeight,
      behavior: "smooth",
    });
  const scrollToTop = () =>
    viewport.current!.scrollTo({ top: 0, behavior: "smooth" });

  useEffect(() => {
    // fetching data for delivery table
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/data/delivery");
        const data = await response.json();

        const body = data.map((item: any) => [
          item.id,
          item.type,
          item.quantity,
          item.price,
          item.company,

          // re-format dates for display
          new Date(item.deliverydate).toLocaleDateString("en-CA"),
          item.arrivaldate
            ? new Date(item.arrivaldate).toLocaleDateString("en-CA")
            : "N/A",
        ]);

        setTableData({
          ...tableData,
          body: body,
        });

        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Flex
      direction="column"
      align="flex-start"
      w="100rem"
      style={{ minWidth: "60vw" }}
    >
      <Group justify="center" mb={6} gap={7}>
        <Title
          order={3}
          style={{ color: colorScheme !== "black" ? "black" : "white" }}
        >
          Deliveries
        </Title>

        {/* 'up arrow' hover text */}
        <HoverCard width="9rem" shadow="md">
          <HoverCard.Target>
            <IconNavigationUp
              onClick={scrollToTop}
              color={colorScheme !== "black" ? "black" : "white"}
            />
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Text size="sm" style={{ textAlign: "center" }}>
              Scroll to Top
            </Text>
          </HoverCard.Dropdown>
        </HoverCard>

        {/* 'down arrow' hover text */}
        <HoverCard width="9rem" shadow="md">
          <HoverCard.Target>
            <IconNavigationDown
              onClick={scrollToBottom}
              color={colorScheme !== "black" ? "black" : "white"}
            />
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Text size="sm" style={{ textAlign: "center" }}>
              Scroll to Bottom
            </Text>
          </HoverCard.Dropdown>
        </HoverCard>

        {/* 'trash bin' hover text */}
        <HoverCard width="12rem" shadow="md">
          <HoverCard.Target>
            <IconTrash color={colorScheme !== "black" ? "black" : "white"} />
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Text size="sm" style={{ textAlign: "center" }}>
              View Deleted Deliveries
            </Text>
          </HoverCard.Dropdown>
        </HoverCard>
      </Group>

      <Text c="dimmed" size="sm" mb={3}>
        Status of ongoing and completed deliveries
      </Text>

      {/* scroll area and table dispalying deliveries */}
      <ScrollArea w="100%" h={300} viewportRef={viewport}>
        <Table
          stickyHeader
          striped
          highlightOnHover
          withColumnBorders
          data={tableData}
          w="100%"
          style={{ backgroundColor: "white" }}
          borderColor={colorScheme !== "black" ? "#DFE2E6" : "#B5B8BD"}
        />
      </ScrollArea>
    </Flex>
  );
};

export default DeliveryTable;
