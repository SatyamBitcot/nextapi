'use client';
import { createSlice } from '@reduxjs/toolkit';
import * as API from '../../ServerApiAction/ClientApi'; 

const initialState = {
  employees: [],
  isLoading: false,
  error: null,
  totalPages: 0, 
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setEmployees(state, action) {
      state.employees = action.payload.employees;
      state.totalPages = action.payload.total; 
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
    deleteEmployee(state, action) {
      state.employees = state.employees.filter((employee) => employee._id !== action.payload);
    },
    updateEmployee(state, action) {
      const index = state.employees.findIndex((employee) => employee._id === action.payload._id);
      if (index !== -1) {
        state.employees[index] = action.payload;
      }
    },
    addEmployee(state, action) {
      state.employees.push(action.payload);
    },
  },
});


export const {
  setLoading,
  setEmployees,
  setError,
  clearError,
  deleteEmployee,
  updateEmployee,
  addEmployee,
} = employeeSlice.actions;


export const fetchEmployees = (pageNumber, pageSize) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    
    const response = await API.get(`/employees?pageNumber=${pageNumber}&limit=${pageSize}`);
    console.log(response,'fetching data')
    dispatch(setEmployees(response.data)); 
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};


export const createEmployee = (employeeData) => async (dispatch) => {
  try {
    const response = await API.post('/employee/add', employeeData);
    dispatch(addEmployee(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const modifyEmployee = (id, data) => async (dispatch) => {
  try {
    console.log('id', id); 
    const response = await API.put(`/employee/update/${id}`, data);
    console.log('response modify', response);
    dispatch(updateEmployee(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const removeEmployee = (id) => async (dispatch) => {
  try {
    await API.del(`/employee/delete/${id}`);
    dispatch(deleteEmployee(id));
  } catch (error) {
    dispatch(setError(error.message));
  }
};


export const selectEmployees = (state) => state.employees.employees;
export const selectLoading = (state) => state.employees.isLoading;
export const selectError = (state) => state.employees.error;
export const selectTotalPages = (state) => state.employees.totalPages; 

export default employeeSlice.reducer;
