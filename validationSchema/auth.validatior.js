import * as yup from "yup";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invaid email address")
    .required("Email is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).*$/,
      "Password must contain at least one number, one special character, and one uppercase letter"
    )
    .min(8)
    .required("Password is required"),
});

const signupSchema = yup.object().shape({
  hoTen: yup.string().required("This feild is required"),
  tenNhaHang: yup.string().required("This feild is required"),
  sdt: yup.string().required("This feild is required").min(10),
  email: yup
    .string()
    .email()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invaid email address")
    .required("Email is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).*$/,
      "Password must contain at least one number, one special character, and one uppercase letter"
    )
    .min(8)
    .required("password is required"),
});

const AuthValidatior = {
  loginSchema,
  signupSchema,
};

export default AuthValidatior;
