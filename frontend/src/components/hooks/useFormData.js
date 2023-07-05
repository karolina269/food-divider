import { useState } from "react";

const useFormData = (initialFormData) => {
  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const target = e.target;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: target.value,
    });
  };

  return { formData, handleInputChange };
};

export default useFormData;
