"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TextField, Button, Typography, Box } from "@mui/material";
import Swal from "sweetalert2";
import { createEmployee } from "../store/employeeSlice";
import { useDispatch } from "react-redux";

const Page = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const employeeData = { name, email, password, city, phoneNumber };
      console.log(employeeData);
      await dispatch(createEmployee(employeeData));

      Swal.fire({
        icon: 'success',
        title: 'Employee Added',
        text: 'The employee has been added successfully!',
        confirmButtonText: 'OK'
      });

      router.push('/');
      setName("");
      setEmail("");
      setPassword("");
      setCity("");
      setPhoneNumber("");
    } catch (error) {
      console.error('Error adding employee:', error); 
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was an issue adding the employee. Please try again.',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}
    >
      <Box 
        sx={{ 
          width: '400px', 
          padding: 4, 
          bgcolor: 'white', 
          borderRadius: 2, 
          boxShadow: 3 
        }}
      >
        <Typography variant="h4" component="h2" align="center" gutterBottom className="text-black">
          Add New Employee
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'grid', gap: 2 }}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="City"
              variant="outlined"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Phone Number"
              variant="outlined"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Add Employee
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Page;
