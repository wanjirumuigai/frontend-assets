"use client"
import NewLicenseForm from "@/components/NewLicenseForm";
import { useState } from "react";

export default function NewLicense() {
  const today = new Date().toISOString().split("T")[0];

  // Handle the new license details
  const [licenseForm, setLicenseForm] = useState({
    license_name: "",
    purchase_date: "",
    expiry_date: "",
    number_of_users: 1,
  });

  function handleChange(e) {
    setLicenseForm({
      ...licenseForm,
      [e.target.name]: e.target.value,
    });
  }

  function onSubmitForm(e) {
    // e.preventDefault()
    fetch("http://localhost:4000/licenses", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(licenseForm),
    }).catch((e) => console.log(e));

    setLicenseForm({
      license_name: "",
      purchase_date: "",
      expiry_date: "",
      number_of_users: 1,
    });
  }

  return (
    <NewLicenseForm
      formData={licenseForm}
      handleChange={handleChange}
      handleSubmit={onSubmitForm}
      today={today}
    />
  );
}
