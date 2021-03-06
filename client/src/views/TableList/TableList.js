import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Col } from "../../components/Grid/index";
import { Link } from "react-router-dom";
import { List, ListItem } from "../../components/List/List";
import { makeStyles } from "@material-ui/core/styles";
import API from "../../utils/API";
import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import CardHeader from "../../components/Card/CardHeader.js";
import DeleteBtn from "../../components/Buttons/DeleteBtn.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import React, { useState, useEffect } from "react";
import Table from "../../components/Table/Table.js";


export default function TableList() {
  // Setting our component's initial state
  const [competitions, setCompetitions] = useState([])
  
  const styles = {
    cardCategoryWhite: {
      "&,& a,& a:hover,& a:focus": {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
      },
      "& a,& a:hover,& a:focus": {
        color: "#FFFFFF"
      }
    },
    cardTitleWhite: {
      color: "#FFFFFF",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none",
      "& small": {
        color: "#777",
        fontSize: "65%",
        fontWeight: "400",
        lineHeight: "1"
      }
    }
  };
  
  const useStyles = makeStyles(styles);
    const classes = useStyles();

  // Load all competitions and store them with setCompetitions
  useEffect(() => {
    loadCompetitions()
  }, [])

  // Loads all competitions and sets them to competitions
  function loadCompetitions() {
    API.getCompetitions()
      .then(res => 
        setCompetitions(res.data)
      )
      .catch(err => console.log(err));
  };

  // Deletes a competition from the database with a given id, then reloads competitions from the db
  function deleteCompetition(id) {
    API.deleteCompetition(id)
      .then(res => loadCompetitions())
      .catch(err => console.log(err));
  }

    return (
      <GridContainer>   
       

  <GridItem xs={12} sm={12} md={12}>
    <Card>
      <CardHeader color="primary">
      <h4 className={classes.cardTitleWhite}>Competitions On My List</h4>
      <p className={classes.cardCategoryWhite}>
      Competitions Table
      </p>
      </CardHeader>
      <CardBody>
        <Col size="md-6 sm-12">
        {competitions.length ? (
          <List>
          {competitions.map(competition => (
            <ListItem key={competition._id}>
              <Link to={"/admin/competitions/" + competition._id}>
              <strong> {competition.eventName} with {competition.horse} </strong>
              </Link>
            <DeleteBtn onClick={() => deleteCompetition(competition._id)} />
            </ListItem>
          ))}
          </List>
        ) : (
        <h3>No Results to Display</h3>
        )}
        </Col>
        

      </CardBody>
    </Card>
  </GridItem>



      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>
              Competitions Table (All)
            </h4>
            <p className={classes.cardCategoryWhite}>
              Competition Details
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={[]}
              tableData={[
               
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>

 
    </GridContainer>
  );
}
