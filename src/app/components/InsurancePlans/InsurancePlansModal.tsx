import { type Form, useInsuranceForm } from "api";
import { Modal } from "components";
import { useModal } from "models";
import { useMemo } from "react";
import { InsurancePlansForm } from "./InsurancePlansForm";

const InsurancePlansModal = () => {
  const { data: plans } = useInsuranceForm();
  const { isOpen, activeFormId, close } = useModal();

  const form = useMemo<Form | undefined>(
    () => plans?.find(({ formId }) => formId === activeFormId),
    [plans, activeFormId]
  );

  if (!form?.title || !form.fields) return null;

  return (
    <Modal {...{ isOpen, title: form.title, onClose: close }}>
      <InsurancePlansForm form={form} />
    </Modal>
  );
};

export { InsurancePlansModal };
