import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export function MemberEdit() {
  const [member, setMember] = useState(null);
  const [nickName, setNickName] = useState("");
  const [nickAvailable, setNickAvailable] = useState(false);

  const [params] = useSearchParams();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    axios.get("/api/member?" + params.toString()).then((response) => {
      setMember(response.data);
      setNickName(response.data.nickName);
    });
  }, []);

  const id = params.get("id");
  // 기존 닉네임과 같은지
  let sameBeforeNickname = false;

  if (member !== null) {
    sameBeforeNickname = member.nickName === nickName;
  }

  // 기존 닉네임과 같은지, 중복확인을 했거나
  let checkedNickname = sameBeforeNickname || nickAvailable;

  if (member === null) {
    return <Spinner />;
  }

  function handleSubmit() {}

  function handleCheckNickname() {
    const searchParam = new URLSearchParams();
    searchParam.set("nickName", nickName);

    axios
      .get("/api/member/check?" + searchParam.toString())
      .then(() => {
        setNickAvailable(false);
        toast({
          description: "이미 사용중인 닉네임입니다",
          status: "warning",
        });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setNickAvailable(true);
          toast({
            description: "사용 가능합니다",
            status: "success",
          });
        }
      });
  }

  return (
    <Box>
      <Heading>{id}님 정보 수정</Heading>
      <FormControl>
        <FormLabel>닉네임</FormLabel>
        <Input
          type="text"
          value={nickName}
          onChange={(e) => {
            setNickName(e.target.value);
            setNickAvailable(false);
          }}
        />
        <Button isDisabled={checkedNickname} onClick={handleCheckNickname}>
          중복확인
        </Button>
      </FormControl>
      <FormControl>
        <FormLabel>비밀번호</FormLabel>
        <Input type="text" />
      </FormControl>
      <FormControl>
        <FormLabel>이메일</FormLabel>
        <Input type="text" />
      </FormControl>
      <Flex>
        <Button onClick={handleSubmit}>완료</Button>
        <Button onClick={() => navigate(-1)}>취소</Button>
      </Flex>
    </Box>
  );
}