
export const extractFormData = (formFields, formValues) => {
  for(let field in formFields){
    formFields[field] = formValues.get(field)
  }
  return formFields
}