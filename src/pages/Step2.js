import React from "react";
import MainContainer from "../layouts/MainContainer";
import Form from "../components/Form/Form";
import Input from "../components/Form/Input";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../components/Form/SubmitButton";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import { useData } from "../data/DataContext";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Should be a valid email")
    .required("Email is required"),
});

const Step2 = () => {
  const { setValues, data } = useData();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: data.email,
      hasPhone: data.hasPhone,
      phoneNumber: data.phoneNumber,
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const hasPhone = watch("hasPhone");

  const onSubmit = (data) => {
    console.log(data);
    navigate("/step3");
    setValues(data);
  };

  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        Step 2
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("email")}
          name="email"
          type="email"
          label="Email"
          error={!!errors.email}
          helperText={errors?.email?.message}
        />
        <FormControlLabel
          control={
            <Checkbox
              defaultValue={data.hasPhone}
              defaultChecked={data.hasPhone}
              name="hasPhone"
              {...register("hasPhone")}
            />
          }
          label="Do you have phone"
        />
        {hasPhone && (
          <Input
            {...register("phoneNumber")}
            type="tel"
            name="phoneNumber"
            label="Phone Number"
          />
        )}
        <SubmitButton>Next</SubmitButton>
      </Form>
    </MainContainer>
  );
};

export default Step2;
