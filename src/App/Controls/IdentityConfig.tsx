import React, { ChangeEvent, useState } from "react";
import { Popover } from "@headlessui/react";
import { UserIcon } from "@heroicons/react/solid";
import { usePopper } from "react-popper";
import { useDispatch, useSelector } from "react-redux";
import { Identity, setNickName } from "../../State/IdentitySlice";

export default function IdentityConfig() {
  const dispatch = useDispatch();
  const nickname = useSelector((state: { identity: Identity }) => state.identity.nickname);

  const [referenceEl, setReferenceEl] = useState<HTMLElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const [arrowRef, setArrowRef] = useState<HTMLElement | null>(null);

  let { styles, attributes } = usePopper(referenceEl, popperElement, {
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
        className="h-10 w-10 text-black bg-slate-100 p-2 rounded-md hover:bg-slate-200 transition-colors focusable"
      >
        <UserIcon />
      </Popover.Button>

      <Popover.Panel ref={setPopperElement} className="absolute z-20" style={styles.popper} {...attributes.popper}>
        <div
          ref={setArrowRef}
          style={styles.arrow}
          className="absolute block w-4 h-4 border-8 border-transparent border-b-slate-100"
        />
        <div className="mt-4 bg-slate-100 p-4 shadow rounded-md text-black">
          <label htmlFor="nickname" className="block font-semibold">
            Nickname
          </label>
          {/* TODO: may not include @'s */}
          <input
            placeholder="coolguy"
            autoFocus
            value={nickname}
            onChange={(ev: ChangeEvent<HTMLInputElement>) => dispatch(setNickName(ev.target.value))}
            type="text"
            id="nickname"
            maxLength={20}
            className="bg-white py-1 px-2 my-2 rounded-md ring-2 ring-indigo-200 focus:ring-indigo-500 focus:outline-none active:ring-indigo-500"
          />
        </div>
      </Popover.Panel>
    </Popover>
  );
}
