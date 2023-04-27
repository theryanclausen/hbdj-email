import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CalIcon from "@mui/icons-material/CalendarMonth";
import MailIcon from "@mui/icons-material/Mail";
import StarIcon from "@mui/icons-material/Star";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import WarningIcon from "@mui/icons-material/Warning";
import CriticalIcon from "@mui/icons-material/FireExtinguisher";
import Emails from "./Emails";
import { dataBuilder } from "./data";
import { Grid, TextField, InputAdornment } from "@mui/material";
import { Redeem, Search } from "@mui/icons-material";
import CustomPagination from "./CustomPagination";

const drawerWidth = 190;
function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [search, setSearch] = React.useState("");
  const [emails, setEmails] = React.useState(dataBuilder(83));
  React.useEffect(() => {
    const goAction = async () => {
      await timeout(2000);
      setEmails((prev) => [...dataBuilder(1), ...prev]);
      await timeout(1300);
      setEmails((prev) => [...dataBuilder(2), ...prev]);
      await timeout(1200);
      setEmails((prev) => [...dataBuilder(2), ...prev]);
      await timeout(1100);
      setEmails((prev) => [...dataBuilder(2), ...prev]);
    };
    const goAgain = async () => {
      setEmails(dataBuilder(177));
      await timeout(2000);
      timeout(0).then(goAction);
      timeout(400).then(goAction);
      timeout(9).then(goAction);
      timeout(1).then(goAction);
      timeout(123).then(goAction);
      timeout(13).then(goAction);
      timeout(323).then(goAction);
    };
    if (search === "action") {
      setSearch("");
      if (emails.length !== 83) {
        setEmails(dataBuilder(83));
      }
      goAction();
    }
    if (search === "again") {
      setSearch("");
      goAgain();
    }
  }, [search, emails, setEmails]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar style={{ backgroundColor: "#1c0120" }} position="fixed" open>
        <Toolbar>
          <Grid container justifyContent="space-between">
            <TextField
              style={{ width: "33%" }}
              variant="outlined"
              color="primary"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              placeholder="Search Mail"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <CustomPagination
              style={{ color: "white" }}
              component="div"
              count={(emails.length || 0) + 98}
              page={1}
              onPageChange={() => {}}
              rowsPerPage={25}
              onRowsPerPageChange={() => {}}
            />
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open
      >
        <DrawerHeader>
          <Grid container alignItems={"center"}>
            <Redeem style={{ marginRight: "5px" }} />
            <Typography variant="h6" noWrap component="div">
              {"    "}
              Parcel Out
            </Typography>
          </Grid>

          <IconButton>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            {
              label: <span className="strong">Inbox ({emails.length})</span>,
              icon: <MailIcon />,
            },
            {
              label: (
                <span className="strong">
                  Critical ({Math.round(emails.length * 0.9)})
                </span>
              ),
              icon: <CriticalIcon />,
            },
            { label: "Send email", icon: <SendIcon /> },
            { label: "Drafts", icon: <EditIcon /> },
          ].map(({ label, icon }, index) => (
            <ListItem key={label} disablePadding>
              <ListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {[
            { label: "All Mail", icon: <MailIcon /> },
            { label: "Starred", icon: <StarIcon /> },
            { label: "Meeting", icon: <CalIcon /> },
            { label: "Trash", icon: <DeleteIcon /> },
            { label: "Spam", icon: <WarningIcon /> },
          ].map(({ label, icon }, index) => (
            <ListItem key={label} disablePadding>
              <ListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Main open>
        <DrawerHeader />
        <Emails emails={emails} />
      </Main>
    </Box>
  );
}
