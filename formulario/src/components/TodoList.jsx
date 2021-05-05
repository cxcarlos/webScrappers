import TodoItem from './TodoItem';
import Table from '@material-ui/core/Table';
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { withStyles} from "@material-ui/core/styles";

export default function TodoList({todos, toggleTodo}) {

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

    return (
        <TableContainer style={{ marginBottom: "30px" }}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Referencia</StyledTableCell>
                        <StyledTableCell align="center">Lote</StyledTableCell>
                        <StyledTableCell align="center">Consiliación</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                        {todos.map(todo => (
                            <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo}/>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
  );
}
