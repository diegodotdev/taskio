import { createClient } from "@supabase/supabase-js";
import { toast } from "sonner";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || "",
  import.meta.env.VITE_SUPABASE_SERVICE_ROLE || ""
);

export const fetchTasks = async (user_id: string | undefined) => {
  const { data, error }: any = await supabase
    .from("task")
    .select("*")
    .eq("user_id", user_id)
    .order("id", { ascending: true });

  if (error) {
    toast.error(error?.message);
    return null;
  } else {
    return data;
  }
};

export const fetchTask = async (id: any) => {
  const { data, error }: any = await supabase
    .from("task")
    .select("*")
    .eq("id", id);

  if (error) {
    toast.error(error?.message);
    return null;
  } else {
    return data;
  }
};
