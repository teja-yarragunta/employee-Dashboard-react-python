import { Button, Modal, ModalOverlay, ModalContent, useDisclosure, ModalHeader, 
    ModalCloseButton,
    ModalBody,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    RadioGroup,
    Radio,
    ModalFooter,
    useToast} from '@chakra-ui/react'
import { BiAddToQueue } from 'react-icons/bi'
import React, { useState } from 'react'
import { BASE_URL } from "../App";

const CreateUserModel = ({setUsers}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
	const [inputs, setInputs] = useState({
		name: "",
		role: "",
		description: "",
		gender: "",
	})
    const toast = useToast();
    const handleCreateUser = async (e) =>{
        e.preventDefault(); // prevent page refresh
		setIsLoading(true);
		try {
			const res = await fetch(BASE_URL + "/employees", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(inputs),
			});

			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error);
			}

			toast({
				status: "success",
				title: "New Employee added 🎉",
				description: "Employee created successfully.",
				duration: 2000,
				position: "top",
			});
			onClose();
			setUsers((prevUsers) => [...prevUsers, data]);
			setInputs({
				name: "",
				role: "",
				description: "",
				gender: "",
			}); // clear inputs
		} catch (error) {
			toast({
				status: "error",
				title: "An error occurred.",
				description: error.message,
				duration: 4000,
			});
        } finally {
			setIsLoading(false);
		}
    }

  return (
    <>
    <Button onClick={onOpen}>
        <BiAddToQueue />
    </Button>
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleCreateUser}>
            <ModalContent>
            <ModalHeader>New Employee</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <Flex alignItems={"center"} gap={4}>
                    <FormControl> {/* left */}
                        <FormLabel>Full Name</FormLabel>
                        <Input placeholder='enter full name' 
                            value={inputs.name}
                            onChange={(e) => setInputs({...inputs, name: e.target.value})}
                        />
                    </FormControl>
                    <FormControl> {/* right */}
                        <FormLabel>Role</FormLabel>
                        <Input placeholder='enter the role' 
                            value={inputs.role}
                            onChange={(e) => setInputs({...inputs, role: e.target.value})}
                        />
                    </FormControl>
                </Flex>
                <FormControl mt={4}>
                    <FormLabel>Description</FormLabel>
                    <Textarea resize={'none'} overflowY={'hidden'} 
                        placeholder='he/she codes in C++' 
                        value={inputs.description}
                        onChange={(e) => setInputs({...inputs, description: e.target.value})}
                    />
                </FormControl>
                <RadioGroup mt={4}>
                    <Flex gap={5}>
                        <Radio value='male'
                            onChange={(e) => setInputs({...inputs, gender: e.target.value})}
                        >Male</Radio>
                        <Radio value='female'
                            onChange={(e) => setInputs({...inputs, gender: e.target.value})}
                        >Female</Radio>
                    </Flex>
                </RadioGroup>
            </ModalBody>
            <ModalFooter>
                <Button colorScheme='blue' mr={3} type='submit' isLoading={isLoading}>Add</Button>
                <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
            </ModalContent>
        </form>
    </Modal>
    </>
  )
}

export default CreateUserModel