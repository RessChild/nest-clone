import React from "react";
import { Grid } from "@material-ui/core";

const GridContainer = ({ children, ...others }) => {
    return <Grid container {...others}>{ children }</Grid>;
}

export default GridContainer;