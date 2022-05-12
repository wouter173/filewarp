import { Popover } from "@headlessui/react";
import { ClipboardCheckIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { usePopper } from "react-popper";
import { useSelector } from "react-redux";
import { Store } from "../../State/Store";

export default function IDDisplay() {
  const id = useSelector((state: Store) => state.identity.local.ID);

  const [referenceEl, setReferenceEl] = useState<HTMLElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const [arrowRef, setArrowRef] = useState<HTMLElement | null>(null);

  const { styles, attributes } = usePopper(referenceEl, popperElement, {
    placement: "top",
    modifiers: [
      {
        name: "arrow",
        options: {
          element: arrowRef,
        },
      },
    ],
  });

  return (
    <Popover>
      <Popover.Button
        ref={setReferenceEl}
        onClick={() => navigator.clipboard.writeText(id)}
        className="flex items-center bg-slate-100 px-3 py-2 rounded-md hover:bg-slate-200 transition-colors focusable"
      >
        <p className="flex min-w-[80px]">
          <span className="font-semibold mr-1">ID: </span>
          <span>{id ? id : "******"}</span>
        </p>
      </Popover.Button>
      <Popover.Panel ref={setPopperElement} className="absolute z-20" style={styles.popper} {...attributes.popper}>
        {({ close }) => (
          <div onClick={() => close()} className="cursor-pointer">
            <div
              ref={setArrowRef}
              style={styles.arrow}
              className="absolute block w-4 h-4 border-8 border-transparent border-t-slate-100 bottom-0"
            />
            <div className="my-4 bg-slate-100 p-3 shadow rounded-md flex items-center">
              <p className="text-black font-semibold">ID Copied</p>
              <ClipboardCheckIcon className="h-5 w-5 text-indigo-500" />
            </div>
          </div>
        )}
      </Popover.Panel>
    </Popover>
  );
}
