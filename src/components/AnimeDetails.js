import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { Box, Image, Text, Heading } from '@chakra-ui/react';

export default function AnimeDetails() {
  const [anime, setAnime] = useState(null);
  const { animeId } = useParams();

  useEffect(() => {
    const fetchAnime = async () => {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime/${animeId}/full`
      );

      const data = await response.json();
      console.log('data?.images', data?.data?.images.jpg);
      setAnime(data.data);
    };

    fetchAnime();
  }, [animeId]);

  if (!anime) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      maxW="800px"
      mx="auto"
      p="4"
      alignItems="center"
      justifyContent="center"
      display="flex"
      flexDir="column"
    >
      <Heading as="h1" size="xl" mb="4">
        {anime.title}
      </Heading>
      <Image
        alignSelf="center"
        src={anime.images.jpg.image_url}
        alt={anime.title}
        mb="4"
      />
      <Text fontSize="xl" fontWeight="bold" mb="2">
        Synopsis:
      </Text>
      <Text mb="4">{anime.synopsis}</Text>
      <Text fontSize="xl" fontWeight="bold" mb="2">
        Episodes:
      </Text>
      <Text mb="4">{anime.episodes}</Text>
      <Text fontSize="xl" fontWeight="bold" mb="2">
        Score:
      </Text>
      <Text mb="4">{anime.score}</Text>
    </Box>
  );
}
