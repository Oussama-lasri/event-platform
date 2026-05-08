import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Button, Card, Input } from "../components/ui";
import { useAuth } from "../hooks/useAuth";
import { getApiErrorMessage } from "../services/http";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { register, handleSubmit, formState } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (values) => {
    try {
      await login(values);
      navigate("/dashboard");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Login failed"));
    }
  };

  return (
    <Card className="mx-auto max-w-md">
      <h1 className="mb-4 text-2xl font-bold text-slate-900">Sign in</h1>
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder="Email" {...register("email")} />
        <Input type="password" placeholder="Password" {...register("password")} />
        <Button className="w-full" disabled={formState.isSubmitting}>
          Login
        </Button>
      </form>
      <div className="mt-4 flex justify-between text-sm">
        <Link to="/forgot-password" className="text-violet-700">
          Forgot password
        </Link>
        <Link to="/register" className="text-violet-700">
          Create account
        </Link>
      </div>
    </Card>
  );
}

export default Login;
