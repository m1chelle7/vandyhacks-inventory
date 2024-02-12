import React, { useState, useEffect } from "react";
import "./App.css";
import "@mantine/core/styles.css";
import {
  Text,
  MantineProvider,
  Container,
  Stack,
  Button,
  Flex,
  Modal,
  Select,
  NumberInput,
  TextInput,
  Indicator,
  Checkbox,
  Box,
} from "@mantine/core";
import { DateInput, DatePickerProps } from "@mantine/dates";
import DeliveryTable from "./components/DeliveryTable";
import InventoryTable from "./components/InventoryTable";
import Header from "./components/Header";

/**
 * @param date
 * @returns the date formatted as YYYY-MM-DD
 */
const dayPlacedRenderer: DatePickerProps["renderDay"] = (date) => {
  const curDate = new Date();
  const curDay = curDate.getDate();
  const day = date.getDate();

  return (
    <Indicator size={6} color="red" offset={-4} disabled={day !== curDay}>
      <div>{day}</div>
    </Indicator>
  );
};

const App: React.FC = () => {
  // modal states
  const [openedAdd, setOpenedAdd] = useState(false);
  const [openedMod, setOpenedMod] = useState(false);
  const [openedDel, setOpenedDel] = useState(false);

  // date state for modals (temp)
  const [date, setDate] = useState<Date | null>(null);

  // 'delete delivery' modal confirmed as intended action by user
  const [checkedModDelivery, setCheckedModDelivery] = useState(false);

  // ID of delivery to delete
  const [delDeliveryID, setDelDeliveryID] = useState<string | number>("");

  // color scheme setting
  const [colorScheme, setColorScheme] = useState<string>("white");

  const handleNextClick_DelDelivery = () => {
    console.log(delDeliveryID);
  };

  useEffect(() => {}, []);

  return (
    <MantineProvider>
      <Box
        className="box-padding"
        style={{ minHeight: "100vh", backgroundColor: colorScheme }}
      >
        <Container fluid>
          <Header colorScheme={colorScheme} setColorScheme={setColorScheme} />
          <Flex
            gap="2rem"
            direction="row"
            style={{ justifyContent: "center", alignItems: "center" }}
            ml="10rem"
            mr="10rem"
            mt="2rem"
          >
            <Stack w="10rem">
              {/* 'add delivery' modal */}
              <Modal.Root
                opened={openedAdd}
                onClose={() => setOpenedAdd(false)}
                centered
                size="30rem"
              >
                <Modal.Overlay />
                <Modal.Content>
                  <Modal.Header>
                    <Modal.Title style={{ fontWeight: "bold" }}>
                      Add Delivery
                    </Modal.Title>
                    <Modal.CloseButton />
                  </Modal.Header>
                  <Modal.Body>
                    <Stack mb={15}>
                      <Flex direction="row" justify="flex-start" gap="1.5rem">
                        <Select
                          label="Type"
                          placeholder="Pick value"
                          description="Select the type of merch"
                          data={["T-Shirt", "Sticker", "Swag"]}
                          style={{ minWidth: "10rem" }}
                          required
                        />
                        <NumberInput
                          label="Quantity"
                          description="Input the number of items"
                          placeholder="Type here..."
                          w="100%"
                          required
                          allowNegative={false}
                        />
                      </Flex>
                      <NumberInput
                        prefix="$"
                        label="Price"
                        placeholder="$0.00"
                        description="Input the total price (max. 2 decimal places)"
                        decimalScale={2}
                        required
                        allowNegative={false}
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
                          style={{ minWidth: "10rem" }}
                          w="100%"
                          required
                        />
                        <DateInput
                          label="Arrival Date"
                          description="Select the date order was delivered"
                          value={date}
                          onChange={setDate}
                          placeholder="Inpute the date"
                          renderDay={dayPlacedRenderer}
                          style={{ minWidth: "10rem" }}
                          w="100%"
                          required
                        />
                      </Flex>
                      <Checkbox
                        label="I understand that I am ADDING this delivery"
                        checked={checkedModDelivery}
                        onChange={(event) =>
                          setCheckedModDelivery(event.currentTarget.checked)
                        }
                        color="black"
                        required
                      />
                      <Button color="black">Submit</Button>
                    </Stack>
                  </Modal.Body>
                </Modal.Content>
              </Modal.Root>
              <Button
                onClick={() => setOpenedAdd(true)}
                fullWidth
                style={{
                  color: colorScheme !== "black" ? "white" : "black",
                  backgroundColor: colorScheme !== "black" ? "black" : "white",
                }}
              >
                Add Delivery
              </Button>

              {/* 'modify delivery' modal */}
              <Modal.Root
                opened={openedMod}
                onClose={() => setOpenedMod(false)}
                centered
                size="30rem"
              >
                <Modal.Overlay />
                <Modal.Content>
                  <Modal.Header>
                    <Modal.Title style={{ fontWeight: "bold" }}>
                      Modify Delivery
                    </Modal.Title>
                    <Modal.CloseButton />
                  </Modal.Header>
                  <Modal.Body>
                    <Stack mb={15}>
                      <Flex direction="row" justify="flex-start" gap="1.5rem">
                        <NumberInput
                          label="Delivery ID"
                          description="Input the delivery ID"
                          placeholder="Type here..."
                          w="100%"
                          required
                          allowNegative={false}
                        />
                      </Flex>
                      <Select
                        label="Change Type"
                        placeholder="Pick value"
                        description="Select the type of merch"
                        data={["T-Shirt", "Sticker", "Swag"]}
                        style={{ minWidth: "10rem" }}
                      />
                      <NumberInput
                        prefix="$"
                        label="Change Price"
                        placeholder="$0.00"
                        description="Input the total price (max. 2 decimal places)"
                        decimalScale={2}
                        allowNegative={false}
                      />
                      <TextInput
                        label="Change Company"
                        placeholder="Type here..."
                        description="Input the company"
                      />
                      <Flex direction="row" justify="flex-start" gap="1.5rem">
                        <DateInput
                          label="Change Date Placed"
                          description="Select the date order was placed"
                          value={date}
                          onChange={setDate}
                          placeholder="Input the date"
                          renderDay={dayPlacedRenderer}
                          style={{ minWidth: "10rem" }}
                          w="100%"
                        />
                        <DateInput
                          label="Change Arrival Date"
                          description="Select the date order was delivered"
                          value={date}
                          onChange={setDate}
                          placeholder="Inpute the date"
                          renderDay={dayPlacedRenderer}
                          style={{ minWidth: "10rem" }}
                          w="100%"
                        />
                      </Flex>
                      <Checkbox
                        label="I understand that I am MODIFYING this delivery"
                        checked={checkedModDelivery}
                        onChange={(event) =>
                          setCheckedModDelivery(event.currentTarget.checked)
                        }
                        color="black"
                        required
                      />
                      <Button color="black">Submit</Button>
                    </Stack>
                  </Modal.Body>
                </Modal.Content>
              </Modal.Root>
              <Button
                onClick={() => setOpenedMod(true)}
                fullWidth
                style={{
                  color: colorScheme !== "black" ? "white" : "black",
                  backgroundColor: colorScheme !== "black" ? "black" : "white",
                }}
              >
                Modify Delivery
              </Button>

              {/* 'delete delivery' modal */}
              <Modal
                opened={openedDel}
                onClose={() => setOpenedDel(false)}
                title="Authentication"
                centered
              >
                <Stack mb={15}>
                  <Flex direction="row" justify="flex-start" gap="1.5rem">
                    <NumberInput
                      label="Delivery ID"
                      description="Input the delivery ID"
                      placeholder="Type here..."
                      w="100%"
                      required
                      allowNegative={false}
                      value={delDeliveryID}
                      onChange={setDelDeliveryID}
                      min={1}
                    />
                  </Flex>
                  <Checkbox
                    label="I understand that I am DELETING this delivery"
                    checked={checkedModDelivery}
                    onChange={(event) =>
                      setCheckedModDelivery(event.currentTarget.checked)
                    }
                    color="black"
                    required
                  />
                  <Button color="black" onClick={handleNextClick_DelDelivery}>
                    Submit
                  </Button>
                </Stack>
              </Modal>
              <Button
                onClick={() => setOpenedDel(true)}
                fullWidth
                className="button"
                style={{
                  color: colorScheme !== "black" ? "white" : "black",
                  backgroundColor: colorScheme !== "black" ? "black" : "white",
                }}
              >
                Delete Delivery
              </Button>
            </Stack>
            <Container display="flex" w="100%">
              <InventoryTable colorScheme={colorScheme} />
            </Container>
          </Flex>
          <Flex justify="center" align="center" ml="10rem" mr="10rem" mt="2rem">
            <DeliveryTable colorScheme={colorScheme}></DeliveryTable>
          </Flex>
        </Container>
      </Box>
    </MantineProvider>
  );
};

export default App;
