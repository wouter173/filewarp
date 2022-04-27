import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { setReceiveDialog } from "../State/DialogSlice";

export default function ReceiveDialog() {
  const dispatch = useDispatch();

  const isOpen = useSelector((state: { dialogs: { receiveDialog: boolean } }) => {
    return state.dialogs.receiveDialog;
  });

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        onClose={() => dispatch(setReceiveDialog(false))}
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
          <Dialog.Overlay className="fixed bg-black opacity-20 inset-0 cursor-pointer" />
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
          <div className="fixed bg-white w-auto h-min p-8 rounded-lg">
            <Dialog.Title as="h1" className="text-2xl font-semibold">
              Receive Files
            </Dialog.Title>
            <div className="mt-4 mb-8 w-full">
              <h2 className="text-lg">
                <b>Wouter@456996</b> wants to warp you <b>12 files</b>.
              </h2>
              {/* <div className="text-gray-600 my-2">
                <p>id: 456996</p>
                <p>nickname: Wouter</p>
                <p>files: 12</p>
              </div> */}
              <p className="inline text-sm w-1/2 ">
                check if the id and nickname are the same as the senders information!
              </p>
            </div>
            <div className="flex w-full text-sm font-bold gap-2">
              <button className="block bg-gray-600 px-3 py-2 rounded-md text-white w-1/3">Ignore</button>
              <button className="block bg-indigo-500 px-3 py-2 rounded-md text-white w-full">Accept</button>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
