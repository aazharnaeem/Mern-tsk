// import * as React from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import AccountCircle from "@mui/icons-material/AccountCircle";
// import MenuItem from "@mui/material/MenuItem";
// import Menu from "@mui/material/Menu";
// import Typography from "@mui/material/Typography";
// import { useNavigate } from "react-router";
// import Hidden from '@mui/material/Hidden';

// const Appbar = () => {
//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const navigate = useNavigate();
//   const rem = () => {
//     localStorage.removeItem("accessToken");
//     navigate("/");
//   };
//   const handleNavigate=(path)=>{
//     navigate(`/${path}`)
//   }

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static" style={{padding:"0 20px 0 10px"}} >
//         <Toolbar>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             TASK MANAGEMENT
//           </Typography>
//           {/* <Hidden style={{display:'none'}}>
//             <MenuItem onClick={handleClose}>Item1</MenuItem>
//             <MenuItem onClick={handleClose}>Item2</MenuItem>
//             <MenuItem onClick={handleClose}>Item3</MenuItem>
//           </Hidden> */}
//           <IconButton
//             size="large"
//             edge="end"
//             aria-label="account of current user"
//             aria-controls="menu-appbar"
//             aria-haspopup="true"
//             onClick={handleMenu}
//             color="inherit"
//           >
//             <AccountCircle style={{ fontSize:"32px"}}    />
//           </IconButton>
//           <Menu
//             id="menu-appbar"
//             anchorEl={anchorEl}
//             anchorOrigin={{
//               vertical: "top",
//               horizontal: "right",
//             }}
//             keepMounted
//             transformOrigin={{
//               vertical: "top",
//               horizontal: "right",
//             }}
//             open={Boolean(anchorEl)}
//             onClose={handleClose}
//           >
//             {/* <MenuItem onClick={()=>handleNavigate('profile')}>Profile</MenuItem> */}
//             <MenuItem onClick={rem}>Log out</MenuItem>
//           </Menu>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// };

// export default Appbar;

import * as React from 'react';
import MuiAppBar from '@mui/material/AppBar';

function AppBar(props) {
  return <MuiAppBar elevation={0} position="fixed" {...props} />;
}

export default AppBar;
