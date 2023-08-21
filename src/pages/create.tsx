import { useState } from "react";
import {
  Container,
  Input,
  IconButton,
  Textarea,
  Flex,
  Button,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash } from "lucide-react";
import type { TasksProps } from "../types";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { supabase } from "../utils";
import { useUser } from "@clerk/clerk-react";

export default function Create() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState<TasksProps[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();

  if (!isSignedIn) navigate("/");

  const addTask = () => {
    if (text.replace(/\s/g, "").length === 0) {
      toast.error("Input value is invalid");
      return null;
    } else {
      const doc = {
        id: uuidv4(),
        text: text,
      };
      setTasks([...tasks].concat(doc));
      setText("");
    }
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const createTask = async () => {
    setLoading(true);
    const { error }: any = await supabase.from("task").insert({
      title,
      description,
      tasks: tasks.map((task) => task.text),
      user_id: user?.id,
    });

    if (error) {
      setLoading(false);
      toast.error(error?.message);
    } else {
      setLoading(false);
      navigate("/");
    }
  };
  return (
    <Container maxW="6xl">
      <Flex
        w="full"
        h="10vh"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text>Create</Text>
        <Button
          colorScheme="teal"
          isLoading={loading}
          fontSize="sm"
          variant="outline"
          onClick={createTask}
          _disabled={{ opacity: ".5", textDecoration: "line-through" }}
          isDisabled={
            title.replace(/\s/g, "").length === 0 ||
            description.replace(/\s/g, "").length === 0 ||
            tasks.length === 0
          }
        >
          Create
        </Button>
      </Flex>
      <Flex
        w="full"
        h={{ base: "auto", md: "77vh" }}
        gap="4"
        direction={{ base: "column", md: "row" }}
      >
        <Flex
          direction="column"
          gap="4"
          w={{ base: "full", md: "50%" }}
          h="full"
          pb="4"
        >
          <Input
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <Textarea
            placeholder="Description"
            h="full"
            resize="none"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></Textarea>
        </Flex>
        <Flex w={{ base: "full", md: "50%" }} direction="column" gap="4">
          <Flex w="full" gap="4">
            <Input
              type="text"
              placeholder="Task"
              w="full"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
            <IconButton icon={<Plus />} aria-label="add" onClick={addTask} />
          </Flex>
          {tasks.map((task) => (
            <Flex w="full" alignItems="center" gap="4" key={task.id}>
              <Text w="full" px="2">
                · {task.text}
              </Text>
              <IconButton
                icon={<Trash />}
                aria-label="delete"
                colorScheme="red"
                onClick={() => deleteTask(task.id)}
              />
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Container>
  );
}
