import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import styled from "@emotion/styled";

const Stars = styled.div`
  display: flex;
  padding-top: 5px;

  & svg {
    color: gray;
    cursor: pointer;
  }

  :hover svg {
    color: #fcc419;
  }

  & svg:hover ~ svg {
    color: gray;
  }

  .yellowStar {
    color: #fcc419;
  }
`;
export function ReviewWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [recommend, setRecommend] = useState("");
  const [uploadFiles, setUploadFiles] = useState(null);
  const ARRAY = [0, 1, 2, 3, 4];
  const [score, setScore] = useState([false, false, false, false, false]);
  const [point, setPoint] = useState(0);

  const toast = useToast();

  const handleStarClick = (index) => {
    let star = [...score];
    for (let i = 0; i < 5; i++) {
      star[i] = i <= index ? true : false;
    }
    setScore(star);
  };

  useEffect(() => {
    sendReview();
  }, [score]);

  const sendReview = () => {
    let point = score.filter(Boolean).length;
    // point 값을 할당
    setPoint(point);
    // 할당된 값을 서버로 보낼수 있게 함
  };

  const { restaurantId } = useParams();
  // 맛집 id를 받아서 저장

  const navigate = useNavigate();

  function handleSubmit() {
    axios
      // 파일을 보내기위해 데이터를 multipart/form-data로 보내는 요청방식(postForm)
      .postForm("/api/review/add", {
        title,
        recommend,
        content,
        restaurantId,
        point,
        uploadFiles,
      })
      .then(() => {
        toast({
          description: "리뷰가 등록 되었습니다.",
          status: "success",
        });
        navigate("/review");
      })
      .catch(() => {
        toast({
          description: "빠진 내용이 없는지 확인해 주세요",
          status: "warning",
        });
      })
      .finally(() => console.log("end"));
  }

  return (
    <Center>
      <Box w={"5xl"}>
        <Flex>
          <FormControl>
            <FormLabel>제목</FormLabel>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>추천메뉴</FormLabel>
            <Input
              value={recommend}
              onChange={(e) => setRecommend(e.target.value)}
            />
          </FormControl>
        </Flex>
        <Flex>
          <Stars>
            {ARRAY.map((el, index) => (
              <FaStar
                key={index}
                size="30"
                onClick={() => handleStarClick(el)}
                className={score[el] && "yellowStar"}
              ></FaStar>
            ))}
          </Stars>
        </Flex>
        {/* 리뷰 파일첨부 */}
        <FormControl>
          <FormLabel>사진 첨부</FormLabel>
          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setUploadFiles(e.target.files)}
          />
          {/* 여러 파일 전송 */}
          <FormHelperText>
            한 개 파일은 1MB, 총 용량은 10MB를 넘길수 없습니다
          </FormHelperText>
        </FormControl>
        <FormControl marginY={"20px"}>
          <FormLabel>리뷰 작성하기</FormLabel>
          <Textarea
            h={"500px"}
            resize={"none"}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </FormControl>
        <Button onClick={handleSubmit} colorScheme="blue">
          작성하기
        </Button>
      </Box>
    </Center>
  );
}
