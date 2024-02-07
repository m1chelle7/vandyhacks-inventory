import React, {useState, useEffect } from 'react';
import './App.css';
import { Text, MantineProvider, Container, Title, Stack, Button, Flex, Modal, Select, Group, NumberInput, TextInput, Indicator, Table,  TableData } from "@mantine/core";
import { DateInput, DatePicker, DatePickerProps } from '@mantine/dates';
import '@mantine/core/styles.css';
import DeliveryTable from "./components/DeliveryTable";
import InventoryTable from "./components/InventoryTable";
import Header from "./components/Header";
import { useBetween } from 'use-between';
import axios from 'axios';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const dayPlacedRenderer: DatePickerProps['renderDay'] = (date) => {
  const curDate = new Date();
  const curDay = curDate.getDate();
  const day = date.getDate();
  return (
    <Indicator size={6} color="red" offset={-4} disabled={day !== curDay}>
      <div>{day}</div>
    </Indicator>
  );
};

// interface TableData {
//   caption: string;
//   head: string[];
//   body: React.ReactNode[][];
// }


// const tableData: TableData = {
//   caption: 'Some elements from periodic table',
//   head: ['Element position', 'Atomic mass', 'Symbol', 'Element name'],
//   body: [
//     [6, 12.011, 'C', 'Carbon'],
//     [7, 14.007, 'N', 'Nitrogen'],
//     [39, 88.906, 'Y', 'Yttrium'],
//     [56, 137.33, 'Ba', 'Barium'],
//     [58, 140.12, 'Ce', 'Cerium'],
//   ],
// };

const App: React.FC = () => {

  const [openedAdd, setOpenedAdd] = useState(false);
  const [openedMod, setOpenedMod] = useState(false);
  const [openedDel, setOpenedDel] = useState(false);
  const [date, setDate] = useState<Date | null>(null);

  const [data, setData] = useState<any[]>([]);
  const [formattedData, setFormattedData] = useState<TableData | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetch('http://localhost:3001/api/data')
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setData(data);
          const arr : any [][] = [];
          data.forEach(function(object : any){
            arr.push([object.id, object.type_id]);
          });
          setFormattedData({

            body: arr
          })
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  

  // const tableData: TableData = {
  //   caption: 'Supabase Table Data',
  //   head: ['Column 1', 'Column 2', 'Column 3'], // Adjust column headers according to your Supabase table
  //   body: data.map((item) => Object.values(item).map(String)),
  // };

  // CHANGED END
  return (
    <MantineProvider>
      <div>
      <h1>Supabase Table</h1>
      <Table data={formattedData}/>
      </div> 

    
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
                        description="Input the number of items"
                        placeholder="Type here..."
                        w="100%"
                        required
                      />
                    </Flex>
                    <NumberInput
                      prefix="$"
                      label="Price"
                      placeholder="$0.00"
                      description="Input the total price (max. 2 decimal places)"
                      decimalScale={2}
                      required
                    />
                    <TextInput
                      label="Company"
                      placeholder="Type here..."
                      description="Input the company"
                      required
                    />
                    <Flex direction="row" justify="flex-start" gap="1.5rem">
                      <DateInput
                          label="Date Placed"
                          description="Select the date order was placed"
                          value={date}
                          onChange={setDate}
                          placeholder="Input the date"
                          renderDay={dayPlacedRenderer}
                          style={{minWidth:"10rem"}}
                          w="100%"
                          
                      />
                      <DateInput
                          label="Date Delivered"
                          description="Select the date order was delivered"
                          value={date}
                          onChange={setDate}
                          placeholder="Inpute the date"
                          renderDay={dayPlacedRenderer}
                          style={{minWidth:"10rem"}}
                          w="100%"
                      />
                    </Flex>

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
