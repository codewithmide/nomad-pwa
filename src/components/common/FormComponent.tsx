import { useRef, useState } from 'react';
import classnames from '../../utils/utils';
import uploadIcon from '../../assets/icons/uploadIcon.svg';
import closeIcon from '../../assets/icons/closeIcon.svg';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = ({
  className,
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
}: InputProps) => {
  return (
    <div className={classnames('flex w-full flex-col gap-1', className)}>
      {label && (
        <small className='font-medium text-sm text-gray-400'>{label}</small>
      )}

      <div className='input-wrapper flex items-center rounded border-2 border-gray-800 bg-black outline-none focus:outline-none'>
        <input
          type={type}
          id={label}
          className='w-full bg-black p-3 text-sm focus:bg-none focus:outline-none'
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
        />
      </div>
    </div>
  );
};

export const FileUpload = ({
  image,
  handleFileChange,
  classname,
  imageClassname = 'rounded-md',
}: any) => {
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
      fileInputRef.current.value = '';
    }
    setImagePreview(null);
    handleFileChange(null);
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  return (
    <div className={classnames('w-full', classname)}>
      <input
        type='file'
        id='fileUpload'
        className=''
        onChange={onFileChange}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />

      {!imagePreview && !image ? (
        <div
          className='border-outline flex cursor-pointer items-center justify-center rounded-md border bg-black p-2 text-center'
          onClick={handleClick}
        >
          <img src={uploadIcon} alt='' />
          <p className='text-gray-400'>Click to upload picture</p>
        </div>
      ) : (
        <div className='flex flex-col items-start justify-start'>
          <img
            src={imagePreview ? URL.createObjectURL(imagePreview) : image}
            alt='Selected'
            className={classnames(
              'h-[7rem] w-full object-cover',
              imageClassname
            )}
            onClick={handleClick}
          />
          <span
            className='mt-2 flex w-auto gap-2 bg-[#B2B3B533] p-2'
            onClick={clear}
          >
            <p className='font-light'>
              {imagePreview ? imagePreview.name : 'file.png'}
            </p>
            <img src={closeIcon} alt='' />
          </span>
        </div>
      )}
    </div>
  );
};
