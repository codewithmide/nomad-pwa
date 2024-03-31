import { useRef, useState } from "react";
import classnames from "../../utils/utils";
import uploadIcon from "../../assets/icons/uploadIcon.svg"
import closeIcon from "../../assets/icons/closeIcon.svg"

interface InputProps {
  onChange: (e: any) => void;
  classname?: string;
  label?: string;
  name?: string;
  value?: any;
  placeholder?: string;
  type?: string;
}

export const Input = ({
  classname,
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}: InputProps) => {
  return (
    <div className={classnames("flex flex-col gap-1 w-full", classname)}>
      {label && (
        <small className="font-medium text-sm text-gray-400">{label}</small>
      )}

      <div className="flex items-center input-wrapper outline-none border-2 border-gray-800 focus:outline-none bg-black rounded">
        <input
          type={type}
          id={label}
          className="focus:outline-none focus:bg-none p-3 text-sm bg-black w-full"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
        />
      </div>
    </div>
  );
};

export const FileUpload = ({ image, handleFileChange, classname, imageClassname = 'rounded-md' }: any) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [imagePreview, setImagePreview] = useState<any>(null);

  const onFileChange = (e: any) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
          setImagePreview(selectedFile);
          handleFileChange(selectedFile);
      } else {
          clear();
      }
  };

  const clear = () => {
      if (fileInputRef.current) {
          fileInputRef.current.value = "";
      }
      setImagePreview(null);
      handleFileChange(null);
  };

  const handleClick = () => {
      if (fileInputRef.current) {
          fileInputRef.current.value = "";
          fileInputRef.current.click();
      }
  };

  return (
      <div className={classnames("w-full", classname)}>
          <input
              type="file"
              id="fileUpload"
              className=""
              onChange={onFileChange}
              style={{ display: "none" }}
              ref={fileInputRef}
          />

          {!imagePreview && !image ? (
              <div
                  className="bg-black cursor-pointer flex items-center rounded-md border-outline border p-2 text-center justify-center"
                  onClick={handleClick}
              >
                  <img src={uploadIcon} alt="" />
                  <p className="text-gray-400">Click to upload picture</p>
              </div>
          ) : (
              <div className="flex flex-col justify-start items-start">
                  <img
                      src={imagePreview ? URL.createObjectURL(imagePreview) : image}
                      alt="Selected"
                      className={classnames("object-cover w-full h-[7rem]", imageClassname)}
                      onClick={handleClick}
                  />
                  <span
                      className="p-2 flex gap-2 mt-2 bg-[#B2B3B533] w-auto"
                      onClick={clear}>
                      <p className="font-light">{imagePreview ? imagePreview.name : "file.png"}</p>
                      <img src={closeIcon} alt="" />
                  </span>
              </div>
          )}
      </div>
  );
};

