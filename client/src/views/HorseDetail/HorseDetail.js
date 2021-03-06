import { faBaby } from '@fortawesome/free-solid-svg-icons'
import { faHorse } from '@fortawesome/free-solid-svg-icons'
import { faHorseHead } from '@fortawesome/free-solid-svg-icons'
import { faPalette } from '@fortawesome/free-solid-svg-icons'
import { faRuler } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { makeStyles } from "@material-ui/core/styles";
import API from "../../utils/API";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import React, { useEffect, useState } from "react";
import styles from "../../assets/jss/material-dashboard-react/views/rtlStyle.js";
const useStyles = makeStyles(styles);

function HorseDetail(props) {
  const classes = useStyles();

  const [horses, setHorses] = useState([]);
  
  // Load all horses and store them with setHorses
  useEffect(() => {
    loadHorses()
  }, []);

  // Loads all horses and sets them to horses
  function loadHorses() {
    API.getHorses()
      .then(res => 
        setHorses(res.data)
      )
      .catch(err => console.log(err));
  };

  return (
  <div>
    {horses.length ? (
      <GridContainer>
        {horses.map(horse => (
          <GridItem xs={12} sm={6} md={3} key={horse.id}>
           <Card >
            <CardHeader color="warning">
              <FontAwesomeIcon color="warning" icon={faHorse} /> 
              <p className={classes.cardCategory}>Horse</p>
              <h3 className={classes.cardTitle}>{horse.uniqueName}</h3>
            </CardHeader>            
              <h4> <FontAwesomeIcon icon={faBaby} /> {horse.birthYear}</h4>
              <h4> <FontAwesomeIcon icon={faRuler} /> {horse.height}</h4>
              <h4> <FontAwesomeIcon icon={faHorseHead} /> {horse.breed}</h4>
              <h4> <FontAwesomeIcon icon={faPalette} /> {horse.colour}</h4>
              <h4> <FontAwesomeIcon icon={faPalette} /> {horse.author}</h4>
              {/* <h4> <FontAwesomeIcon icon={faPalette} /> {horse.testing}</h4> */}
           </Card>
          </GridItem>
     ))}
        </GridContainer>
           ) : (
        <h3>No Results to Display</h3>
        )}

  </div>
  );
}

export default HorseDetail;