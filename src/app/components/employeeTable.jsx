
'use client';
import React, { useEffect, useState } from 'react';
import { useTable, usePagination , useSortBy } from 'react-table';
import Swal from 'sweetalert2';
import CircularProgress from '@mui/material/CircularProgress';
import { Button, Box, Select, MenuItem ,TextField} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchEmployees,
  removeEmployee,
  modifyEmployee,
  selectEmployees,
  selectLoading,
  selectError,
  selectTotalPages,
} from '../store/employeeSlice';

const EmployeeTable = () => {
  const dispatch = useDispatch();
  const employeeData = useSelector(selectEmployees);
  const isLoading = useSelector(selectLoading);
  const totalPages = useSelector(selectTotalPages); 
  const [page, setPage] = useState(1); 
  const [pageSize, setPageSize] = useState(20); 
  const [editEmployee, setEditEmployee] = useState(null);

  useEffect(() => {
    dispatch(fetchEmployees(page, pageSize)); 
  }, [dispatch, page, pageSize]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      await dispatch(removeEmployee(id));
      Swal.fire('Deleted!', 'Employee has been deleted.', 'success');
      dispatch(fetchEmployees(page, pageSize)); 
    }
  };


  const handleUpdate = async () => {
    if (editEmployee) {
      const { _id, name, email, city, phoneNumber } = editEmployee;
      if (!name || !email || !city || !phoneNumber) {
        Swal.fire('Error!', 'All fields are required!', 'error');
        return;
      }

      await dispatch(modifyEmployee(_id, { name, email, city, phoneNumber }));
      dispatch(fetchEmployees(page, pageSize ));
      Swal.fire('Updated!', 'Employee has been updated.', 'success');
      setEditEmployee(null);
    }
  };
  
  
console.log(employeeData)
  const columns = React.useMemo(() => [
    { Header: 'Name', accessor: 'name' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'City', accessor: 'city' },
    { Header: 'Phone Number', accessor: 'phoneNumber' },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <>
          <Button
            onClick={() => setEditEmployee(row.original)}
            variant="contained"
            color="primary"
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDelete(row.original._id)}
            style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: employeeData,
    manualPagination: true,
    pageCount: totalPages,
  }, useSortBy, usePagination);
  return (
    <>
      {isLoading && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(5px)',
            zIndex: 1000
          }}
        >
          <CircularProgress />
        </Box>
      )}
      
      
      <div className="p-4">
        <div style={{ height: '400px', overflowY: 'auto' }}>
          <table {...getTableProps()} className="min-w-full bg-white">
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th className="border px-4 py-2 text-white bg-black sticky top-0 z-10" {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render('Header')}
                      <span className='text-white'>
    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
  </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => (
                      <td className="border px-4 py-2 text-center text-black" {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
     
      <div style={{display:'flex' , justifyContent:'space-between' , margin:'50px 40px'}}>
            <div>

       <span>Rows Per Page</span>
        <Select
          value={pageSize}
          onChange={(e) => setPageSize(e.target.value)}
          style={{ marginLeft: '10px' , backgroundColor:'white'}}
          > 
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
          </div>
        <div style={{display:'flex', gap:'40px', justifyContent:'center'}}>

        <Button
          className='bg-blue-500 text-white'
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          >
          Previous
        </Button>
        <span>{` Page ${page} of ${totalPages} entries`}</span>
        <Button
        className='bg-blue-500 text-white'
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={page === totalPages}
        >
          Next
        </Button>
            </div>
      </div>
          </div>
      {editEmployee && (
          <div className="mt-4 bg-white p-6 rounded shadow-md">
          <h3 className="text-lg font-semibold mb-4">Edit Employee</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              value={editEmployee.name}
              onChange={(e) => setEditEmployee({ ...editEmployee, name: e.target.value })}
              className="mr-2"
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              value={editEmployee.email}
              onChange={(e) => setEditEmployee({ ...editEmployee, email: e.target.value })}
              className="mr-2"
            />
            <TextField
              fullWidth
              label="City"
              variant="outlined"
              value={editEmployee.city}
              onChange={(e) => setEditEmployee({ ...editEmployee, city: e.target.value })}
              className="mr-2"
            />
            <TextField
              fullWidth
              label="Phone Number"
              variant="outlined"
              value={editEmployee.phoneNumber}
              onChange={(e) => setEditEmployee({ ...editEmployee, phoneNumber: e.target.value })}
              className="mr-2"
            />
          </div>
          <div className="mt-6 flex justify-center gap-2">
            <Button
              onClick={handleUpdate}
              variant="contained"
              color="success"
              className="text-white"
            >
              Update
            </Button>
            <Button
              onClick={()=>setEditEmployee(null)}
              
              className="text-white bg-gray-600"
            >
              Cancel
            </Button>
          </div>
        </div>
        
        )}
      
    </>
  );
};

export default EmployeeTable;