import React, { useEffect } from 'react';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
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
import { EditOutlined, DeleteOutlined, ArrowDownOutlined, DoubleRightOutlined } from '@ant-design/icons';
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
      title: "Applicant Name",
      dataIndex: "name",
     },
     {
      key: "3",
      title: "Date of Application",
      render: () => (
        <span>
       21/Jan/2022
      </span>
       )
     },
    
     {
      key: "4",
      title: "Hiring Post",
      render: () => (
        <span>
       React Developer
      </span>
       )
     },

     {
      key: "6",
      title: "Email",
      dataIndex: "email",
     },
     {
        key: "5",
        title: "Get CV",
        render: () => (
         <span>
        <ArrowDownOutlined />
       </span>
        )
      },
      {
        key: "5",
        title: "Proceed",
        render: () => (
         <span>
       <DoubleRightOutlined />
       </span>
        )
      },
     {
       key: "9",
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
    jobtitle: yup
       .string('Enter your Job Title')
       .required('Job Title is required'),
       team: yup
       .string('Enter your Team')
     //   .min(8, 'Password should be of minimum 8 characters length')
       .required('Team is required'),
       country: yup .string('Enter your Country') .required('Country is required'),
       remoteavailable: yup .string('Select your Remote Availability') .required('Remote Availability is required').min(10, 'Number should be of minimum 10 Numbers length'),
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

   const JobApplications = () => {
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
          jobtitle: '',
          team: '',
          country: '',
          remoteavailable: '',
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
            <Typography variant="h4" textAlign="center">Job Posting</Typography>
           <Grid container spacing={2} justifyContent="center" alignItems="center" display="flex" sx={{mt: 3}}>
           <Grid xs={12} md={4} mb={3} sx={{
            marginRight: '20px',
             }}>
           <TextField
              fullWidth
              id="jobtitle"
              name="jobtitle"
              label="Job Title"
              type="text"
              value={formik.values.jobtitle}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.jobtitle && Boolean(formik.errors.jobtitle)}
              helperText={formik.touched.jobtitle && formik.errors.jobtitle}
            />
           </Grid>
           
           <Grid xs={12} md={4} mb={3}>
           <TextField
              fullWidth
              id="team"
              name="team"
              label="Team"
              value={formik.values.team}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.team && Boolean(formik.errors.team)}
              helperText={formik.touched.team && formik.errors.team}
            />
           </Grid>

           <Grid xs={12} md={4} mb={3} sx={{
            marginRight: '20px',
             }}>
           <FormControl fullWidth>
           <InputLabel htmlFor="Gender">Country</InputLabel>
            <Select
            id="country"
            name="country"
            value={formik.values.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.country && Boolean(formik.errors.country)}
            >
           <MenuItem value="">Select Country</MenuItem>
           <MenuItem value="male">Pakistan</MenuItem>
           <MenuItem value="female">India</MenuItem>
           <MenuItem value="other">United State of America</MenuItem>
           <MenuItem value="other">United Kingdom</MenuItem>
           <MenuItem value="other">Canada</MenuItem>
           <MenuItem value="other">Germany</MenuItem>
            </Select>
            {formik.touched.country && formik.errors.country && (
            <FormHelperText error>{formik.errors.country}</FormHelperText>
            )}
           </FormControl>
           </Grid>

           <Grid xs={12} md={4} mb={3}>
           <FormControl fullWidth>
           <InputLabel htmlFor="Remote Available">Remote Available</InputLabel>
            <Select
            id="remoteavailable"
            name="remoteavailable"
            value={formik.values.remoteavailable}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.remoteavailable && Boolean(formik.errors.remoteavailable)}
            >
           <MenuItem value="">Select Country</MenuItem>
           <MenuItem value="male">Pakistan</MenuItem>
           <MenuItem value="female">India</MenuItem>
           <MenuItem value="other">United State of America</MenuItem>
           <MenuItem value="other">United Kingdom</MenuItem>
           <MenuItem value="other">Canada</MenuItem>
           <MenuItem value="other">Germany</MenuItem>
            </Select>
            {formik.touched.remoteavailable && formik.errors.remoteavailable && (
            <FormHelperText error>{formik.errors.remoteavailable}</FormHelperText>
            )}
           </FormControl>
           </Grid>

           <Grid xs={12} md={4} mb={3} sx={{
            marginRight: '20px',
             }}>
           <label htmlFor="The Role Description">The Role Description:</label>
           <br />
           <textarea
           id="theroledescription"
           name="theroledescription"
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}
           value={formik.values.comment}
           rows={5} // Set the number of visible lines
          cols={41} // Set the visible width
           />
           </Grid>

           <Grid xs={12} md={4} mb={3} >
           <label htmlFor="The Requirments Description">The Requirments Description:</label>
           <br />
           <textarea
           id="therequirmentsdescription"
           name="therequirmentsdescription"
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}
           value={formik.values.comment}
           rows={5} // Set the number of visible lines
          cols={41} // Set the visible width
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
            <Typography variant="h3" sx={{ marginBottom: '30px' }}>Job Applications</Typography>
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
            >Post New Job</Button>
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

   export default JobApplications;