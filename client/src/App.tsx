import React, {useState, useEffect } from 'react';
import './App.css';
import { Text, MantineProvider, Container, Title, Stack, Button, Flex, Modal, Select, Group, NumberInput} from "@mantine/core";
import '@mantine/core/styles.css';
import DeliveryTable from "./components/DeliveryTable";
import InventoryTable from "./components/InventoryTable";
import Header from "./components/Header";
import { useBetween } from 'use-between';

const App: React.FC = () => {

  const [openedAdd, setOpenedAdd] = useState(false);
  const [openedMod, setOpenedMod] = useState(false);
  const [openedDel, setOpenedDel] = useState(false);
  // const { openDelDelivery, setOpenDelDelivery } = useBetween(useShowDelDelivery);


  return (
    <MantineProvider>
      <Container fluid m="1rem">
        <Header/>
        <Flex gap="2rem" direction="row" justify="center" align="center" ml="10rem" mr="10rem" mt="2rem">
          <Stack w="10rem">
            <Modal.Root opened={openedAdd} onClose={() => setOpenedAdd(false)} centered size="30rem">
              <Modal.Overlay/>
              <Modal.Content>
                <Modal.Header>
                  <Modal.Title style={{fontWeight: "bold"}}>Add Delivery</Modal.Title>
                  <Modal.CloseButton />
                </Modal.Header>
                <Modal.Body>
                  <Stack>
                    <Flex direction="row" justify="flex-start" gap="2rem">
                      <Select
                        label="Type"
                        placeholder="Pick value"
                        description="Select the type of merch"
                        data={['T-Shirt', 'Sticker', 'Swag']}
                        style={{minWidth:"10rem"}}
                      />
                      <NumberInput
                        label="Quantity"
                        description="Input the number of items"
                        placeholder="Type here..."
                        w="100%"
                      />
                    </Flex>
                    <NumberInput
                      prefix="$"
                      label="Price"
                      placeholder="$0.00"
                      description="Input the total price (2 decimal places)"
                      decimalScale={2}
                    />
                  </Stack>
                  
                </Modal.Body>
              </Modal.Content>
            </Modal.Root>
            <Button onClick={() => setOpenedAdd(true)} fullWidth className="button" color="black">Add Delivery</Button>
            <Modal opened={openedMod} onClose={() => setOpenedMod(false)} title="Authentication" centered>
              <Text>
                Bye
              </Text>
            </Modal>
            <Button onClick={() => setOpenedMod(true)} fullWidth className="button" color="black">Modify Delivery</Button>
            <Modal opened={openedDel} onClose={() => setOpenedDel(false)} title="Authentication" centered>
              <Text>
                Boo
              </Text>
            </Modal>
            <Button onClick={() => setOpenedDel(true)} fullWidth className="button" color="black">Delete Delivery</Button>
          </Stack>
          <Container display="flex" w="100%">
            <InventoryTable></InventoryTable>
          </Container>
        </Flex>
        <Flex justify="center" align="center" ml="10rem" mr="10rem" mt="2rem">
          <DeliveryTable></DeliveryTable>
        </Flex>
        
      </Container>
      
    </MantineProvider>
    
    
  );
}

export default App;
