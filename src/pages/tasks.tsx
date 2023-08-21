import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchTask } from "../utils";
import { TaskProps } from "../types";
import { Container, Flex, Text, Checkbox } from "@chakra-ui/react";
export default function Tasks() {
  const [task, setTask] = useState<TaskProps | null>(null);
  const { id } = useParams();

  useEffect(() => {
    fetchTask(id).then((data) => setTask(data[0]));
  }, []);
  return (
    <Container maxW="6xl">
      <Flex w="full" gap="4">
        <Flex w="50%" direction="column" gap="4">
          <Flex direction="column" gap="2">
            <Text opacity=".5">Title</Text>
            <Text>{task?.title}</Text>
          </Flex>
          <Flex direction="column" gap="2">
            <Text opacity=".5">Description</Text>
            <Text>{task?.description}</Text>
          </Flex>
        </Flex>
        <Flex w="50%" direction="column" gap="2">
          <Text opacity=".5">Tasks</Text>
          {task?.tasks?.map((task, index) => (
            <Checkbox key={index}>{task}</Checkbox>
          ))}
        </Flex>
      </Flex>
    </Container>
  );
}
