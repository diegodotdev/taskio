import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchTask } from "../utils";
import { TaskProps } from "../types";
import { Container, Flex, Text, Checkbox, Button } from "@chakra-ui/react";
import { toast } from "sonner";
import { supabase } from "../utils";
import { useNavigate } from "react-router-dom";

export default function Tasks() {
  const [task, setTask] = useState<TaskProps | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDone = async (id: any) => {
    const { error }: any = await supabase
      .from("task")
      .update({ completed: !task?.completed })
      .eq("id", id);

    if (error) {
      toast.error(error?.message);
      return null;
    } else {
      window.location.reload();
    }
  };

  const handleDelete = async (id: any) => {
    const { error }: any = await supabase.from("task").delete().eq("id", id);

    if (error) {
      toast.error(error?.message);
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    fetchTask(id).then((data) => setTask(data[0]));
  }, []);
  return (
    <Container maxW="6xl">
      <Flex w="full" gap="4" direction={{ base: "column", md: "row" }}>
        <Flex w={{ base: "full", md: "50%" }} direction="column" gap="4">
          <Flex direction="column" gap="2">
            <Text opacity=".5">Title</Text>
            <Text>{task?.title}</Text>
          </Flex>
          <Flex direction="column" gap="2">
            <Text opacity=".5">Description</Text>
            <Text>{task?.description}</Text>
          </Flex>
        </Flex>
        <Flex w={{ base: "full", md: "50%" }} direction="column" gap="2">
          <Text opacity=".5">Tasks</Text>
          {task?.tasks?.map((task, index) => (
            <Checkbox key={index}>{task}</Checkbox>
          ))}
        </Flex>
      </Flex>
      <Flex
        w="full"
        direction="column"
        gap="4"
        my="4"
        display={{ base: "flex", md: "none" }}
      >
        <Button
          colorScheme="green"
          variant="outline"
          fontSize="sm"
          onClick={() => handleDone(id)}
        >
          Complete
        </Button>
        <Button
          colorScheme="red"
          variant="outline"
          fontSize="sm"
          onClick={() => handleDelete(id)}
        >
          Delete
        </Button>
      </Flex>
    </Container>
  );
}
