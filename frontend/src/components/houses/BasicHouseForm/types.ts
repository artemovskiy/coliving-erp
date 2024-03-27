export interface BasicHouseFormData {
  name: string;
}

export const emptyFormData = (): BasicHouseFormData => ({
  name: '',
});
