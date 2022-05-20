import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDialogMessage, setDialogOpen } from "../State/DialogSlice";
import { Store } from "../State/Store";

export default function NextButton() {
  const dispatch = useDispatch();

  const localFileCount = useSelector((store: Store) => store.localFiles.length);
  const connectionState = useSelector((store: Store) => store.connection.connectionState);

  const onClickHandler = () => {
    if (localFileCount == 0) {
      const informationData = {
        title: "No file to be sent!",
        body: "You must input at least 1 file before you are able to send files to someone.",
      };

      dispatch(setDialogMessage({ dialog: "informationDialog", data: informationData }));
      dispatch(setDialogOpen({ dialog: "informationDialog", open: true }));
      return;
    }

    if (connectionState != "disconnected") {
      const informationData = {
        title: "Already connected!",
        body: "You are already connected, finish the current filewarp before starting a new one.",
      };

      dispatch(setDialogMessage({ dialog: "informationDialog", data: informationData }));
      dispatch(setDialogOpen({ dialog: "informationDialog", open: true }));
      return;
    }

    dispatch(setDialogOpen({ dialog: "sendDialog", open: true }));
  };

  return (
    <button
      onClick={onClickHandler}
      className="min-w-[500px] w-full py-3 px-32 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold rounded-lg transition-colors focusable"
    >
      Next
    </button>
  );
}
