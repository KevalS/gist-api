import axios from "axios";
import React, { useEffect, useState } from "react";
import api from "../api";
import GistsForm from "./GistsForm";
import "./Gist.css";
import GistCard from "./GistCard";

const Gists = () => {
  const [data, setData] = useState("");

  console.log(data);
  return (
    <>
      <GistsForm setData={setData} />
      <div className="card-wrapper">
        {data && data.status === 200 && data.data.length > 0
          ? data.data.map((item, index) => {
              return (
                <div className="card-container" key={index}>
                  <GistCard item={item} />
                </div>
              );
            })
          : data &&
            data.status === 200 &&
            data.data.length === 0 && <h1>Username does not exist!!</h1>}
      </div>
    </>
  );
};

export default Gists;
