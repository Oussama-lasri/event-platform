import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button, Card, Input } from "../components/ui";
import { authService } from "../services/authService";
import { getApiErrorMessage } from "../services/http";

function ForgotPassword() {
  const { register, handleSubmit, formState } = useForm();

  const onSubmit = async (values) => {
    try {
      await authService.forgotPassword(values);
      toast.success("Reset instructions sent");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Endpoint not available in backend"));
    }
  };

  return (
    <Card className="mx-auto max-w-md">
      <h1 className="mb-3 text-2xl font-bold text-slate-900">Forgot password</h1>
      <p className="mb-4 text-sm text-slate-600">If unsupported, backend will return an error message.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <Input placeholder="Email address" {...register("email")} />
        <Button className="w-full" disabled={formState.isSubmitting}>
          Send reset link
        </Button>
      </form>
    </Card>
  );
}

export default ForgotPassword;
