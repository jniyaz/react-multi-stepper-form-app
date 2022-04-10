import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Paper,
  Avatar
} from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import Dropzone from "react-dropzone";
import { Controller } from "react-hook-form";
import { formatBytes } from './../../utils/helpers';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#eee",
    textAlign: "center",
    cursor: "pointer",
    color: "#333",
    padding: "10px",
    marginTop: "20px",
  },
  icon: {
    marginTop: "16px",
    color: "#888888",
    fontSize: "42px",
  },
}));

const MAX_SIZE = 40000000; // bits

const FileInput = ({ control, name }) => {
  const styles = useStyles();
  return (
    <Controller
      render={({ field: { onChange, onBlur, value, name, ref } }) => (
        <>
          <Dropzone
            accept="image/jpeg"
            maxSize={MAX_SIZE}
            onDrop={(acceptedFiles) =>
              onChange(
                acceptedFiles.map((file) =>
                  Object.assign(file, { prev_path: URL.createObjectURL(file) })
                )
              )
            }
          >
            {({ getRootProps, getInputProps }) => (
              <Paper
                className={styles.root}
                variant="outlined"
                {...getRootProps()}
              >
                <CloudUpload className={styles.icon} />
                <input {...getInputProps()} name={name} onBlur={onBlur} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </Paper>
            )}
          </Dropzone>
          <List>
            {value.map((f, index) => (
              <ListItem key={index} alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar src={f.prev_path}></Avatar>
                  {/* <img alt="preview_image" width={"60"} src={f.prev_path} /> */}
                </ListItemAvatar>
                <ListItemText primary={f.name} secondary={formatBytes(f.size)} />
              </ListItem>
            ))}
          </List>
        </>
      )}
      control={control}
      name={name}
      defaultValue={[]}
    ></Controller>
  );
};

export default FileInput;
