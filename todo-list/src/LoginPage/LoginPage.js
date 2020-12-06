import React from "react";
import axios from "axios";
import GridContainer from "../components/GridContainer";
import GridItem from "../components/GridItem";
import { TextField } from "@material-ui/core";

const LoginPage = () => {


    return (
        <Box>
            <GridContainer>
                <GridItem>
                    <TextField title="ID" />
                </GridItem>
                <GridItem>
                    <TextField title="PW" />
                </GridItem>
            </GridContainer>
        </Box>
    )
}

export default LoginPage;