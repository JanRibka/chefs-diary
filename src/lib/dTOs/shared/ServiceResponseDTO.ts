export type ServiceResponseDTO<T> = {
  data: T;
  success: boolean;
  errorMessage?: string;
  timeStamp: Date;
};
