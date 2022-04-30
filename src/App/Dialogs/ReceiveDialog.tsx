import React, { Fragment, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { setReceiveDialog } from "../../State/DialogSlice";
import { IdentityPair } from "../../State/IdentitySlice";
import connectionsContext from "../../Contexts";
import webRTCContext from "../../Contexts/WebRTC";
import webSocketContext from "../../Contexts/WebSocket";

export default function ReceiveDialog() {
  const dispatch = useDispatch();
  const [offer, setOffer] = useContext(connectionsContext).webRTC.offer!;
  const { createAccept } = useContext(webRTCContext)!;
  const { respondMessage } = useContext(webSocketContext)!;

  const identities = useSelector((state: { identity: IdentityPair }) => state.identity);
  const isOpen = useSelector((state: { dialogs: { receiveDialog: boolean } }) => {
    return state.dialogs.receiveDialog;
  });

  const handleAccept = async () => {
    console.log(offer);
    dispatch(setReceiveDialog(false));
    const accept = await createAccept();
    respondMessage(accept);
  };

  const handleIgnore = () => {
    dispatch(setReceiveDialog(false));
    setOffer(null);
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        onClose={handleIgnore}
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
          <div className="fixed bg-white w-auto h-min p-8 rounded-lg max-w-lg">
            <Dialog.Title as="h1" className="text-2xl font-semibold truncate">
              {identities.peer.nickname ? identities.peer.nickname + "@" : null}
              {identities.peer.ID}
            </Dialog.Title>
            <div className="mb-4 w-full">
              <h2 className="text-lg">
                wants to warp you
                <b> 12 files</b>.
              </h2>
            </div>
            <p className="block text-xs truncate mb-6">
              check if the id and nickname are <br />
              the same as the expected information!
            </p>
            <div className="flex w-full text-sm font-bold gap-2">
              <button onClick={handleIgnore} className="block bg-gray-600 px-3 py-2 rounded-md text-white w-1/2">
                Ignore
              </button>
              <button onClick={handleAccept} className="block bg-indigo-500 px-3 py-2 rounded-md text-white w-1/2">
                Accept
              </button>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
