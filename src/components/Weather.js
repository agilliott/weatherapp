import React from 'react';
import { Box, Typography, Grid } from '@material-ui/core';
import { convertKelvinTemp, getTempColor } from '../helpers/utils';

const Weather = ({ city, country, error, temperature, description }) => {
  const temp = convertKelvinTemp('C', temperature.temp);
  const temp_feels = convertKelvinTemp('C', temperature.feels_like);
  const temp_max = convertKelvinTemp('C', temperature.temp_max);
  const temp_min = convertKelvinTemp('C', temperature.temp_min);
  return (
    <Box p={3} textAlign="center">
      {temperature && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography
              variant="h3"
              component="h2"
              style={{ color: getTempColor(temp) }}
            >
              {temp}°C
            </Typography>
            <Typography variant="overline" component="h4">
              {description}
            </Typography>
            {city && country && (
              <Typography variant="h4" component="h2">
                {city}, {country}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h5"
              component="h3"
              style={{ color: getTempColor(temp_feels) }}
            >
              {temp_feels}°C
            </Typography>
            <Typography variant="overline" component="h4">
              Feels Like
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h5"
              component="h3"
              style={{ color: getTempColor(temp_max) }}
            >
              {temp_max}°C
            </Typography>
            <Typography variant="overline" component="h4">
              Max temp
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h5"
              component="h3"
              style={{ color: getTempColor(temp_min) }}
            >
              {temp_min}°C
            </Typography>
            <Typography variant="overline" component="h4">
              Min temp
            </Typography>
          </Grid>
        </Grid>
      )}
      {error && <p>{error}</p>}
    </Box>
  );
};

export default Weather;
