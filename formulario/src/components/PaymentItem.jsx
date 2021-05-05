import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { withStyles} from "@material-ui/core/styles";

export default function PaymentItem({ payment, togglePayment }) {
  const { date, reference, lote} = payment;

  const handlePaymentClick = () => {
    togglePayment(reference);
  };

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      fontSize: 17,
      fontStyle: "Bold",
    },
    body: {
      fontSize: 15,
      color: "darkBlack",
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  return (
    <StyledTableRow key={reference}>
      <StyledTableCell align="center">{date}</StyledTableCell>
      <StyledTableCell component="th" scope="row" align="center">{reference}</StyledTableCell>
      <StyledTableCell align="center">{lote}</StyledTableCell>
      <StyledTableCell align="center"> </StyledTableCell>
    </StyledTableRow>
  );
}
