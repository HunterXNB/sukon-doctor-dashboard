import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-uploader";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import { useFormContext } from "react-hook-form";

import { DropzoneOptions } from "react-dropzone";
import { RegisterFormValues } from "@/schemas/register";
import { useTranslations } from "next-intl";
const dropzone = {
  multiple: true,
  maxFiles: 5,
} satisfies DropzoneOptions;
const FileSvgDraw = () => {
  const t = useTranslations("registerPage.form.step5.certificates");

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="37"
        height="36"
        viewBox="0 0 37 36"
        fill="none"
      >
        <path
          d="M4.36971 28.515L4.33971 28.545C3.93471 27.66 3.67971 26.655 3.57471 25.545C3.67971 26.64 3.96471 27.63 4.36971 28.515Z"
          fill="#55556D"
        />
        <path
          d="M14.0002 15.57C15.9719 15.57 17.5701 13.9716 17.5701 12C17.5701 10.0283 15.9719 8.43 14.0002 8.43C12.0285 8.43 10.4302 10.0283 10.4302 12C10.4302 13.9716 12.0285 15.57 14.0002 15.57Z"
          fill="#55556D"
        />
        <path
          d="M24.785 3H12.215C6.755 3 3.5 6.255 3.5 11.715V24.285C3.5 25.92 3.785 27.345 4.34 28.545C5.63 31.395 8.39 33 12.215 33H24.785C30.245 33 33.5 29.745 33.5 24.285V20.85V11.715C33.5 6.255 30.245 3 24.785 3ZM31.055 18.75C29.885 17.745 27.995 17.745 26.825 18.75L20.585 24.105C19.415 25.11 17.525 25.11 16.355 24.105L15.845 23.685C14.78 22.755 13.085 22.665 11.885 23.475L6.275 27.24C5.945 26.4 5.75 25.425 5.75 24.285V11.715C5.75 7.485 7.985 5.25 12.215 5.25H24.785C29.015 5.25 31.25 7.485 31.25 11.715V18.915L31.055 18.75Z"
          fill="#55556D"
        />
      </svg>
      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
        {t("placeholder")}
      </p>
    </>
  );
};
function CertificatesInput() {
  const form = useFormContext<RegisterFormValues>();
  const t = useTranslations("registerPage.form.step5.certificates");

  return (
    <div className="flex *:flex-1 justify-between gap-[25px]">
      <FormField
        control={form.control}
        name="certificates"
        translation="registerPage.form.errors"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="after:text-destructive text-sm after:content-['*']">
              {t("label")}
            </FormLabel>
            <FileUploader
              value={field.value}
              onValueChange={field.onChange}
              dropzoneOptions={dropzone}
              reSelect={true}
            >
              <FileInput>
                <div className="flex border border-dashed border-[#D1D1DB] rounded-[8px] items-center justify-center flex-col gap-2 py-6 w-full">
                  <FileSvgDraw />
                </div>
              </FileInput>
              {field.value && (
                <FileUploaderContent className="p-2 w-full -ml-3 rounded-b-none rounded-t-md flex-row gap-2 ">
                  {field.value.map((file, i) => (
                    <FileUploaderItem
                      key={i}
                      index={0}
                      aria-roledescription={`file ${1} containing ${file.name}`}
                      className="pr-7"
                    >
                      {file.name}
                    </FileUploaderItem>
                  ))}
                </FileUploaderContent>
              )}
            </FileUploader>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export default CertificatesInput;
