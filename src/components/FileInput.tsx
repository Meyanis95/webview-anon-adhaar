import { FunctionComponent, ChangeEvent, useState } from "react";

interface FileInputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  id: string;
}

export const FileInput: FunctionComponent<FileInputProps> = ({
  onChange,
  id,
}) => {
  const [fileName, setFileName] = useState<string>("No file selected");
  return (
    <div className="w-full flex items-center text-[17px] overflow-hidden whitespace-nowrap text-ellipsis rounded-md border border-gray-300 text-md text-gray-700 bg-white cursor-pointer mt-2">
      <label
        htmlFor={id}
        className="bg-blue-600 text-white text-[17px] px-2 py-1 font-sans cursor-pointer"
      >
        Choose file
      </label>
      <input
        type="file"
        id={id}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (!e.target.files) return;
          setFileName(e.target.files[0].name);
          onChange(e);
        }}
        className="hidden"
      />
      <span className="ml-2 text-[17px]">{fileName}</span>
    </div>
  );
};
