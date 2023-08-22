export const handleOpenDialogTest = (setOpen) => {
  setOpen(true);
};

export const handleCloseDialogTest = (resetForm, setOpen) => {
  resetForm();
  setOpen(false);
};

export const handleInputChangeTest = (event, formData, setFormData) => {
  const { name, value } = event.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};
