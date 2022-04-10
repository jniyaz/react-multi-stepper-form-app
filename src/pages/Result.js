import React, { useState } from "react";
import MainContainer from "./../layouts/MainContainer";
import {
  TableContainer,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { useData } from "../data/DataContext";
import { formatBytes } from "../utils/helpers";
import SubmitButton from "../components/Form/SubmitButton";
import Swal from "sweetalert2";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "30px"
  },
  table: {
    marginBottom: "30px"
  }
}))

const Result = () => {
  const styles = useStyles()
  const { data } = useData();
  const { width, height } = useWindowSize();
  const [success, setSuccess] = useState(false);
  const entries = Object.entries(data).filter((entry) => entry[0] !== "files");
  const { files } = data;

  const onSubmit = async () => {
    const formData = new FormData();
    if (data.files) {
      data.files.forEach((file) => {
        formData.append("files", file, file.name);
      });
    }
    entries.forEach((entry) => {
      formData.append(entry[0], entry[1]);
    });
    const res = await fetch("http://localhost:4000/", {
      method: "POST",
      body: formData,
    });

    if (res.status === 200) {
      Swal.fire(
        "Great job",
        "Your details has been sent successfully",
        "success"
      );
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  };

  if (success) {
    return <Confetti width={width} height={height} />;
  }

  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        Form Values
      </Typography>
      <TableContainer component={Paper} className={styles.root}>
        <Table className={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell>Field</TableCell>
              <TableCell align="right">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry[0]}>
                <TableCell>{entry[0]}</TableCell>
                <TableCell>{entry[1].toString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {files && (
        <>
          <Typography component="h2" variant="h6">
            Files
          </Typography>
          <List>
            {files.map((f, i) => (
              <ListItem key={i} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar src={f.prev_path}></Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={f.name}
                  secondary={formatBytes(f.size)}
                />
              </ListItem>
            ))}
          </List>
        </>
      )}
      <SubmitButton onClick={onSubmit}>Submit</SubmitButton>
      <Link to="/">Start Over</Link>
    </MainContainer>
  );
};

export default Result;
