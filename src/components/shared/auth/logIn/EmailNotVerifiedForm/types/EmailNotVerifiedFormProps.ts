/**
 * Props for EmailNotVerifiedForm component
 */
export interface EmailNotVerifiedFormProps {
  email: string;
  errors: Record<string, string>;
  isLoading: boolean;
  action: (payload: FormData) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleChange: () => void;
}