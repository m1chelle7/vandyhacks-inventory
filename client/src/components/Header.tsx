import React, { useState } from 'react';

import { Text, createTheme, MantineProvider, Container, Burger, Group, Title, Stack, Button, Card, Flex, Table, TableData, Modal} from "@mantine/core";
import '@mantine/core/styles.css';
import { IconSquarePlus, IconSquareX } from '@tabler/icons-react';

const Header: React.FC = () => {
  return (
    <header>
    <Container size="md" fluid className="header" >
    <Title order={1} style={{ textAlign: 'center'}}>
        Inventory Tracker
    </Title>
    
    </Container>
    </header>
    
  );
}

export default Header;
