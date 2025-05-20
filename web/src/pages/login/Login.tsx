// Imports
import "./Login.css";
import buildNum from "../../static/BuildNumber";
import { Alert, Button, } from 'react-bootstrap';
import useLoginForm, { UseLoginFormHook } from "../../hooks/login/UseLoginForm";
import { Spinner } from "react-bootstrap";

/**
 * React function to render the login page
 */
const Login: React.FC = () => {
  // Hooks
  const loginForm: UseLoginFormHook = useLoginForm();

  // JSX
  return (
    <>
      {
        //* Login Form
      }
      <div className="login-card-container">

      
      <div className="login-card">
        {
          //* Logo
        }
        <div className="left-div">
          <img 
            src={'/login-image.jpg'}
            className='logo'
          />
        </div>
        {
          //* Form
        }
        <div className="right-div">
          <div>
            <h4 style={{
              margin: "0px", fontWeight: 600
            }}>
              Login to HCAMS
            </h4>
          </div>
          <div>
            {
              //* Email Input
            }
            <div className="mt-3">
              <label className="form-label">
                Email Address
              </label>
              <div className="input-group">
                <span
                  className="input-group-text"
                  id="basic-addon3"
                >
                  @
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="email-login-input"
                  aria-describedby="email-login-input-entry"
                  placeholder="Enter your email"
                  value={loginForm.email}
                  onChange={loginForm.onEmailChange}
                  required
                  autoFocus
                />
              </div>
            </div>
            {
              //* Empty email alert
            }
            {(loginForm.submitted && !loginForm.email) && (
              <Alert
                variant="warning"
                className="w-100"
              >
                Email address cannot be blank.
              </Alert>
            )}
            {
              //* Password Input
            }
            <div className="mb-3">
              <label className="form-label">
                Password
              </label>
              <div className="input-group">
                <span
                  className="input-group-text"
                  id="basic-addon3"
                >
                  $
                </span>
                <input
                  type="password"
                  className="form-control"
                  id="email-login-input"
                  aria-describedby="password-login-input-entry"
                  placeholder="Enter your password"
                  value={loginForm.password}
                  onChange={loginForm.onPasswordChange}
                  required
                />
              </div>
            </div>
            {
              //* Empty password alert
            }
            {(loginForm.submitted && !loginForm.password) && (
              <Alert
                variant="warning"
                className="w-100"
              >
                Password cannot be blank.
              </Alert>
            )}
            {
              //* Login Error Alert
            }
            {loginForm.message && (
              <Alert
                variant="success"
                className="w-100"
              >
                {loginForm.message}
              </Alert>
            )}
            {loginForm.error && (
              <Alert
                variant="danger"
                className="w-100"
              >
                {loginForm.error}
              </Alert>
            )}
          </div>
          {
            //* Login Button
          }
          <div className="mt-3">
            <Button
              variant="success"
              className="w-100"
              id="login-button"
              type="submit"
              onClick={loginForm.onSubmit}
              disabled={
                loginForm.loading ||
                !loginForm.email ||
                !loginForm.password
              }
            >
              {loginForm.loading && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
              <span> Login</span>
            </Button>
          </div>
        </div>
        </div>
      </div>
      {
        //* Build Number
      }
      <div className='build-number'>
        Health Clinic Management System - Build {buildNum}
      </div>
    </>
  );
};

export default Login;