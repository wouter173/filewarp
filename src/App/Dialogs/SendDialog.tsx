import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { setSendDialog } from "../../State/DialogSlice";
import { IdentityPair, setPeerID } from "../../State/IdentitySlice";
import webSocket from "../../Contexts/WebSocket";
import webRTC from "../../Contexts/WebRTC";
import OtpInput from "react-otp-input";

export default function SendDialog() {
  const dispatch = useDispatch();

  const isOpen = useSelector((state: { dialogs: { sendDialog: boolean } }) => state.dialogs.sendDialog);
  const fileCount = useSelector((state: { files: File[] }) => state.files.length);
  const recipientID = useSelector((state: { identity: IdentityPair }) => state.identity.peer.ID);

  const setIsOpen = (payload: boolean) => dispatch(setSendDialog(payload));

  const handleSend = async () => {
    const data = await webRTC.createOffer();
    webSocket.sendMessage(data);
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        onClose={() => setIsOpen(false)}
        className="z-30 fixed flex items-center justify-center inset-0 overflow-y-auto h-screen w-screen"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-20"
          leave="ease-in duration-200"
          leaveFrom="opacity-20"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="bg-black opacity-20 fixed inset-0 cursor-pointer" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <div className="fixed bg-white w-min h-min p-8 rounded-lg">
            <Dialog.Title as="h1" className="text-2xl font-semibold">
              Warp Files
            </Dialog.Title>
            <Dialog.Description as="p" className="text-sm">
              {fileCount} files
            </Dialog.Description>

            {/*TODO: add questionmark bc its vague*/}
            <label className="font-bold block col-start-2 mt-8 mb-12">
              Recipient ID
              <OtpInput
                onChange={(value: string) => dispatch(setPeerID(value))}
                value={recipientID}
                isInputNum
                numInputs={6}
                placeholder="123456"
                containerStyle="grid justify-center mt-2"
                inputStyle="text-center block w-full h-full bg-transparent focus:outline-none"
                className="flex justify-center w-8 h-8 mr-2 bg-slate-100 ring-2 rounded-md ring-indigo-200 focus-within:ring-indigo-500 active:ring-indigo-500"
              />
            </label>

            <div className="flex gap-2 text-white">
              <button
                onClick={() => {
                  handleSend();
                }}
                className="w-full text-sm font-semibold p-2 rounded-md transition-colors bg-indigo-500 hover:bg-indigo-600 focusable"
              >
                Warp!
              </button>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
