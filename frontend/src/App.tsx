import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Tab,
  Tabs,
  Box,
  ThemeProvider,
  createTheme,
  CssBaseline
} from '@mui/material';
import Map from './components/Map.tsx';
import AddCollectionPoint from './components/AddCollectionPoint.tsx';
import Guide from './components/Guide.tsx';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2e7d32',
    },
    secondary: {
      main: '#f57c00',
    },
  },
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function App() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              CycleTech
            </Typography>
          </Toolbar>
        </AppBar>

        <Container>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 2 }}>
            <Tabs value={value} onChange={handleChange} centered>
              <Tab label="Mapa" />
              <Tab label="Adicionar Ponto" />
              <Tab label="Guia Informativo" />
            </Tabs>
          </Box>

          <TabPanel value={value} index={0}>
            <Map />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <AddCollectionPoint />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Guide />
          </TabPanel>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App; 