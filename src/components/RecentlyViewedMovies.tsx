import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';

import { recents } from './data';
import { IconButton, Rating } from '@mui/material';
import { useState } from 'react';
import React from 'react';

export default function RecentlyViewedMovies() {

  var favorites = recents.map(movie => movie.UserFavourite);
  var ratings = recents.map(movie => movie.UserRating);

  const [userFavourite, setUserFavourite] = useState<boolean[]>(favorites);
  const [userRating, setUserRating] = useState<number[]>(ratings);

  React.useEffect(() => {
  }, [userFavourite, userRating]);

  const updateUserRating = (newRating: number, index: number) => {
    ratings[index] = newRating;
    setUserRating(ratings);

    console.log(userRating);

    if (recents != null) {
      recents[index].UserRating = newRating;
    }
  };

  const toggleFavourite = (index: number) => {
    favorites[index] = !favorites[index];
    setUserFavourite(favorites);

    console.log(userFavourite);

    if (recents != null) {
      recents[index].UserFavourite = !recents[index].UserFavourite;
    }
  };

  return (
    <Box
      id="recently-viewed"
      sx={{
        pt: { xs: 2, sm: 4 },
        pb: { xs: 4, sm: 6 },
        color: 'white',
        bgcolor: 'hsl(220, 30%, 2%)',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h4">
            Recently searched
          </Typography>
        </Box>
        <Grid container spacing={2.5}>
          {recents.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
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
                  <Typography fontWeight="medium" gutterBottom>
                    {item.Title}
                  </Typography>

                  <img src={(item.Poster)} alt={item.Title} style={{ borderRadius: '10px', flexGrow: 1 }} />

                  <div style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-between', flexDirection: 'row', gap: '20px', paddingTop: '25px' }}>
                    <div>
                      <Rating
                        name="text-feedback"
                        size='large'
                        value={userRating[index]}
                        onChange={(_, f) => updateUserRating(f?.valueOf() ?? 0, index)}
                        emptyIcon={<StarIcon style={{ opacity: 1, color: 'grey', fontSize: 'inherit' }} />}
                      />
                    </div>
                    <div>
                      <IconButton aria-label="delete" size='small' onClick={() => toggleFavourite(index)}>
                        {userFavourite[index] ? (
                          <FavoriteIcon style={{ color: '#ff3d47' }} />
                        ) : (
                          <FavoriteBorderIcon style={{ color: 'white' }} />
                        )}
                      </IconButton>
                    </div>

                  </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
