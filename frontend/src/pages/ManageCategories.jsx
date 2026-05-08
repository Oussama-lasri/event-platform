import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button, Card, Input } from "../components/ui";
import { categoryService } from "../services/categoryService";
import { getApiErrorMessage } from "../services/http";

function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  const loadCategories = async () => {
    const categoriesData = await categoryService.getCategories();
    setCategories(categoriesData);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadCategories().catch((error) => toast.error(getApiErrorMessage(error, "Failed to load categories")));
  }, []);

  const onSubmit = async (values) => {
    try {
      await categoryService.createCategory(values);
      toast.success("Category added");
      reset();
      await loadCategories();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to add category"));
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <h1 className="mb-3 text-xl font-semibold text-slate-900">Manage Categories</h1>
        <form className="grid gap-3 md:grid-cols-[1fr_auto]" onSubmit={handleSubmit(onSubmit)}>
          <Input placeholder="Category name" {...register("name", { required: true })} />
          <Button type="submit">Add category</Button>
        </form>
      </Card>

      <Card>
        <h2 className="mb-3 text-lg font-semibold text-slate-900">Category list</h2>
        <div className="grid gap-2">
          {categories.map((category) => (
            <div key={category._id} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
              {category.name}
            </div>
          ))}
          {!categories.length && <p className="text-sm text-slate-500">No categories available.</p>}
        </div>
      </Card>
    </div>
  );
}

export default ManageCategories;
