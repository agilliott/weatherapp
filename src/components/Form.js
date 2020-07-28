import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

const useStyles = makeStyles((theme) => ({
  form: {
    minWidth: 200,
    maxWidth: 700,
    '& > *': {
      marginBottom: theme.spacing(2),
    },
  },
}));

const Form = ({ getWeather }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [countryValue, setCountryValue] = React.useState(null);
  const [cityValue, setCityValue] = React.useState(null);

  const myHeaders = {
    'X-Parse-Application-Id': process.env.REACT_APP_GEO_APP_ID,
    'X-Parse-REST-API-Key': process.env.REACT_APP_GEO_API_KEY,
  };

  async function fetchCountryData() {
    const url = `https://parseapi.back4app.com/classes/Continentscountriescities_Country?limit=300&order=name&keys=name`;
    fetch(url, { headers: myHeaders })
      .then((res) => res.json())
      .then((data) => {
        setCountries(data.results);
      })
      .catch((error) => {
        console.log('Error:', error);
        setCountries({
          error: 'No countries found',
        });
      });
  }
  async function fetchCityData() {
    let url = `https://parseapi.back4app.com/classes/Continentscountriescities_City?limit=400&order=name&keys=name`;
    if (countryValue?.objectId) {
      const where = encodeURIComponent(
        JSON.stringify({
          country: {
            __type: 'Pointer',
            className: 'Continentscountriescities_Country',
            objectId: countryValue.objectId,
          },
          population: {
            $gt: 150000,
          },
        })
      );
      url += `&where=${where}`;
    }

    fetch(url, { headers: myHeaders })
      .then((res) => res.json())
      .then((data) => {
        setCities(data.results);
      })
      .catch((error) => {
        console.log('Error:', error);
        setCities({
          error: 'No cities found',
        });
      });
  }

  useEffect(() => {
    fetchCountryData();
    fetchCityData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setCityValue(null);
    fetchCityData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryValue]);

  const handleSubmit = (e) => {
    getWeather(e);
    e.preventDefault();
    setCountryValue(null);
    setCityValue(null);
  };

  const isDisabled = countryValue === null;
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Autocomplete
        id="country"
        options={countries}
        value={countryValue}
        onChange={(event, newValue) => {
          setCountryValue(newValue);
        }}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField {...params} label="Country" variant="outlined" required />
        )}
        renderOption={(option, { inputValue }) => {
          const matches = match(option.name, inputValue);
          const parts = parse(option.name, matches);

          return (
            <div>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{
                    fontWeight: part.highlight ? 700 : 400,
                    color: part.highlight
                      ? theme.palette.primary.main
                      : theme.palette.text.primary.main,
                  }}
                >
                  {part.text}
                </span>
              ))}
            </div>
          );
        }}
      />
      <Autocomplete
        id="city"
        options={cities}
        disabled={isDisabled}
        value={cityValue}
        onChange={(event, newValue) => {
          setCityValue(newValue);
        }}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField {...params} label="City" variant="outlined" required />
        )}
        renderOption={(option, { inputValue }) => {
          const matches = match(option.name, inputValue);
          const parts = parse(option.name, matches);

          return (
            <div>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{
                    fontWeight: part.highlight ? 700 : 400,
                    color: part.highlight
                      ? theme.palette.primary.main
                      : theme.palette.text.primary.main,
                  }}
                >
                  {part.text}
                </span>
              ))}
            </div>
          );
        }}
      />
      <Grid container justify="flex-end">
        <Grid item>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;
