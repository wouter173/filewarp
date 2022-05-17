import { Popover } from "@headlessui/react";
import { DocumentTextIcon, DownloadIcon, FolderDownloadIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { usePopper } from "react-popper";
import { useSelector } from "react-redux";
import { Store } from "../../State/Store";
import Loader from "../Loader";
import Spinner from "../Spinner";

export default function ReceivedFileDisplay() {
  const filePartList = useSelector((state: Store) => state.receivedFileParts);

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
        <div className="mt-4 bg-slate-100 p-2 shadow rounded-md text-black">
          {filePartList.length > 0 ? (
            <ul>
              {filePartList.map((filepart) => (
                <li key={filepart.label} className=" border-slate-200 last:border-transparent">
                  <a
                    className="flex items-center w-80 my-1 p-1 rounded-md hover:bg-white transition-colors"
                    href={window.URL.createObjectURL(filepart.file || new Blob())}
                    download={filepart.metadata.name}
                  >
                    <DocumentTextIcon className="flex-shrink-0 block h-5 w-5 text-indigo-400 mr-1 ml-1" />
                    <p className="overflow-hidden overflow-ellipsis whitespace-nowrap mr-4">{filepart.metadata.name}</p>
                    <div className="flex-shrink-0 block rounded-md w-8 h-8 p-[6px] bg-white ml-auto">
                      {filepart.file ? (
                        <DownloadIcon className="text-indigo-500" />
                      ) : (
                        <Loader
                          bgClassList="fill-transparent stroke-slate-300"
                          fgClassList="fill-transparent stroke-indigo-600"
                          value={filepart.buffers.reduce((a, c) => a + c.byteLength, 0)}
                          max={filepart.metadata.size}
                          strokeWidth={4}
                        />
                      )}
                    </div>
                  </a>
                  <hr className="border-b border-inherit" />
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-slate-900 p-2">You have not received any files yet!</div>
          )}
        </div>
      </Popover.Panel>
    </Popover>
  );
}
