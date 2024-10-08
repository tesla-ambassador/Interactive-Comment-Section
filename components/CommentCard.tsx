"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProfileImage } from "./Authentication";
import PrimaryButton from "./PrimaryButton";
import { useUserStore } from "@/providers/auth-store-provider";
import { content } from "@/@types/customTypes";
import {
  ReplyIcon,
  PlusIcon,
  MinusIcon,
  EditIcon,
  DeleteIcon,
} from "./ui/icons";
import { CommentForm } from "./CommentForm";

function fillerFunction() {
  console.log("Jesus is the Greatest Of All Time");
}

// Interfaces

interface CommentCard extends content {}

// Commment Card for Mobile Screens
export function CommentCardMobile({
  content,
  createdAt,
  score,
  user,
}: CommentCard) {
  const [isReply, setIsReply] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const { username, image } = useUserStore((state) => state);

  const [editedMessage, setIsEditedMessage] = useState<string>(content);

  // Toggle Forms
  const toggleReplyForm = () => {
    setIsReply(!isReply);
  };

  const toggleEditForm = () => {
    setIsEdit(!isEdit);
  };
  return (
    <>
      <section
        className={`p-4 bg-white rounded-lg shadow-sm w-full max-w-[500px]`}
      >
        {/* Comment header */}
        <div className="flex gap-3 items-center">
          <ProfileImage
            url={user.username !== username ? user.image.png : image.png}
          />
          <h1 className="font-semibold">{user.username}</h1>
          <span className="text-gray-500">{createdAt}</span>
        </div>
        {/* Comment body */}
        {isEdit ? (
          <form className="w-full mt-3">
            <textarea
              name="Edited Message"
              rows={5}
              className={`w-full outline-primary col-start-1 col-span-3 row-span-2 px-4 py-2 border-neutral-lightGray border rounded-lg no-scrollbar`}
              value={editedMessage}
              onChange={(e) => {
                setIsEditedMessage(e.target.value);
              }}
            ></textarea>
          </form>
        ) : (
          <p className="mt-3">{content}</p>
        )}
        {/* Comment footer */}
        <div className="flex justify-between items-center mt-3">
          {isEdit ? (
            <PrimaryButton label="Update" action={fillerFunction} />
          ) : (
            <UpVoteButton upvotes={score} flexDirection="flex-row" />
          )}
          {username === user.username ? (
            <div className="flex items-center gap-3">
              <ActionButton
                label="Delete"
                icon={<DeleteIcon />}
                action={fillerFunction}
                textColor="text-primary-softRed"
              />
              <ActionButton
                label="Edit"
                icon={<EditIcon />}
                action={toggleEditForm}
              />
            </div>
          ) : (
            <ActionButton
              label="Reply"
              icon={<ReplyIcon />}
              action={toggleReplyForm}
            />
          )}
        </div>
      </section>
      <AnimatePresence>
        {isReply && (
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="mt-2 w-full max-w-[500px]"
          >
            <CommentForm
              displayScheme="grid grid-cols-3 gap-y-4 p-4"
              profilePlacement="row-start-3"
              textAreaPlacement="col-start-1 col-span-3 row-span-2"
              buttonPlacement="w-full row-start-3 col-start-3"
              buttonLabel="Reply"
              replyName={"@" + user.username}
              flag="Reply"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Commment Card for Desktop screens

export function CommentCardDesktop({
  content,
  createdAt,
  score,
  user,
}: content) {
  const [isReply, setIsReply] = useState<boolean>(false);
  const { username, image } = useUserStore((state) => state);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editedMessage, setIsEditedMessage] = useState<string>(content);

  // Toggle Forms
  const toggleReplyForm = () => {
    setIsReply(!isReply);
  };

  const toggleEditForm = () => {
    setIsEdit(!isEdit);
  };
  return (
    <>
      <section
        className={`p-8 bg-background flex flex-row-reverse gap-x-6 rounded-lg shadow-sm w-full md:max-w-2xl lg:max-w-3xl`}
      >
        {/* Comment header */}
        <div className="w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex gap-3 items-center">
              <ProfileImage
                url={user.username !== username ? user.image.png : image.png}
              />
              <h1 className="font-semibold">{user.username}</h1>
              <span className="text-gray-500">{createdAt}</span>
            </div>
            <div>
              {username === user.username ? (
                <div className="flex items-center gap-3">
                  <ActionButton
                    label="Delete"
                    icon={<DeleteIcon />}
                    action={fillerFunction}
                    textColor="text-primary-softRed"
                  />
                  <ActionButton
                    label="Edit"
                    icon={<EditIcon />}
                    action={toggleEditForm}
                  />
                </div>
              ) : (
                <ActionButton
                  label="Reply"
                  icon={<ReplyIcon />}
                  action={toggleReplyForm}
                />
              )}
            </div>
          </div>
          {/* Comment body */}
          {isEdit ? (
            <form className="w-full mt-3">
              <textarea
                name="Edited Message"
                rows={4}
                className={`w-full outline-primary px-4 py-2 border-neutral-lightGray border rounded-lg no-scrollbar`}
                value={editedMessage}
                onChange={(e) => {
                  setIsEditedMessage(e.target.value);
                }}
              ></textarea>
            </form>
          ) : (
            <p className="mt-3">{content}</p>
          )}
        </div>
        <div>
          <UpVoteButton upvotes={score} flexDirection="flex-col" />
        </div>
      </section>
      <AnimatePresence>
        {isReply && (
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className={`mt-6 bg-background grid gap-x-6 rounded-lg shadow-sm w-full md:max-w-2xl lg:max-w-3xl`}
          >
            <CommentForm
              displayScheme="flex items-start gap-3 px-8 py-4"
              profilePlacement=""
              textAreaPlacement="w-full"
              buttonPlacement="w-fit"
              buttonLabel="Reply"
              replyName={"@" + user.username}
              flag="Reply"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

interface UpVoteButton {
  upvotes: number;
  flexDirection: string;
}

// Upvaote Button

function UpVoteButton({ upvotes, flexDirection }: UpVoteButton) {
  return (
    <div
      className={`px-3 py-2 flex ${flexDirection} items-center gap-4 bg-neutral-veryLightGray rounded-lg`}
    >
      <button className="group">
        <PlusIcon />
      </button>
      <span>{upvotes}</span>
      <button className="group">
        <MinusIcon />
      </button>
    </div>
  );
}

interface ActionButton {
  label: string;
  icon: React.JSX.Element;
  textColor?: string;
  action: () => void;
}

// Comment Action Buttons.

function ActionButton({ label, icon, textColor, action }: ActionButton) {
  return (
    <button className="group flex items-center gap-3" onClick={action}>
      {icon}
      <span
        className={`text-primary ${textColor} group-active:opacity-50 font-semibold transition-opacity duration-150`}
      >
        {label}
      </span>
    </button>
  );
}
