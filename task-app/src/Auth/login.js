
import * as React from "react";
import { Field, Form, FormSpy } from "react-final-form";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "../components/Typography";
import AppFooter from "../view/AppFooter";
import AppAppBar from "../view/AppAppBar";
import AppForm from "../view/AppForm";
import { email, required } from "../form/validation";
import RFTextField from "../form/RFTextField";
import FormButton from "../form/FormButton";
import FormFeedback from "../form/FormFeedback.js";
import withRoot from "../module/withRoot";
import { useDispatch } from "react-redux";
import { signin } from "../service/actions/authActions";
import { useNavigate } from "react-router";
import MuiLink from '@mui/material/Link'; 
import { Link as RouterLink } from 'react-router-dom'; 

function SignIn() {
  const [sent, setSent] = React.useState(false);

  const validate = (values) => {
    const errors = required(["email", "password"], values);

    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }

    return errors;
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (values) => {
    // setSent(true);
    
    dispatch(signin(values)).then(() => {
      const storedToken = localStorage.getItem("accessToken");
      if (storedToken) {
        navigate("/home");
      }
    });
  };

  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign In
          </Typography>
          <Typography variant="body2" align="center">
            {"Not a member yet? "}
            <MuiLink
              to="/Signup"
              align="center"
              underline="always"
              component={RouterLink}

            >
              Sign Up here
            </MuiLink>
          </Typography>
        </React.Fragment>
        <Form
          onSubmit={handleSubmit}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit: handleSubmit2, submitting }) => (
            <Box
              component="form"
              onSubmit={handleSubmit2}
              noValidate
              sx={{ mt: 6 }}
            >
              <Field
                autoComplete="email"
                autoFocus
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
                size="large"
              />
              <Field
                fullWidth
                size="large"
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="current-password"
                label="Password"
                type="password"
                margin="normal"
              />
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback error sx={{ mt: 2 }}>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              <FormButton
                sx={{ mt: 3, mb: 2 }}
                disabled={submitting || sent}
                size="large"
                color="secondary"
                fullWidth
              >
                {submitting || sent ? "In progress…" : "Sign In"}
              </FormButton>
            </Box>
          )}
        </Form>
        <Typography align="center">
          {/* <MuiLink underline="always" href="/premium-themes/onepirate/forgot-password/"> */}
          Forgot password?
          {/* </MuiLink> */}
        </Typography>
      </AppForm>
    </React.Fragment>
  );
}

export default withRoot(SignIn);
