import React, { FunctionComponent, Dispatch, SetStateAction } from "react";

interface PasswordInputProps {
  setPassword: Dispatch<SetStateAction<string>>;
  id: string;
}

export const PasswordInput: FunctionComponent<PasswordInputProps> = ({
  setPassword,
  id,
}) => {
  return (
    <input
      type="password"
      id={id}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
      }}
      className="w-full flex items-center border rounded-md border-gray-300 text-[17px] text-gray-700 bg-white cursor-text mt-2 p-1"
    />
  );
};
