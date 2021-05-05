import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { withStyles} from "@material-ui/core/styles";

export default function TodoItem({ todo, toggleTodo }) {
  const { id, reference, lote, completed } = todo;

  const handleTodoClick = () => {
    toggleTodo(id);
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
    <StyledTableRow key={id}>
      <StyledTableCell component="th" scope="row" align="center">
        {reference}
      </StyledTableCell>
      <StyledTableCell align="center">{lote}</StyledTableCell>
      <StyledTableCell align="center"> </StyledTableCell>
    </StyledTableRow>
  );
}
