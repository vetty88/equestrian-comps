
import API from "../../utils/API.js";
import React, { useEffect, useState } from "react";
import CompetitionsFeed from "./CompetitionsFeed";
import Spinner from "../common/Spinner";
import PropTypes from "prop-types";

function  UserCompetitionDetail (props) { 


  const [competitions, setCompetitions, loading] = useState([]);

  // Load all competitions and store them with setCompetitions
  useEffect(() => {
    loadCompetitions()
  }, []);

  // Loads all competitions and sets them to competitions
  function loadCompetitions() {
    API.getCompetitions()
      .then(res => 
        setCompetitions(res.data)
      )
      .catch(err => console.log(err));
  };



    let competitionsContent;

    if (loading) {
      competitionsContent = <Spinner />;
    } else {
      if (!(competitions && competitions.length > 0)) {
        return (
      <div className="marginContainer">
          <div className="container">
            <div className="row">
              <div className="col-md-12">User has no competition</div>
            </div>
          </div>
        </div>
      );
    }
      competitionsContent = <CompetitionsFeed competitions={competitions} />;
    }
    return (
      <div className="marginContainer">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{competitionsContent}</div>
          </div>
        </div>
      </div>
    );
  }

export default UserCompetitionDetail;

UserCompetitionDetail.propTypes = {
  getUserCompetitions: PropTypes.func.isRequired,
  competition: PropTypes.object.isRequired
};
