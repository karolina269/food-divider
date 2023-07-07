import { useState } from "react";

const useFormData = (initState) => {
  const [formData, setFormData] = useState(initState);

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
