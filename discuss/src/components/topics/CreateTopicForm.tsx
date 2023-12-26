"use client";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import { createTopic } from "../../actions";
import { useFormState, useFormStatus } from "react-dom";

export default function CreateTopicForm() {
  const [formState, action] = useFormState(createTopic, {
    error: false,
    errors: {},
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { pending } = useFormStatus();
  return (
    <>
      <Button radius="sm" onPress={onOpen}>
        New Topic
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create a New Topic
              </ModalHeader>
              <form action={action}>
                <ModalBody>
                  <Input
                    name="name"
                    autoFocus
                    label="Topic"
                    placeholder=""
                    variant="flat"
                    className="mb-4"
                    isInvalid={formState.error}
                    errorMessage={formState.errors.name?.join(", ")}
                    onChange={() => {
                      formState.error = false;
                    }}
                    disabled={pending}
                  />
                  <Textarea
                    name="description"
                    label="Describe"
                    placeholder=""
                    type="text"
                    variant="flat"
                    isInvalid={formState.error}
                    errorMessage={formState.errors.description?.join(", ")}
                    disabled={pending}
                  />
                  {formState.errors._form ? (
                    <div className="px-2  py-1 text-sm rounded-md bg-red-200 text-red-950">
                      {formState.errors._form.join(", ")}
                    </div>
                  ) : null}
                </ModalBody>
                <ModalFooter>
                  <Button
                    className="w-1/2"
                    color="danger"
                    variant="flat"
                    onPress={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="w-1/2"
                    type="submit"
                    color="primary"
                    // onPress={!formState.error ? onClose : undefined}
                    isLoading={pending}
                  >
                    Create
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
