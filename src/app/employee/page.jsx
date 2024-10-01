
"use client";

import { Button } from '@mui/material';
import EmployeeTable from '../components/employeeTable';
import { useRouter } from 'next/navigation';

const EmployeePage = () => {
    const router = useRouter();
    const handleClick=()=>{
        router.push('/addEmployee')
    }
  return (
    <div>
        <div className='flex justify-between p-4'>
      <h1 className="text-2xl font-bold p-4">Employee Management</h1>
     <Button variant='contained' color='primary' onClick={handleClick}>Add Employee</Button>
        </div>
      <EmployeeTable />
    </div>
  );
};

export default EmployeePage;
