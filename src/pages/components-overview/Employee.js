import React, { useEffect } from 'react';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Grid, TextField, MenuItem, FormHelperText, Select, FormControl, InputLabel  } from '../../../node_modules/@mui/material/index';
// import MUIDataTable from "mui-datatables";
import Table from 'antd/lib/table';
import Space  from 'antd/lib/space';
import Input from 'antd/lib/input';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import axios from '../../../node_modules/axios/index';
import { Backdrop } from '../../../node_modules/@mui/material/index';
import { CircularProgress } from '../../../node_modules/@mui/material/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// ======================== MUI DATATABLE =========================

const { Search } = Input;
 const columns = [
    {
     key: "1",
     title: "ID",
     dataIndex: "id",
    },
    {
      key: "2",
      title: "Name",
      dataIndex: "name",
     },
     {
      key: "3",
      title: "Employee ID",
      dataIndex: "email",
     },
     {
      key: "4",
      title: "Gender",
      dataIndex: "username",
     },
     {
      key: "5",
      title: "Email",
      dataIndex: "username",
     },
     {
      key: "6",
      title: "Phone Number",
      dataIndex: "username",
     },
     {
      key: "7",
      title: "Manager Name",
      dataIndex: "username",
     },
     {
       key: "8",
       title: "Actions",
       render: () => (
        <span>
        <EditOutlined />
        <DeleteOutlined />
      </span>
       )
     }
    
   ];



  

// =================== VALIDATION SCHEMA FOR FORM =====================
const validationSchema = yup.object({
    fathername: yup
       .string('Enter your father name')
       .required('father name is required'),
       firstname: yup
       .string('Enter your First Name')
     //   .min(8, 'Password should be of minimum 8 characters length')
       .required('Name is required'),
       address: yup .string('Enter your address') .required('address is required'),
       phonenumber: yup .string('Enter your phone number') .required('phone number is required').min(10, 'Number should be of minimum 10 Numbers length'),
       personalemail: yup .string('Enter your personal email') .required('personal email is required') .email('Invalid email'),
       businessemail: yup .string('Enter your business email') .required('business email is required') .email('Invalid email'),
       employeeid: yup .string('Enter your employee id') .required('employee id is required'),
       gender: yup .string('Enter your gender') .required('gender is required'),
       nationality: yup .string('Enter your nationality') .required('nationality is required'),
       dateofbirth: yup .string('Enter your date of birth') .required('date of birth is required'),
       securitynumber: yup .string('Enter your Socail Security Number') .required('Socail Security Number is required'),
       manager: yup .string('Select your Manager ') .required('Manager is required'),
       currentposition: yup .string('Enter your current position') .required('current position is required'),
       department: yup .string('Enter your department') .required('department is required'),
       hiringdate: yup .string('Enter your hiring date') .required('hiring date is required'),
   });

   const Employee = () => {
    // ===============================STATES==================================
     const [showForm, setShowForm] = useState(false);
     const [showData, setShowData] = useState([]);
     const [postData, setPostData] = React.useState(false);
    // =====================TABLE CUSTOMIZATION==================================
    // const getMuiTheme = () =>
    // createTheme({
    //   components: {
    //     MuiTableCell: {
    //       styleOverrides:{ root: {
    //         backgroundColor: '#fffffc',
    //       }}
    //     },
    //     MuiToolbar: {
    //       styleOverrides:{regular: {
    //         backgroundColor: '#0a3568',
    //         color: 'white',
    //         margin: '-10px',
    //       }}
    //     },
    //     MuiIconButton: {
    //         styleOverrides:{root: {
    //           color: 'white',
    //         }}
    //       }
    //   }
    // });
  //  ================FETCH TABLE DATA USING GET API============================
      const fetchData = async () => {
        try{
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        if(response.status === 200){
          setShowData(response.data);
        } else {
          setShowData([]);
        }

        }
        catch(error){
        console.log("Something went wrong", error);
        setShowData([]);
        }
      };
      useEffect(() => {
        fetchData();
      }, []); 
      //  ============Get API data Ends=============

      
      //  ============Yup Validation=============
      const formik = useFormik({
        initialValues: {
          employeename: '',
          fathername: '',
          address: '',
          phonenumber: '',
          personalemail: '',
          businessemail: '',
          employeeid: '',
          gender: '',
          marriagestatus: '',
          dateofbirth: 'Day/Month/Year',
          nationality: '',
          cnic: '',
          dropdown: 'Drop Down',
          currentposition: '',
          department: '',
          hiringdate: 'Day/Month/Year',
        },
        //  ============POST API data Starts=============
        validationSchema: validationSchema,
        onSubmit: async (values) => {
          try {
            setPostData(true);
            const response = await axios.post('https://dummy.restapiexample.com/api/v1/create', values);
            if (response.status === 200) {
              toast.warn('User Added Successfully.. It was just Demo', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
              setPostData(false);
              setShowForm(false);
            } else {
              console.log("Something went wrong", response);
            }
          } catch (error) {
            console.log("Something went wrong", error);
            setPostData([]);
          }
        },
      });      
      
      

      
     return (
          <div>
          {postData && 
          <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={postData}
          >
           <CircularProgress color="inherit" />
            </Backdrop>}
           {showForm ?
           <form onSubmit={formik.handleSubmit} >
           <Grid container spacing={2} justifyContent="center" alignItems="center" display="flex" sx={{mt: 3}}>
           <Grid xs={12} md={4} mb={3} sx={{
            marginRight: '20px',
             }}>
           <TextField
              fullWidth
              id="firstname"
              name="firstname"
              label="First Name"
              type="text"
              value={formik.values.firstname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.firstname && Boolean(formik.errors.firstname)}
              helperText={formik.touched.firstname && formik.errors.firstname}
            />
           </Grid>
           
           <Grid xs={12} md={4} mb={3}>
           <TextField
              fullWidth
              id="middlename"
              name="middlename"
              label="Middle Name"
              value={formik.values.middlename}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.middlename && Boolean(formik.errors.middlename)}
              helperText={formik.touched.middlename && formik.errors.middlename}
            />
           </Grid>

           <Grid xs={12} md={4} mb={3} sx={{
            marginRight: '20px',
             }}>
           <TextField
              fullWidth
              id="lastname"
              name="lastname"
              label="Last Name"
              value={formik.values.lastname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastname && Boolean(formik.errors.lastname)}
              helperText={formik.touched.lastname && formik.errors.lastname}
            />
           </Grid>

           <Grid xs={12} md={4} mb={3}>
           <TextField
              fullWidth
              id="fathername"
              name="fathername"
              label="Father Name"
              value={formik.values.fathername}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fathername && Boolean(formik.errors.fathername)}
              helperText={formik.touched.fathername && formik.errors.fathername}
            />
           </Grid>

           <Grid xs={12} md={4} mb={3} sx={{
            marginRight: '20px',
             }}>
           <TextField
              fullWidth
              id="address"
              name="address"
              label="Address"
              type="text"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
           </Grid>

           <Grid xs={12} md={4} mb={3} >
           <TextField
              fullWidth
              id="city"
              name="city"
              label="City"
              type="text"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
           </Grid>

           <Grid xs={12} md={4} mb={3} sx={{
            marginRight: '20px',
             }}>
           <TextField
              fullWidth
              id="state"
              name="state"
              label="State"
              type="text"
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={formik.touched.state && formik.errors.state}
            />
           </Grid>
  
           <Grid xs={12} md={4} mb={3} >
           <TextField
              fullWidth
              id="zipcode"
              name="zipcode"
              label="Zipcode"
              type="text"
              value={formik.values.zipcode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.zipcode && Boolean(formik.errors.zipcode)}
              helperText={formik.touched.zipcode && formik.errors.zipcode}
            />
           </Grid>

           <Grid xs={12} md={4} mb={3} sx={{
            marginRight: '20px',
             }}>
           <TextField
              fullWidth
              id="phonenumber"
              name="phonenumber"
              label="Phone Number"
              type="text"
              value={formik.values.phonenumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phonenumber && Boolean(formik.errors.phonenumber)}
              helperText={formik.touched.phonenumber && formik.errors.phonenumber}
            />
           </Grid>

           <Grid xs={12} md={4} mb={3}>
           <TextField
              fullWidth
              id="personalemail"
              name="personalemail"
              label="Personal Email"
              type="text"
              value={formik.values.personalemail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.personalemail && Boolean(formik.errors.personalemail)}
              helperText={formik.touched.personalemail && formik.errors.personalemail}
            />
           </Grid>

           <Grid xs={12} md={4} mb={3} sx={{
            marginRight: '20px',
             }}>
           <TextField
              fullWidth
              id="businessemail"
              name="businessemail"
              label="Business Email"
              type="text"
              value={formik.values.businessemail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.businessemail && Boolean(formik.errors.businessemail)}
              helperText={formik.touched.businessemail && formik.errors.businessemail}
            />
           </Grid>

           <Grid xs={12} md={4} mb={3}>
           <TextField
              fullWidth
              id="employeeid"
              name="employeeid"
              label="Employee Id"
              type="Number"
              value={formik.values.employeeid}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.employeeid && Boolean(formik.errors.employeeid)}
              helperText={formik.touched.employeeid && formik.errors.employeeid}
            />
           </Grid>

           <Grid xs={12} md={4} mb={3} sx={{
            marginRight: '20px',
             }}>
           <FormControl fullWidth>
           <InputLabel htmlFor="Gender">Gender</InputLabel>
            <Select
            id="gender"
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.gender && Boolean(formik.errors.gender)}
            >
           <MenuItem value="">Select Gender</MenuItem>
           <MenuItem value="male">Male</MenuItem>
           <MenuItem value="female">Female</MenuItem>
           <MenuItem value="other">Binary</MenuItem>
           <MenuItem value="other">Prefer not to say</MenuItem>
           <MenuItem value="other">Bisectual</MenuItem>
           <MenuItem value="other">Gay</MenuItem>
            </Select>
            {formik.touched.gender && formik.errors.gender && (
            <FormHelperText error>{formik.errors.gender}</FormHelperText>
            )}
           </FormControl>
           </Grid>

           


           <Grid xs={12} md={4} mb={3}>
            
           <FormControl fullWidth>
           <InputLabel htmlFor="dropdown">Marriage Status</InputLabel>
           <Select
           id="marriagestatus"
           name="marriagestatus"
           value={formik.values.marriagestatus}
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}
           error={formik.touched.marriagestatus && Boolean(formik.errors.marriagestatus)}
           >
          <MenuItem value="">Select Marriage Status</MenuItem>
          <MenuItem value="male">Single</MenuItem>
          <MenuItem value="female">Married</MenuItem>
          <MenuItem value="other">Divorced</MenuItem>
          <MenuItem value="other">Widow</MenuItem>
          </Select>
          {formik.touched.marriagestatus && formik.errors.marriagestatus && (
            <FormHelperText error>{formik.errors.marriagestatus}</FormHelperText>
          )}
         </FormControl>

          </Grid>


           <Grid xs={12} md={4} mb={3} sx={{
            marginRight: '20px',
             }}>
           <TextField
              fullWidth
              id="dateofbirth"
              name="dateofbirth"
              label="Date of Birth"
              type="text"
              value={formik.values.calendar}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.calendar && Boolean(formik.errors.calendar)}
              helperText={formik.touched.calendar && formik.errors.calendar}
            />
           </Grid>

           
           <Grid xs={12} md={4} mb={3}>
           <TextField
              fullWidth
              id="nationality"
              name="nationality"
              label="Nationality"
              type="text"
              value={formik.values.nationality}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.nationality && Boolean(formik.errors.nationality)}
              helperText={formik.touched.nationality && formik.errors.nationality}
            />
           </Grid>

           <Grid xs={12} md={4} mb={3} sx={{
            marginRight: '20px',
             }}>
           <TextField
              fullWidth
              id="securitynumber"
              name="securitynumber"
              label="Socail Security Number"
              type="Number"
              value={formik.values.securitynumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.securitynumber && Boolean(formik.errors.cnic)}
              helperText={formik.touched.securitynumber && formik.errors.securitynumber}
            />
           </Grid>

           <Grid xs={12} md={4} mb={3}>
            
           <FormControl fullWidth>
           <InputLabel htmlFor="dropdown">Manager</InputLabel>
           <Select
           id="manager"
           name="manager"
           value={formik.values.manager}
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}
           error={formik.touched.manager && Boolean(formik.errors.manager)}
           >
          <MenuItem value="">Select Manager</MenuItem>
          <MenuItem value="male">Manager One</MenuItem>
          <MenuItem value="female">Manager Two</MenuItem>
          <MenuItem value="other">Manager Three</MenuItem>
          </Select>
          {formik.touched.manager && formik.errors.manager && (
            <FormHelperText error>{formik.errors.manager}</FormHelperText>
          )}
         </FormControl>

          </Grid>

           <Grid xs={12} md={4} mb={3} sx={{
            marginRight: '20px',
             }}>
           <TextField
              fullWidth
              id="currentposition"
              name="currentposition"
              label="Current Position"
              type="text"
              value={formik.values.currentposition}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.currentposition && Boolean(formik.errors.currentposition)}
              helperText={formik.touched.currentposition && formik.errors.currentposition}
            />
           </Grid>


           <Grid xs={12} md={4} mb={3}>
           <TextField
              fullWidth
              id="department"
              name="department"
              label="Department"
              type="text"
              value={formik.values.department}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.department && Boolean(formik.errors.department)}
              helperText={formik.touched.department && formik.errors.department}
            />
           </Grid>
           <Grid xs={12} md={4} mb={3}>
           <TextField
              fullWidth
              id="hiringdate"
              name="hiringdate"
              label="Hiring Date"
              type="text"
              value={formik.values.hiringdate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.hiringdate && Boolean(formik.errors.hiringdate)}
              helperText={formik.touched.hiringdate && formik.errors.hiringdate}
            />
           </Grid>
           

           <Grid xs={12} md={9}>
           <Button color="success" variant="contained" fullWidth type="submit"
           sx={{
             width: '200px',
             marginLeft: '270px',
           }}
           >
              Submit
            </Button>
           </Grid>
           </Grid>
            
            
           
          </form> :
        

          <Grid container justifyContent={'center'} >
          <Grid item xs={12} sm={12} md={12}>
            {/*======== Add Employee Button======== */}
            <Grid container justifyContent={'space-between'}>
          <Grid item xs={6}>

          </Grid>
          <Grid item xs={6} sx={{mt: -1}}>
            <Button variant='contained' onClick={() => setShowForm(true)}
            sx={{
             backgroundColor:"success.main",
             color:"white",
             marginLeft: '320px',
             '&:hover': {
              backgroundColor: 'success.light',
             }
            }}
            >Add Employee</Button>
          </Grid>
           </Grid>
           {/*======== Search Bar====== */}
          <Grid item xs={12} sm={4} md={4} sx={{mt: -4, mb: 3, marginLeft: '-10px',}}>
          <Space direction="vertical" style={{ width: '100%' }}>
          <Search
          placeholder="Search"
          allowClear
          enterButton={<SearchOutlined />}
          />
          </Space>
          </Grid>
          <Grid item xs={12} sm={4} md={12} sx={{marginLeft: '-10px',}}>
          <Table
          dataSource={showData || []}
          columns={columns}
          pagination={true}
          bordered
          size="small"
          />
          </Grid>
          </Grid>
         </Grid>
          }
          
               <ToastContainer></ToastContainer>
          
         
       </div>
     );
   };

   export default Employee;