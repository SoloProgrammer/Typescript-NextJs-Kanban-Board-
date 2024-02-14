import React, { useState } from "react";
import { motion } from "framer-motion";
import { TextEditorPropsType } from "@/types/types";

const TextEditor = ({
  handleSubmit,
  handleClose,
  value = "",
  buttonCopy,
  classes = "",
  placeholder = "",
}: TextEditorPropsType) => {
  const [text, setText] = useState<string>(value);

  const handleBlur = (e: React.FocusEvent<HTMLFormElement>) => {
    // Only call handleClose if the relatedTarget (the element receiving focus) is not a child of the form
    // console.log(e.currentTarget, e.relatedTarget);

    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      handleClose();
    }
  };

  return (
    <motion.form
      tabIndex={1}
      onBlur={handleBlur}
      layout
      className="w-full mt-[7px]"
      onSubmit={(e) => {
        e.stopPropagation();
        e.preventDefault();
        handleSubmit(text);
      }}
    >
      <textarea
        className={`w-full h-full outline-none rounded-md p-4 border ${classes} text-neutral-5`}
        name="addcard"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onFocus={(e) => e.target.setSelectionRange(value.length, value.length)}
        placeholder={placeholder}
        id="addcard"
        autoFocus
        autoComplete="false"
        cols={30}
        rows={2}
      ></textarea>
      <div className="flex items-center gap-2 justify-end">
        <span
          onClick={handleClose}
          className="text-neutral-300 hover:text-neutral-100 cursor-pointer text-xs"
        >
          Close
        </span>
        <button className="bg-white hover:bg-slate-200 text-black text-xs px-2 py-1 rounded-sm">
          {buttonCopy}
        </button>
      </div>
    </motion.form>
  );
};

export default TextEditor;
