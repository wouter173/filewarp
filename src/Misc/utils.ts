import { DialogBody, setDialogMessage, setDialogOpen } from "../State/DialogSlice";
import { resetPeer } from "../State/IdentitySlice";
import store from "../State/Store";

export const GenID = () => (Math.random() + 1).toString(36).substring(4);

export const informSuccess = () => {
  const data: DialogBody = {
    title: "Successfully warped files!",
    body: "you are now able to connect to someone else.",
  };

  store.dispatch(setDialogMessage({ dialog: "informationDialog", data }));
  store.dispatch(setDialogOpen({ dialog: "informationDialog", open: true }));
  store.dispatch(resetPeer());
};

export const informFailure = () => {
  const informationData = {
    title: "Peer Disconnected.",
    body: "you are now able to open another warp.",
  };

  store.dispatch(setDialogMessage({ dialog: "informationDialog", data: informationData }));
  store.dispatch(setDialogOpen({ dialog: "informationDialog", open: true }));
};
