import React, { useEffect, useState } from "react";
import "./Covid.css";

const Covid = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  let [stats, setStats] = useState({});
  const getCovidData = async () => {
    try {
      const res = await fetch("https://data.covid19india.org/data.json");
      // https://data.covid19india.org/ Get Latest API 
      const actualData = await res.json();
      actualData.statewise[0].state = "All States";
      setData(actualData.statewise);
      setStats(actualData.statewise[0]);
      setLoading(true);
    } catch (err) {
      console.log("Error Occured");
    }
  };

  let changeData = (e) => {
    let updateData = data.find((x) => x.state == e.target.value);
    setStats(updateData);
  };

  useEffect(() => {
    getCovidData();
  }, []); // empty square brackets tells us that the data will be load in the firt time attempt only.

  return (
    <>
    <div className="container">
      <h1 className="col-12 d-flex justify-content-center">COVID-19 LIVE  TRACKER</h1>

      <div className="row mt-5">
        <div className="col-sm-4">
          {/* all states */}
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">State wise</h5>
              {loading ? (
                <select
                  onChange={(e) => {
                    changeData(e);
                  }}
                >
                  {data.map((data) => (
                    <option key={data.state.toString()}>{data.state}</option>
                  ))}
                </select>
              ) : (
                "No Data Found"
              )}
            </div>
          </div>
        </div>

        <div className="col-sm-4 ">
          <div className="card ">
            <div className="card-body">
              <h5 className="card-title d-flex justify-content-center">Total Recovered</h5>
              {/* <p className="card-text"></p> */}
              <a href="#" className="btn btn-primary d-flex justify-content-center">
                {stats.recovered}
              </a>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title d-flex justify-content-center">Total Confirmed</h5>
              {/* <p className="card-text">With supporting text below as a natural lead-in to additional content.</p> */}
              <a href="#" className="btn btn-primary d-flex justify-content-center">
                {stats.confirmed}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3">
      <div className="row">
        <div className="col-sm-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title d-flex justify-content-center">Total Deaths</h5>
              {/* <p className="card-text"></p> */}
              <a href="#" className="btn btn-primary d-flex justify-content-center">
                {stats.deaths}
              </a>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title d-flex justify-content-center">Total Active</h5>
              {/* <p className="card-text">With supporting text below as a natural lead-in to additional content.</p> */}
              <a href="#" className="btn btn-primary d-flex justify-content-center">
                {stats.active}
              </a>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title d-flex justify-content-center">Last Update</h5>
              {/* <p className="card-text">With supporting text below as a natural lead-in to additional content.</p> */}
              {loading ? (
                <a href="#" className="btn btn-primary d-flex justify-content-center">
                  {stats.lastupdatedtime.split(" ")[0]}
                </a>
              ) : (
                "No Data"
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
    </>
  );
};

export default Covid;
