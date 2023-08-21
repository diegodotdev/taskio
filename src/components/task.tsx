import { TaskProps } from "../types";
import { Flex, Grid, Text, IconButton } from "@chakra-ui/react";
import { Check, Trash } from "lucide-react";
import { supabase } from "../utils";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export default function Task(props: TaskProps) {
  const { id, title, completed } = props;

  const handleDone = async (id: number) => {
    const { error }: any = await supabase
      .from("task")
      .update({ completed: !completed })
      .eq("id", id);

    if (error) {
      toast.error(error?.message);
      return null;
    } else {
      window.location.reload();
    }
  };

  const handleDelete = async (id: number) => {
    const { error }: any = await supabase.from("task").delete().eq("id", id);

    if (error) {
      toast.error(error?.message);
    } else {
      window.location.reload();
    }
  };
  return (
    <Flex direction="column" borderBottom="1px" borderBottomColor="gray.400">
      <Flex w="full" h={{ md: "10vh", "2xl": "5vh" }} alignItems="center">
        <Flex w="70%">
          <Link to={`/tasks/${id}`}>
            <Text _hover={{ textDecoration: "underline" }}>{title}</Text>
          </Link>
        </Flex>
        <Grid
          w="10%"
          h="full"
          placeItems="center"
          borderLeft="1px"
          borderLeftColor="gray.400"
        >
          <Text>{completed ? "Done" : "Not Done"}</Text>
        </Grid>
        <Grid
          w="10%"
          h="full"
          placeItems="center"
          borderLeft="1px"
          borderLeftColor="gray.400"
        >
          <IconButton
            icon={<Check size="20px" />}
            aria-label="done"
            colorScheme="teal"
            onClick={() => handleDone(id)}
          />
        </Grid>
        <Grid
          w="10%"
          h="full"
          placeItems="center"
          borderLeft="1px"
          borderLeftColor="gray.400"
        >
          <IconButton
            icon={<Trash size="20px" />}
            aria-label="delete"
            colorScheme="red"
            onClick={() => handleDelete(id)}
          />
        </Grid>
      </Flex>
    </Flex>
  );
}
