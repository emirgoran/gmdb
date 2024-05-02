import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Button, IconButton, Rating, TextField } from '@mui/material';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';

import { useState } from 'react';

export default function MovieDetails() {

  interface MovieData {
    ID: string;
    Title: string;
    Actors: string;
    ReleaseYear: string;
    Director: string;
    Genre: string;
    Rated: string;
    Runtime: string;
    Plot: string;
    Poster: string;
    UserRating: number;
    UserFavourite: boolean;
    ValidMovie?: boolean;
  }

  const [searchQuery, setSearchQuery] = useState('');
  const [movieData, setMovieData] = useState<MovieData>();
  const [loading, setLoading] = useState(false);
  const [userFavourite, setUserFavourite] = useState(false);
  const [userRating, setUserRating] = useState(0);

  React.useEffect(() => {
    console.log(movieData);
  }, [movieData]);

  // Function to call the API
  const callApi = async (searchQuery: string) => {
    try {
      const response = await fetch(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_IMDB_API_KEY}&t=${searchQuery}`);
      const data = await response.json() as MovieData;

      if (data.Title == undefined) {
        data.ValidMovie = false;
        return data;
      }

      data.UserFavourite = false;
      data.UserRating = 0;
      data.ValidMovie = true;

      return data;
    } catch (error) {
      console.error('Failed to fetch data:', error);
      return null;
    }
  };

  const updateUserRating = (newRating: number) => {
    setUserRating(newRating);

    if (movieData != null) {
      movieData.UserRating = newRating;
    }
  };

  const toggleFavourite = () => {
    setUserFavourite(!userFavourite);

    if (movieData != null) {
      movieData.UserFavourite = userFavourite;
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      // Do nothing if search query is empty
      return;
    }

    setLoading(true);

    try {
      const data = await callApi(searchQuery);
      console.log(data);
      setMovieData(data as MovieData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      id="movie-details"
      sx={{
        pt: { xs: 2, sm: 4 },
        pb: { xs: 4, sm: 6 },
        color: 'white',
      }}
    >

      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pb: { xs: 3, sm: 6 },
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
          useFlexGap
          sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
        >
          <TextField
            style={{ width: '100%' }}
            hiddenLabel
            fullWidth
            size="small"
            variant="outlined"
            aria-label="Enter movie name"
            placeholder="Movie name"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </Stack>
      </Container>

      {movieData?.ValidMovie && (
        <Container
          sx={{
            position: 'relative',
            flexDirection: 'column',
            alignItems: 'center',
            gap: { xs: 3, sm: 6 }
          }}
        >
          <Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Stack
                direction="column"
                color="inherit"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  p: 3,
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'hsla(220, 25%, 25%, .3)',
                  background: 'transparent',
                  backgroundColor: 'grey.900',
                  boxShadow: 'none',
                }}
              >
                <Stack
                  direction={{ xs: 'row', sm: 'row' }}
                  spacing={3}
                  useFlexGap
                  sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
                >
                  <div style={{ boxShadow: '0 0 150px 100px rgba(74, 144, 226, 0.2)', borderRadius: '10px'}}>
                    <img src={(movieData.Poster)} alt={movieData.Title} style={{ borderRadius: '10px' }} />
                  </div>

                  <div style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-between', flexDirection: 'column', width: '100%' }}>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Typography fontWeight="bold" fontSize={32} gutterBottom>
                          {movieData.Title}
                        </Typography>

                        <div style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-between', flexDirection: 'row', gap: '20px'}}>
                          <div>
                            <Rating
                              name="text-feedback"
                              size='large'
                              value={userRating}
                              onChange={(_, f) => updateUserRating(f?.valueOf() ?? 0)}
                              emptyIcon={<StarIcon style={{ opacity: 1, color: 'grey', fontSize: 'inherit' }} />}
                            />
                          </div>
                          <div>
                            <IconButton aria-label="delete" size='small' onClick={toggleFavourite}>
                              {userFavourite ? (
                                <FavoriteIcon style={{ color: '#ff3d47' }} />
                              ) : (
                                <FavoriteBorderIcon style={{ color: 'white' }} />
                              )}
                            </IconButton>
                          </div>

                        </div>
                      </div>

                      <Typography fontWeight="medium" gutterBottom>
                        {movieData.Plot}
                      </Typography>
                    </div>

                    <div>
                      <Typography fontWeight="medium" gutterBottom>
                        {movieData.ReleaseYear + ' | ' + movieData.Rated + ' | ' + movieData.Runtime + ' | ' + movieData.Genre}
                      </Typography>

                      <Typography fontWeight="medium" gutterBottom>
                        Starring: {movieData.Actors}
                      </Typography>
                    </div>
                  </div>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      )}
    </Box>
  );
}
