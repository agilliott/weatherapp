import React, { createRef } from 'react';
import { TextField, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    '& > *': {
      marginBottom: theme.spacing(2),
    },
  },
}));

const Form = ({ getWeather }) => {
  const formRef = createRef();
  const classes = useStyles();
  const handleSubmit = (e) => {
    getWeather(e);
    e.preventDefault();
    e.target.reset();
  };
  return (
    <form ref={formRef} className={classes.form} onSubmit={handleSubmit}>
      <TextField
        placeholder="city"
        label="city"
        id="city"
        required
        fullWidth
        variant="outlined"
      />
      <TextField
        placeholder="country"
        label="country"
        id="country"
        required
        fullWidth
        variant="outlined"
      />
      <Grid container justify="space-between">
        <Grid item>
          <Button variant="text" color="secondary" type="reset">
            Reset
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="primary" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;
