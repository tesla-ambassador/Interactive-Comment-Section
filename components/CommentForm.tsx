"use client";
import React, { useState } from "react";
import { ProfileImage } from "./Authentication";
import PrimaryButton from "./PrimaryButton";
import { useUserStore } from "@/providers/auth-store-provider";

function fillerFunction2() {
  console.log("Don't trust in rappers ho, trust in Jesus!");
}

interface ReplyForm {
  displayScheme: string;
  profilePlacement: string;
  textAreaPlacement: string;
  buttonPlacement: string;
  buttonLabel: string;
  placeholder?: string;
  replyName?: string;
  flag?: string;
  content?: string;
}

export function CommentForm({
  profilePlacement,
  textAreaPlacement,
  buttonPlacement,
  displayScheme,
  buttonLabel,
  placeholder,
  replyName,
  flag,
  content,
}: ReplyForm) {
  const [message, setMessage] = useState<string>(
    replyName !== undefined ? replyName + " " : ""
  );
  const { image } = useUserStore((state) => state);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        switch (flag) {
          case "Reply":
            console.log("I am a reply");
            break;
          case "Edit":
            console.log("I am an update!");
          default:
            console.log("I am a comment");
            break;
        }
        console.log(message);
      }}
      className={`w-full ${displayScheme} rounded-lg bg-background`}
    >
      <div className={`w-fit ${profilePlacement} flex items-center`}>
        <ProfileImage url={image.png} heightAndWidth="h-[30px] w-[30px]" />
      </div>
      <textarea
        name="Message"
        rows={3}
        className={`outline-primary ${textAreaPlacement} px-4 py-2 border-neutral-lightGray border rounded-lg`}
        placeholder={placeholder}
        value={flag === "Edit" ? message + content : message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      ></textarea>
      <div className={`flex justify-end ${buttonPlacement}`}>
        <PrimaryButton label={buttonLabel} />
      </div>
    </form>
  );
}

{
  /* <textarea
  rows={3}
  className={`outline-primary ${textAreaPlacement} px-4 py-2 border-neutral-lightGray border rounded-lg`}
  placeholder={placeholder}
>
  {replyName}
</textarea>; */
}
