import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import { Dialog } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { setSendDialog } from "../State/DialogSlice";
import OtpInput from "react-otp-input";

export default function SendDialog() {
  const [recipientID, setRecipientID] = useState("");
  const dispatch = useDispatch();

  const isOpen = useSelector((state: { dialogs: { sendDialog: boolean } }) => {
    return state.dialogs.sendDialog;
  });

  const fileCount = useSelector((state: { files: File[] }) => {
    return state.files.length;
  });

  const setIsOpen = (payload: boolean) => dispatch(setSendDialog(payload));

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="fixed flex items-center justify-center inset-0 overflow-y-auto h-screen w-screen"
    >
      <Dialog.Overlay className="bg-black opacity-20 fixed inset-0 cursor-pointer" />

      <div className="fixed bg-white w-min h-min p-8 rounded-lg">
        <Dialog.Title as="h1" className="text-2xl font-semibold">
          Warp Files
        </Dialog.Title>
        <Dialog.Description as="p" className="text-sm">
          {fileCount} files
        </Dialog.Description>

        <form className="my-8">
          <label htmlFor="nickname" className="font-bold block">
            Nickname
          </label>
          <input
            id="nickname"
            type="text"
            className="bg-slate-100 py-1 px-2 my-2 ring-2 rounded-md ring-indigo-200 focus:ring-indigo-500 focus:outline-none active:ring-indigo-500"
          />

          <label className="font-bold block">Recipient ID</label>
          <OtpInput
            onChange={(value: string) => setRecipientID(value)}
            value={recipientID}
            isInputNum
            numInputs={6}
            placeholder="123456"
            containerStyle="grid justify-center mt-2"
            inputStyle="text-center block w-full h-full bg-transparent focus:outline-none"
            className="flex justify-center w-8 h-8 mr-2 bg-slate-100 ring-2 rounded-md ring-indigo-200 focus-within:ring-indigo-500 active:ring-indigo-500"
          />
        </form>

        <div className="flex gap-2 text-white">
          <button className="w-full p-2 rounded-md bg-indigo-500 focus:ring-[3px] focus:ring-offset-2 focus:ring-indigo-500 focus:outline-none hover:bg-indigo-600 transition-colors">
            Warp!
          </button>
        </div>
      </div>
    </Dialog>
  );
}
