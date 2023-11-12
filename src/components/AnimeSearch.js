import { useState } from 'react';

import {
  Box,
  List,
  ListItem,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Button,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function AnimeSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = async event => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    if (searchTerm.length > 2) {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime?q=${searchTerm}`
      );
      const data = await response.json();
      setSearchResults(data.data);
    } else {
      setSearchResults([]);
    }
  };

  const handleAnimeClick = anime => {
    navigate(`/anime/${anime.mal_id}`);
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <Flex
      w="100%"
      h="100%"
      justify="center"
      align="center"
      flexDirection="column"
    >
      <Box>
        <Button onClick={handleCartClick}>Go to Cart</Button>
        <FormControl mt="50px">
          <FormLabel htmlFor="search-input">Search Anime</FormLabel>
          <Input
            type="text"
            id="search-input"
            placeholder="Enter anime name"
            value={searchTerm}
            onChange={handleInputChange}
          />
        </FormControl>
      </Box>
      {searchResults?.length > 0 && (
        <>
          <Text fontWeight="bold" p="2">
            Results:
          </Text>
          <List>
            {searchResults.map(anime => (
              <ListItem
                w="100%"
                cursor="pointer"
                key={anime.mal_id}
                onClick={() => handleAnimeClick(anime)}
                _hover={{ bg: 'gray.500' }}
              >
                {anime.title}
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Flex>
  );
}
