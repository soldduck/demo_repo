import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import BookView from './BookView';


  
  const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
  });
  
  function SearchedBooksView(props) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    return (
      <div>
        {props.books ? 
          <Paper style={{marginTop: "10px"}}>
            <TableContainer>
              <Table stickyHeader style={{padding: "10 5px 0",  borderSpacing: "0 5px", borderCollapse: "separate"}}>
                <TableHead >
                </TableHead>
                <TableBody>
                    {props.books.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((book) => {
                      return (
                        <TableRow hover tabIndex={-1}>
                          <BookView header={book.header} bookData={book.bookData} hasDept={props.userStatus == "1" ? true : false}/>
                        </TableRow>);
                    }) }
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={props.books.length}
              rowsPerPage={rowsPerPage}
              labelRowsPerPage={"Результатов на странице"}
              labelDisplayedRows={({ from, to, count }) => { return from +"-"+ to + " из " + (count !== -1 ? count : "более " + {to}) }}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
          :
          <div></div>
        }
      </div>
    );
  }

  const mapStateToProps = (state) => {
    return {
      books: state.searchedBooks,
      userStatus: state.user.Status
    }
  }

  export default connect(mapStateToProps)(SearchedBooksView);