export type ValidatorFn<T> = (value: T) => string | undefined;

export type Validators<T> = {
  [K in keyof T]?: ValidatorFn<T[K]>;
};

export type Errors<T> = Partial<Record<keyof T, string>>;

export type Schema<T> = Record<keyof T, ValidatorFn<T[keyof T]>>;

export type ResponseData = {
  message: string;
  status: number;
};

export type UseFormReturnType<T> = {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  isSubmitting: boolean;
  handleChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  handleSubmit: (
    callback: (values: T) => void,
  ) => (event: React.FormEvent) => void;
  handleReset: () => void;
};
