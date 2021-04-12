import React, { useEffect, useState } from "react";
import api from "../api";
import { isEmpty, sortBy, map } from "lodash"

const GistCard = (props) => {
  const { item } = props;
  const [forks, getForks] = useState()

  useEffect(async () => {
    if (!isEmpty(item)) {
      let response = await api.get("/gists/" + item.id + "/forks");
        response = await response;
        let filteredData = []
        if(response.data.length > 3) {
          const sortedData = await sortBy(response.data, ["owner", "updated_at"]).reverse()
          const latestForks = sortedData.slice(0,3)
  
          filteredData = await latestForks;
        } else {
          filteredData = await response.data;
        }
        getForks(filteredData)
    }
  }, [props])
  const filesBadges = (files) => {
    if (files) {
      const file = files[Object.keys(files)];
      if(file !== undefined ) {
        const filename = file.filename;
        const lastIndex = filename.lastIndexOf(".");
        const extension = filename.substr(lastIndex + 1);
        return (
          <a href={file.raw_url} target="_blank">
            <span
              style={{
                width: "auto",
                height: "auto",
                backgroundColor: "black",
                color: "white",
                border: "1px solid white",
                borderRadius: "50%",
                padding: "3px",
              }}
            >
              {extension}
            </span>{" "}
            {filename}
          </a>
        );
      }
    }
  };

  return (
    <div className="card">
      {item.owner && (
        <>
        <a href={item.forks_url} target="_blank">
          <img src={item.owner.avatar_url} alt="owner" className="img" />
        </a>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "10px",
            }}
          >
            <p className="owner">
              <span className="head">Owner: </span>
              <span>{item.owner.login}</span>
            </p>
            <a href={item.html_url} target="_blank">
              Gist URL
            </a>
          </div>
          <p style={{ textAlign: "center", marginTop: "5px" }}>
            {item.files && filesBadges(item.files)}
          </p>
          {forks && forks.length !== 0 ? (map(forks, (item, index)=>(
            <div className="forks-data">
               <a href={item.html_url} target="_blank">
                 <img src={item.owner.avatar_url} style={{width: "50px", height:"50px"}}/>
               </a>
               <span>{item.owner.login}</span>
             </div>
          ))) : null}
        </>
      )}
    </div>
  );
};

export default GistCard;
