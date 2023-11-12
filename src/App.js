import React from 'react';

import { ChakraProvider, Box, VStack, Grid, theme } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AnimeDetails from './components/AnimeDetails';
import Cart from './components/Cart';
import AnimeSearch from './components/AnimeSearch';

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh" p={3}>
            <VStack spacing={8}>
              <Routes>
                <Route exact path="/cart" element={<Cart />} />
                <Route exact path="/" element={<AnimeSearch />} />
                <Route path="/anime/:animeId" element={<AnimeDetails />} />
              </Routes>
            </VStack>
          </Grid>
        </Box>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
