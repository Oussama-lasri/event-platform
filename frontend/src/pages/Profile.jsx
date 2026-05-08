import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Button, Card, Input } from "../components/ui";
import { useAuth } from "../hooks/useAuth";
import { getApiErrorMessage } from "../services/http";
import { userService } from "../services/userService";

function Profile() {
  const { user, refreshProfile } = useAuth();
  const [apiCapabilities, setApiCapabilities] = useState({ updateProfile: true, changePassword: true });
  const { register, handleSubmit, reset } = useForm();
  const passwordForm = useForm();

  useEffect(() => {
    if (user) reset({ name: user.name, email: user.email });
  }, [user, reset]);

  const onUpdateProfile = async (values) => {
    try {
      await userService.updateProfile(values);
      await refreshProfile();
      toast.success("Profile updated");
    } catch (error) {
      if (error.response?.status === 404 || error.response?.status === 405) {
        setApiCapabilities((prev) => ({ ...prev, updateProfile: false }));
      }
      toast.error(getApiErrorMessage(error, "Profile update endpoint not available"));
    }
  };

  const onChangePassword = async (values) => {
    try {
      await userService.changePassword(values);
      toast.success("Password changed");
      passwordForm.reset();
    } catch (error) {
      if (error.response?.status === 404 || error.response?.status === 405) {
        setApiCapabilities((prev) => ({ ...prev, changePassword: false }));
      }
      toast.error(getApiErrorMessage(error, "Change password endpoint not available"));
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <h1 className="mb-3 text-xl font-semibold text-slate-900">View / update profile</h1>
        {!apiCapabilities.updateProfile && (
          <p className="mb-3 rounded-lg bg-amber-50 p-2 text-sm text-amber-800">Backend currently exposes only `GET /users/profile`.</p>
        )}
        <form className="space-y-3" onSubmit={handleSubmit(onUpdateProfile)}>
          <Input {...register("name")} />
          <Input {...register("email")} />
          <Button disabled={!apiCapabilities.updateProfile}>Save profile</Button>
        </form>
      </Card>
      <Card>
        <h2 className="mb-3 text-xl font-semibold text-slate-900">Change password</h2>
        {!apiCapabilities.changePassword && (
          <p className="mb-3 rounded-lg bg-amber-50 p-2 text-sm text-amber-800">No change password route found in backend.</p>
        )}
        <form className="space-y-3" onSubmit={passwordForm.handleSubmit(onChangePassword)}>
          <Input type="password" placeholder="Current password" {...passwordForm.register("currentPassword")} />
          <Input type="password" placeholder="New password" {...passwordForm.register("newPassword")} />
          <Button disabled={!apiCapabilities.changePassword}>Update password</Button>
        </form>
      </Card>
    </div>
  );
}

export default Profile;
