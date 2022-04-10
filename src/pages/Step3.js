import React from "react";
import MainContainer from "./../layouts/MainContainer";
import Typography from "@material-ui/core/Typography";
import Form from "../components/Form/Form";
import { useForm } from "react-hook-form";
import FileInput from "./../components/Form/FileInput";
import { useNavigate } from "react-router-dom";
import { useData } from "../data/DataContext";
import SubmitButton from "../components/Form/SubmitButton";
// import ShowImage from './../components/ShowImage';

const Step3 = () => {
  const navigate = useNavigate();
  const { data, setValues } = useData();
  const { control, handleSubmit } = useForm({
    defaultValues: { files: data.files },
  });

  const onSubmit = (data) => {
    console.log(data);
    navigate("/result");
    setValues(data);
  };

  // const watchFields = watch(["files"]);
  // const [images, setImages] = useState([]);
  // React.useEffect(() => {
  //   const subscription = watch((value, { name, type }) => setImages(value.files));
  //   return () => subscription.unsubscribe();
  // }, [watch]);

  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        Step 3
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FileInput name="files" control={control} />
        <SubmitButton>Next</SubmitButton>
      </Form>
      {/* {<ShowImage images={images} />} */}
    </MainContainer>
  );
};

export default Step3;
