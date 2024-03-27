export interface ResidentBasicFormData {
  firstName: string;
  birthDate: Date;
}

export const useEmptyData = (): ResidentBasicFormData => {
  const birthday = new Date();
  birthday.setFullYear(birthday.getFullYear() - 25);
  return {
    firstName: '',
    birthDate: birthday,
  };
};
