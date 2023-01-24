import { ChangeEvent, FormEventHandler, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import User from '../types/user.type';
import { register } from '../services/auth.service';
import './Register.css'

interface RegisterProps {
  signUpCallback: Function
}

const Register = () => {
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const initialValues: User = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: ''
  }

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .test(
        "len",
        "The firstname must not be blank.",
        (val: any) =>
          val &&
          val.toString().length >= 0
      )
      .required("This field is required!"),
    lastName: Yup.string()
      .test(
        "len",
        "The lastname must not be blank.",
        (val: any) =>
          val &&
          val.toString().length >= 0
      )
      .required("This field is required!"),
    username: Yup.string()
      .test(
        "len",
        "The username must be between 3 and 20 characters.",
        (val: any) =>
          val &&
          val.toString().length >= 3 &&
          val.toString().length <= 20
      )
      .required("This field is required!"),
    email: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required!"),
    password: Yup.string()
        .test(
          "len",
          "The password must be between 6 and 40 characters.",
          (val: any) =>
            val &&
            val.toString().length >= 6 &&
            val.toString().length <= 40
        )
        .required("This field is required!")
  });

  const handleRegister = (formValue: User) => {
    const { firstName, lastName, username, email, password } = formValue;

    register(firstName, lastName, username, email, password)
      .then((response: any) => {
        setMessage(response.data.message)
        setSuccessful(true)
      })
      .catch((err: any) => {
        const resMessage =
          (err.response &&
            err.response.data &&
            err.response.data.message) ||
          err.message ||
          err.toString();

          setMessage(resMessage);
          setSuccessful(false)
      });
  }

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          <Form>
            {!successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username"> Username </label>
                  <Field name="username" type="text" className="form-control" />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email"> Email </label>
                  <Field name="email" type="email" className="form-control" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password"> Password </label>
                  <Field
                    name="password"
                    type="password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                </div>
              </div>
            )}

            {message && (
              <div className="form-group">
                <div
                  className={
                    successful ? "alert alert-success" : "alert alert-danger"
                  }
                  role="alert"
                >
                  {message}
                </div>
              </div>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Register;