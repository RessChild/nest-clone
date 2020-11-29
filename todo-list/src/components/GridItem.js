import React from "react"
import { Grid } from "@material-ui/core";

const GridItem = ({ children, ...others }) => {
    return <Grid item {...others}>{ children }</Grid>;
}

export default GridItem;