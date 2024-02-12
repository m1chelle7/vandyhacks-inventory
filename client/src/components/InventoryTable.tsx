import React, { useState, useEffect } from 'react';
import { 
  Text, 
  Group, 
  Title, 
  Flex, 
  Table, 
  TableData, 
  Modal, 
  HoverCard,
  Stack,
  Select,
  NumberInput,
  TextInput,
  Checkbox,
  Button,
} from "@mantine/core";
import '@mantine/core/styles.css';
import { IconSquarePlus, IconSquareX } from '@tabler/icons-react';
interface Props {
  colorScheme: string;
}

const InventoryTable: React.FC<Props> = ({ colorScheme }) => {
  const [openedAddQuant, setOpenedAddQuant] = useState(false);
  const [openedDelQuant, setOpenedDelQuant] = useState(false);
  const [checkedIncreaseInventory, setCheckedIncreaseInventory] = useState(false);


  const [tableData, setTableData] = useState<TableData>({
    head: ['ID', 'Type', 'Quantity'],
    body: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/data/inventory');
        const data = await response.json();

        const body = data.map((item: any) => [
          item.id,
          item.type,
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
          <Title order={3} style={{color: colorScheme !== 'black' ? 'black' : 'white'}}>
              Inventory
          </Title>
          <Modal.Root opened={openedAddQuant} onClose={() => setOpenedAddQuant(false)} centered>
            <Modal.Overlay/>
            <Modal.Content>
              <Modal.Header>
                <Modal.Title style={{fontWeight: "bold"}}>Add to Inventory</Modal.Title>
                <Modal.CloseButton />
              </Modal.Header>
              <Modal.Body>
                <Stack mb={15}>
                  <Flex direction="row" justify="flex-start" gap="1.5rem">
                    <Select
                      label="Type"
                      placeholder="Pick value"
                      description="Select the type of merch"
                      data={['T-Shirt', 'Sticker', 'Swag']}
                      style={{minWidth:"10rem"}}
                      required
                    />
                    <NumberInput
                      label="Quantity"
                      description="Input the number of added items"
                      placeholder="Type here..."
                      w="100%"
                      required
                      allowNegative={false}
                    />
                  </Flex>
                  <Checkbox
                    label="I understand that I am ADDING to the inventory"
                    checked={checkedIncreaseInventory}
                    onChange={(event) => setCheckedIncreaseInventory(event.currentTarget.checked)}
                    color="black"
                    required  
                  />
                  <Button color="black">
                    Submit
                  </Button>
                </Stack>
              </Modal.Body>
            </Modal.Content>
          </Modal.Root>
          <Modal.Root opened={openedDelQuant} onClose={() => setOpenedDelQuant(false)} centered>
            <Modal.Overlay/>
            <Modal.Content>
              <Modal.Header>
                <Modal.Title style={{fontWeight: "bold"}}>Delete From Inventory</Modal.Title>
                <Modal.CloseButton />
              </Modal.Header>
              <Modal.Body>
                <Stack mb={15}>
                  <Flex direction="row" justify="flex-start" gap="1.5rem">
                    <Select
                      label="Type"
                      placeholder="Pick value"
                      description="Select the type of merch"
                      data={['T-Shirt', 'Sticker', 'Swag']}
                      style={{minWidth:"10rem"}}
                      required
                    />
                    <NumberInput
                      label="Quantity"
                      description="Input the number of removed items"
                      placeholder="Type here..."
                      w="100%"
                      required
                      allowNegative={false}
                    />
                  </Flex>
                  <Checkbox
                    label="I understand that I am DELETING from the inventory"
                    checked={checkedIncreaseInventory}
                    onChange={(event) => setCheckedIncreaseInventory(event.currentTarget.checked)}
                    color="black"
                    required  
                  />
                  <Button color="black">
                    Submit
                  </Button>
                </Stack>
              </Modal.Body>
            </Modal.Content>
          </Modal.Root>
          <HoverCard width="9rem" shadow="md">
            <HoverCard.Target>
              <IconSquarePlus
                onClick={() => setOpenedAddQuant(true)} 
                size={"1.5rem"} 
                color={colorScheme !== 'black' ? 'black' : 'white'}
              />
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Text size="sm" style={{ textAlign: 'center' }}>
                Add to Inventory
              </Text>
            </HoverCard.Dropdown>
          </HoverCard>
          <HoverCard width="12rem" shadow="md">
            <HoverCard.Target>
              <IconSquareX 
                onClick={() => setOpenedDelQuant(true)} 
                size={"1.5rem"} 
                color={colorScheme !== 'black' ? 'black' : 'white'}
              />
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Text size="sm" style={{ textAlign: 'center' }}>
                Delete From Inventory
              </Text>
            </HoverCard.Dropdown>
          </HoverCard>

        </Group>
        <Text c="dimmed" size="sm" mb={3}>
          Status of organization inventory
        </Text>
        
        <Table 
          stickyHeader 
          striped 
          highlightOnHover 
          withColumnBorders 
          data={tableData} 
          style={{backgroundColor: 'white'}} 
          borderColor={colorScheme !== 'black' ? '#DFE2E6' : '#B5B8BD'}/>
    </Flex>
  );
}

export default InventoryTable;
