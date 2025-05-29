export type ServiceResponseDTO<T> = {
  data: T;
  success: boolean;
  error?: string;
  timeStamp: Date;
};
