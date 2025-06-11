interface IApiRes {
  message: string;
  success: boolean;
}

export interface IJsonSchema {
  title: string;
  type: string;
  properties: {
    [key: string]: {
      type: string;
      title: string;
      enum?: string[];
    };
  };
  required?: string[];
}

export interface IIdentityForm {
  formId: string;
  formValue: string;
}

export interface IFormBody {
  formId: string;
  role: string;
  batchId?: string;
  formSchema: string;
}

export interface ISubmitStudentProps {
  identity: {
    name: string;
    batch: string;
    rollNo: string;
  };
  keyInfo: { batchId: string; formName: string };
  data: { [key: string]: any };
}

export interface ISubmitOtherProps {
  identity: { name: string };
  keyInfo: { formName: string };
  data: { [key: string]: any };
}

export interface IFormBodyQuery {
  ttlInSec: string;
}

export interface ICreateFormRes extends IApiRes {
  formKey: string;
}

export interface IFormTitlesRes extends IApiRes {
  formTitles: string[];
}

export interface IIdentiryFormsRes extends IApiRes {
  forms: IIdentityForm[];
}

interface ISetFormValue {
  [key: string]: string | { [key: string]: any };
  data: { [key: string]: any };
}

export interface ISubmittedFormDataRes extends IApiRes {
  formData: ISetFormValue[];
}
