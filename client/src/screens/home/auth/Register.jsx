import React, { useEffect, useState } from "react";
import Nav from "./../../../components/home/Nav";
import Header from "./../../../components/home/Header";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useUserRegisterMutation } from "../../../store/services/authService";
import { useForm } from "../../../hooks/Form";
import { setUserToken } from "./../../../store/reducers/authReducer";
import { setSuccess } from "./../../../store/reducers/globalReducer";
import { useDispatch } from "react-redux";

const Register = () => {
  const [errors, setErrors] = useState([]);

  const { state, handleRegOnChange } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const [registerUser, response] = useUserRegisterMutation();

  console.log(response);

  const handleRegOnSubmit = (e) => {
    e.preventDefault();
    registerUser(state);
  };

  useEffect(() => {
    if (response.isError) {
      setErrors(response?.error?.data?.errors);
    }
  }, [response?.error?.data, response.isError]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (response.isSuccess) {
      localStorage.setItem("user-token", response?.data?.token);
      dispatch(setUserToken(response?.data?.token));
      dispatch(setSuccess(response?.data?.msg));
      navigate("/user");
    }
  }, [response.isSuccess]);

  const showErrors = (name) => {
    const exist = errors.find((err) => err.param === name);

    if (exist) {
      return exist.msg;
    } else {
      return false;
    }
  };

  return (
    <>
      <Nav />
      <div className="mt-[70px] pb-[80px]">
        <Header>Register</Header>

        <div className="flex flex-wrap justify-center ">
          <motion.div
            initial={{ opacity: 0, x: "-100vw" }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 p-6"
          >
            <form
              onSubmit={handleRegOnSubmit}
              className="bg-white rounded-lg -mt-20 border border-gray-200 p-10 shadow-md"
            >
              {/* <h1 className="heading mb-5">Register</h1> */}
              <div className="mb-4">
                <label htmlFor="name" className="form-label-two">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name..."
                  className={`form-input ${
                    showErrors(errors, "name")
                      ? "border-rose-600 bg-rose-50"
                      : "border-gray-300 bg-white"
                  }`}
                  value={state.name}
                  onChange={handleRegOnChange}
                />

                {showErrors("name") && (
                  <span className="error">{showErrors("name")}</span>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="form-label-two">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="email..."
                  className="form-input"
                  value={state.email}
                  onChange={handleRegOnChange}
                />
                {showErrors("email") && (
                  <span className="error">{showErrors("email")}</span>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="form-label-two">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password..."
                  className="form-input"
                  value={state.password}
                  onChange={handleRegOnChange}
                />
                {showErrors("password") && (
                  <span className="error">{showErrors("password")}</span>
                )}
              </div>

              <div className="mb-4">
                <input
                  type="submit"
                  value="Sign Up"
                  className="btn btn-submit text-white w-full "
                />
              </div>

              <div>
                <p>
                  Already have any account?
                  <span className="capitalize font-medium text-base text-black">
                    <Link to="/login">Login</Link>
                  </span>
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Register;
