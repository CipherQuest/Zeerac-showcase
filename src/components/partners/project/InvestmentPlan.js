import React from "react";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import NotFound from "../../globalComponents/NotFound";
import TableContainer from "@mui/material/TableContainer";
import CustomTooltip from "../../globalComponents/CustomTooltip";

const cols = [
  "Years",
  "Description",
  "Total Price",
  "Downpayment",
  "Monthly",
  "Half Yearly",
];

const useStyles = makeStyles(() => ({
  data: {
    fontSize: 17,
    fontFamily: "light",
    color: "#000000",
  },
  description: {
    fontSize: 17,
    fontFamily: "light",
    color: "#000000",
    height: 50,
    overflow: "hidden",
    textAlign: "center",
  },
}));

/* InvestmentPlan component is displayed after project location
on individual project's page. */
const InvestmentPlan = () => {
  const classes = useStyles();
  const { projectDetails } = useSelector((state) => state.projects);

  return (
    <>
      {projectDetails?.project_installment?.length > 0 ? (
        <TableContainer component={Paper} sx={{ boxShadow: "none", mt: 2 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead
              sx={{
                borderTop: "1.5px solid #707070",
                borderBottom: "1.5px solid #707070",
              }}
            >
              <TableRow>
                {cols?.map((item, index) => (
                  <TableCell
                    key={index}
                    align="center"
                    sx={{
                      color: "#134696",
                      fontSize: 17,
                      fontFamily: "medium",
                    }}
                  >
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {projectDetails?.project_installment.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ borderBottom: "1px solid #8b8b8b" }}
                >
                  <TableCell align="center">
                    <div className={classes.data}>
                      {(row?.duration / 12).toFixed(2)}
                    </div>
                  </TableCell>
                  <TableCell align="center" sx={{ maxWidth: 200 }}>
                    <CustomTooltip title={row?.description}>
                      <div className={classes.description}>
                        {row?.description}
                      </div>
                    </CustomTooltip>
                  </TableCell>
                  <TableCell align="center">
                    <div className={classes.data}>{parseInt(row?.amount)}</div>
                  </TableCell>

                  <TableCell align="center">
                    <div className={classes.data}>
                      {parseInt(row?.down_payment)}
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    <div className={classes.data}>
                      {parseInt(row?.amount / 12)}
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    <div className={classes.data}>
                      {parseInt(row?.amount / 2)}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <NotFound label="Not Found" />
      )}
    </>
  );
};

export default InvestmentPlan;
