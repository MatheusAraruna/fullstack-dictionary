import { useEffect, useState } from "react";

interface UseParamsProps {
    searchParams: URLSearchParams
    setSearchParams: (params: URLSearchParams) => void
    paramName: string
    type?: "string" | "array"
    initialValue: string | string[]
}

export function useParams<T extends string | string[]>({
  searchParams,
  setSearchParams,
  paramName,
  type = "string",
  initialValue,
}: UseParamsProps) {
  const getValueFromParams = () => {
    if (type === "array") {
      const values = searchParams.getAll(paramName);
      return values.length > 0 ? values : (initialValue as string[]);
    } else {
      const value = searchParams.get(paramName);
      return value !== null ? value : (initialValue as string);
    }
  };

  const [value, setValue] = useState<T>(() => getValueFromParams() as T);

  useEffect(() => {
    setValue(getValueFromParams() as T);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString()]);

  const updateValue = (newValue: T) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (type === "array") {
      newParams.delete(paramName);
      (newValue as string[]).forEach((v) => newParams.append(paramName, v));
    } else {
      if (newValue) {
        newParams.set(paramName, newValue as string);
      } else {
        newParams.delete(paramName);
      }
    }
    setSearchParams(newParams);
  };

  return [value, updateValue] as const;
}