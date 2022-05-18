import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInformationDialog } from "../../State/DialogSlice";
import { Store } from "../../State/Store";

export default function InformationDialog() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: Store) => state.dialogs.informationDialog.open);

  const handleClose = () => {
    dispatch(setInformationDialog(false));
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        onClose={handleClose}
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
              Peer Disconnected.
            </Dialog.Title>
            <p className="block text-xs truncate my-6">you are now able to open another warp.</p>
            <div className="flex w-full text-sm font-bold gap-2">
              <button onClick={handleClose} className="block bg-indigo-500 px-3 py-2 rounded-md text-white w-full">
                Ok
              </button>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
