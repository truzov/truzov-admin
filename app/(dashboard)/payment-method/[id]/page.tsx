import PaymentMethodForm from "@/components/payment-method/payment-method-form";

export default function EditPaymentMethodPage() {
  // In a real app, fetch data based on params.id
  const dummyData = {
    methodName: "Payment",
    bodyText:
      "Delivery usually takes 2-5 business days, depending on your location and...",
    status: "Active",
  };

  return <PaymentMethodForm isEdit initialData={dummyData} />;
}
