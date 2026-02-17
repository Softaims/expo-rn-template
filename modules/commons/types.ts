import type { FieldConfig } from "@/modules/auth/types";
import type { ZodType } from "zod";

export interface PasswordFormProps {
  title: string;
  description: string;
  fields: FieldConfig[];
  schema: ZodType<any>;
  buttonText: string;
  onSubmit: (data: any) => Promise<void>;
  onBack: () => void;
  showIcon?: boolean;
  isLoading?: boolean;
}
