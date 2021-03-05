import { useState } from "react";

export default function useTextField(init: string): [string, (t: string) => void] {
  const [field, setField] = useState(init);
  const handler = (text: string) => setField(text);
  return [field, handler];
}
