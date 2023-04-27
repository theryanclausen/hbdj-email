import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import { Card, Typography } from "@mui/material";
import EmojiFlagsIcon from "@mui/icons-material/EmojiFlagsTwoTone";
export default function Emails({ emails }) {
  const [checked, setChecked] = React.useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Card style={{ width: "85%" }}>
      <List sx={{ width: "100%", bgcolor: "rgba(66, 64, 64, 0.088)" }}>
        {emails.map(({ flag, sender, subject, body }, value) => {
          const labelId = `checkbox-list-label-${sender}`;

          return (
            <ListItem
              dense
              key={labelId}
              secondaryAction={
                <IconButton edge="end" aria-label="comments">
                  <CommentIcon />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton
                role={undefined}
                onClick={handleToggle(value)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>

                <ListItemText style={{ flex: 1 }} primary={sender} />
                {flag ? <EmojiFlagsIcon color={flag} /> : null}
                <ListItemText
                  style={{
                    flex: 3,
                    overflow: "hidden",
                    textOverflow: "ellipsis !important",
                    whiteSpace: "nowrap !important",
                    alignItems: "center",
                    display: "flex",
                  }}
                  id={labelId}
                  primary={
                    <Typography variant="body2" noWrap>
                      {" "}
                      <b>{subject}</b> {body}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
}
