import { Container, Flex, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignOutButton,
  SignInButton,
} from "@clerk/clerk-react";

export default function Nav() {
  const location = useLocation();

  return (
    <Container maxW="6xl">
      <Flex
        w="full"
        h="12vh"
        justifyContent="space-between"
        alignItems="center"
      >
        <Link to="/">
          <Text fontSize="3xl">Task.io</Text>
        </Link>
        <SignedIn>
          <Flex gap="4">
            {location.pathname !== "/create" && (
              <Link to="/create">
                <Button colorScheme="teal" variant="outline" fontSize="sm">
                  Create
                </Button>
              </Link>
            )}
            <SignOutButton>
              <Button fontSize="sm" colorScheme="red" variant="outline">
                Sign Out
              </Button>
            </SignOutButton>
          </Flex>
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <Button colorScheme="teal" fontSize="sm" variant="outline">
              Sign In
            </Button>
          </SignInButton>
        </SignedOut>
      </Flex>
    </Container>
  );
}
