import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import WebRTC from "../../Misc/WebRTC";
import { setDialogOpen } from "../../State/DialogSlice";
import { setPeerID, setPeerNickname } from "../../State/IdentitySlice";
import { Store } from "../../State/Store";

export default function ConfirmDialog() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: Store) => state.dialogs.confirmationDialog.open);

  const handleConfirm = () => {
    dispatch(setDialogOpen({ dialog: "confirmationDialog", open: false }));
    dispatch(setPeerNickname(""));
    dispatch(setPeerID(""));
    WebRTC.close();
  };

  const handleCancel = () => {
    dispatch(setDialogOpen({ dialog: "sendDialog", open: true }));
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        onClose={handleCancel}
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
          <div className="fixed bg-white w-auto h-min p-8 rounded-lg max-w-sm">
            <Dialog.Title as="h1" className="text-2xl font-semibold flex-wrap">
              Are you sure you want to stop the filewarp?
            </Dialog.Title>
            <p className="block text-xs truncate my-6">
              the connection will be broken, <br />
              and all in transfer files will be canceled
            </p>
            <div className="flex w-full text-sm font-bold gap-2">
              <button onClick={handleCancel} className="block bg-gray-600 px-3 py-2 rounded-md text-white w-1/2">
                No
              </button>
              <button onClick={handleConfirm} className="block bg-indigo-500 px-3 py-2 rounded-md text-white w-1/2">
                Yes
              </button>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
