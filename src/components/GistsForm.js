import React from "react";
import { FastField, useFormik } from "formik";
import * as Yup from "yup";
import "./Gist.css";
import api from "../api";

const GistsForm = (props) => {
  const { setData } = props;
  const handleSubmit = async (state) => {
    let response = await api.get("/users/" + state.username + "/gists");
    response = await response;
    setData(response);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please enter username"),
    }),
    onSubmit: handleSubmit,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-container">
        <input
          type="text"
          name="username"
          value={formik.values.username}
          placeholder="Enter Username"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          className="form-control"
        />
        <input className="btn" type="submit" value="Submit" />
      </div>
      {formik.touched.username && formik.errors.username && (
        <p className="error"> Username cannot be empty</p>
      )}
    </form>
  );
};

export default GistsForm;
