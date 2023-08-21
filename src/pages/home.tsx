import { useState, useEffect } from "react";
import { Container, Flex, Grid, Select, Text } from "@chakra-ui/react";
import { Check, Trash } from "lucide-react";
import { Task } from "../components";
import type { TaskProps } from "../types";
import { fetchTasks } from "../utils";
import { useUser } from "@clerk/clerk-react";

export default function Home() {
  const [tasks, setTasks] = useState<TaskProps[] | null>(null);
  const [filter, setFilter] = useState("all");
  const { user, isSignedIn } = useUser();

  const completedTasks = tasks?.filter((task) => task?.completed === true);

  const incompletedTasks = tasks?.filter((task) => task?.completed === false);

  useEffect(() => {
    fetchTasks(user?.id).then((data) => setTasks(data));
  }, [isSignedIn]);

  if (!isSignedIn)
    return (
      <Container maxW="6xl">
        <Flex
          direction="column"
          borderBottom="1px"
          borderBottomColor="gray.400"
        >
          <Flex w="full" h={{ md: "10vh", "2xl": "5vh" }} alignItems="center">
            <Flex
              w="70%"
              justifyContent="space-between"
              pr="2"
              alignItems="center"
            >
              <Text>Task</Text>
              <Select
                w="200px"
                onChange={(e) => setFilter(e.target.value)}
                value={filter}
              >
                <option value="all">All</option>
                <option value="complete">Done</option>
                <option value="incomplete">Not Done</option>
              </Select>
            </Flex>
            <Grid
              w="10%"
              h="full"
              placeItems="center"
              borderLeft="1px"
              borderLeftColor="gray.400"
            >
              <Text>Status</Text>
            </Grid>
            <Grid
              w="10%"
              h="full"
              placeItems="center"
              borderLeft="1px"
              borderLeftColor="gray.400"
            >
              <Check size="20px" />
            </Grid>
            <Grid
              w="10%"
              h="full"
              placeItems="center"
              borderLeft="1px"
              borderLeftColor="gray.400"
            >
              <Trash size="20px" />
            </Grid>
          </Flex>
        </Flex>
        {/* Tasks */}
        <Grid w="full" h="77vh" placeItems="center">
          <Text opacity=".5">No tasks</Text>
        </Grid>
      </Container>
    );
  return (
    <Container maxW="6xl">
      <Flex direction="column" borderBottom="1px" borderBottomColor="gray.400">
        <Flex w="full" h={{ md: "10vh", "2xl": "5vh" }} alignItems="center">
          <Flex
            w="70%"
            justifyContent="space-between"
            pr="2"
            alignItems="center"
          >
            <Text>Task</Text>
            <Select
              w="200px"
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
            >
              <option value="all">All</option>
              <option value="complete">Done</option>
              <option value="incomplete">Not Done</option>
            </Select>
          </Flex>
          <Grid
            w="10%"
            h="full"
            placeItems="center"
            borderLeft="1px"
            borderLeftColor="gray.400"
          >
            <Text>Status</Text>
          </Grid>
          <Grid
            w="10%"
            h="full"
            placeItems="center"
            borderLeft="1px"
            borderLeftColor="gray.400"
          >
            <Check size="20px" />
          </Grid>
          <Grid
            w="10%"
            h="full"
            placeItems="center"
            borderLeft="1px"
            borderLeftColor="gray.400"
          >
            <Trash size="20px" />
          </Grid>
        </Flex>
      </Flex>
      {/* Tasks */}
      {tasks && tasks.length === 0 ? (
        <Grid w="full" h="77vh" placeItems="center">
          <Text opacity=".5">No tasks</Text>
        </Grid>
      ) : tasks && filter === "all" ? (
        tasks?.map((task) => <Task key={task?.id} {...task} />)
      ) : tasks && filter === "complete" ? (
        completedTasks?.map((task) => <Task key={task?.id} {...task} />)
      ) : (
        tasks &&
        filter === "incomplete" &&
        incompletedTasks?.map((task) => <Task key={task?.id} {...task} />)
      )}
    </Container>
  );
}
