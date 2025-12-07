import { TablePagination } from "@mui/material";

const CustomPagination = (props) => {
     const { page, pageSize, rowCount, onPageChange, onPageSizeChange } = props;

     return (
          <TablePagination
               component="div"
               count={rowCount} // Total rows
               page={page}
               onPageChange={(_, newPage) => onPageChange(newPage)}
               rowsPerPage={pageSize}
               onRowsPerPageChange={(event) => onPageSizeChange(event.target.value)}
               rowsPerPageOptions={[5, 10, 20]} // Customize options
               showFirstButton
               showLastButton
          />
     );
}

export default CustomPagination;