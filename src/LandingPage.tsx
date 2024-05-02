import * as React from 'react';
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppAppBar from './components/AppAppBar';
import Header from './components/Header';
import RecentlyViewedMovies from './components/RecentlyViewedMovies';
import Footer from './components/Footer';
import MovieDetails from './components/MovieDetails';
import FavoriteMovies from './components/FavoriteMovies';

export default function LandingPage() {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Header />
      <Box sx={{ bgcolor: 'background.default' }}>
        <MovieDetails />
        <FavoriteMovies />
        <Divider sx={{
          pb: { xs: 4, sm: 6 },
        }} />
        <RecentlyViewedMovies />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
