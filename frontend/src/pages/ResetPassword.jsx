import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button, Card, Input } from "../components/ui";
import { authService } from "../services/authService";
import { getApiErrorMessage } from "../services/http";

function ResetPassword() {
  const { register, handleSubmit, formState } = useForm();

  const onSubmit = async (values) => {
    try {
      await authService.resetPassword(values);
      toast.success("Password reset successfully");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Endpoint not available in backend"));
    }
  };

  return (
    <Card className="mx-auto max-w-md">
      <h1 className="mb-3 text-2xl font-bold text-slate-900">Reset password</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <Input placeholder="Token" {...register("token")} />
        <Input type="password" placeholder="New password" {...register("password")} />
        <Button className="w-full" disabled={formState.isSubmitting}>
          Reset password
        </Button>
      </form>
    </Card>
  );
}

export default ResetPassword;
