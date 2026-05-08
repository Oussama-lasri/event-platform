import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Button, Card, Input } from "../components/ui";
import { useAuth } from "../hooks/useAuth";
import { getApiErrorMessage } from "../services/http";

const schema = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

function Register() {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const { register, handleSubmit, formState } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (values) => {
    try {
      await registerUser({ name: values.name, email: values.email, password: values.password });
      navigate("/login");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Registration failed"));
    }
  };

  return (
    <Card className="mx-auto max-w-md">
      <h1 className="mb-4 text-2xl font-bold text-slate-900">Create account</h1>
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder="Full name" {...register("name")} />
        <Input placeholder="Email" {...register("email")} />
        <Input type="password" placeholder="Password" {...register("password")} />
        <Input type="password" placeholder="Confirm password" {...register("confirmPassword")} />
        <Button className="w-full" disabled={formState.isSubmitting}>
          Register
        </Button>
      </form>
      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-violet-700">
          Login
        </Link>
      </p>
    </Card>
  );
}

export default Register;
