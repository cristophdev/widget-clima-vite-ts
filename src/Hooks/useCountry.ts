import { ChangeEventHandler, useState } from "react";

function useCountry() {
  const [country, setCountry] = useState('');

  const handleCountry: ChangeEventHandler<HTMLInputElement> = (e) => {
    setCountry(e.target.value);
  };

  return { country, setCountry, handleCountry }
}

export default useCountry