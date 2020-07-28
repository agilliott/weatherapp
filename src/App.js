import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  Link,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import Form from './components/Form';
import Weather from './components/Weather';

const useStyles = makeStyles({
  root: {
    height: '100vh',
  },
  attribution: {
    color: 'white',
  },
  paper: {
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
});

function App() {
  const classes = useStyles();
  const [weather, setWeather] = useState();
  const [image, setImage] = useState();
  const location = weather?.data.name || weather?.country || 'weather';
  const searchTerm =
    weather && location
      ? weather?.description + ' ' + location
      : 'northern lights';

  async function fetchImage() {
    const url = `https://api.unsplash.com/photos/random/?query=${searchTerm}&orientation=landscape&client_id=${process.env.REACT_APP_IMAGE_API_KEY}`;
    fetch(url, { method: 'get' })
      .then((res) => res.json())
      .then((data) => {
        setImage(data);
      })
      .catch((error) => {
        console.log('Error:', error);
        setImage({
          error: 'No image found',
        });
      });
  }

  useEffect(() => {
    if (weather?.description) fetchImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weather?.description]);

  useEffect(() => {
    fetchImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchData(e) {
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    e.preventDefault();
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather({
          data: data,
          city: data.city,
          country: data.sys.country,
          description: data.weather[0].description,
          temperature: data.main,
        });
      })
      .catch((error) => {
        console.error('Weather API Error - ', error);
        setWeather({
          data: '',
          city: '',
          country: '',
          description: '',
          temperature: '',
          error:
            'The city or country was not recognised, please try something else',
        });
      });
  }

  document.documentElement.style.backgroundImage = `url(${image?.urls?.regular})`;

  return (
    <Container>
      <Grid
        container
        justify="center"
        alignItems="center"
        alignContent="center"
        spacing={5}
        className={classes.root}
      >
        <Grid item xs={12}>
          <Grid
            container
            justify="center"
            alignItems="center"
            alignContent="center"
            spacing={5}
          >
            <Grid item>
              <Paper elevation={3} classes={{ root: classes.paper }}>
                <Box p={3} textAlign="center">
                  <Typography
                    gutterBottom
                    align="center"
                    variant="h3"
                    component="h1"
                    color="primary"
                  >
                    weathr.
                  </Typography>

                  <Form getWeather={fetchData} />
                  {weather && (
                    <Weather
                      city={weather.data.name}
                      country={weather.country}
                      description={weather.description}
                      temperature={weather.temperature}
                      error={weather.error}
                    />
                  )}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        {image?.user && (
          <Grid item>
            <Typography variant="caption" className={classes.attribution}>
              Photo by{' '}
              <Link color="inherit" href={image?.user?.links.html}>
                {image?.user?.name}
              </Link>{' '}
              on
              <Link color="inherit" href="https://unsplash.com/">
                {' '}
                unsplash
              </Link>
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default App;
