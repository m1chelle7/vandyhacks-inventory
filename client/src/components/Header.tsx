import React, { useState } from 'react';

import { Text, createTheme, MantineProvider, Container, Burger, Group, Title, Stack, Button, Card, Flex, Table, TableData, Modal} from "@mantine/core";
import '@mantine/core/styles.css';
import { IconSquarePlus, IconSquareX } from '@tabler/icons-react';

const Header: React.FC = () => {
  return (
    <header>
    <Container size="md" fluid className="header">
      <Group gap={10}>
        <Button h={50} style={{ backgroundColor: 'black', justifyContent: 'center', alignItems: 'center'}} >
          <Title order={1} c="white">
              VandyHacks
          </Title>
        </Button>
        <Title order={1} >
            Inventory Tracker
        </Title>
      </Group>
    </Container>
    </header>
    
  );
}

export default Header;
