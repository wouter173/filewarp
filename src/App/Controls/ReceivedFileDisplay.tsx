import { Popover } from "@headlessui/react";
import { DownloadIcon, FolderDownloadIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { usePopper } from "react-popper";
import { useSelector } from "react-redux";
import { Store } from "../../State/Store";

export default function ReceivedFileDisplay() {
  const receivedFiles = useSelector((state: Store) => state.files.receivedFiles);

  const [referenceEl, setReferenceEl] = useState<HTMLElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const [arrowRef, setArrowRef] = useState<HTMLElement | null>(null);

  const { styles, attributes } = usePopper(referenceEl, popperElement, {
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
        className="h-10 w-10 text-indigo-500 bg-slate-100 p-2 rounded-md hover:bg-slate-200 transition-colors focusable"
        ref={setReferenceEl}
      >
        <FolderDownloadIcon />
      </Popover.Button>
      <Popover.Panel ref={setPopperElement} className="absolute z-20" style={styles.popper} {...attributes.popper}>
        <div
          ref={setArrowRef}
          style={styles.arrow}
          className="absolute block w-4 h-4 border-8 border-transparent border-b-slate-100"
        />
        <div className="mt-4 bg-slate-100 p-4 shadow rounded-md text-black">
          <ul>
            {receivedFiles.map((file) => (
              <li className="flex items-center">
                <p className="mr-2">{file.name}</p>
                <a href={window.URL.createObjectURL(file)} download={file.name}>
                  <DownloadIcon className="w-5 h-5 text-indigo-500" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Popover.Panel>
    </Popover>
  );
}
