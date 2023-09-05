import { Paper } from "@material-ui/core";
import React from "react";
import { Button, Container } from "../../../../../styled";
import Question from "./Question";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useSelector } from "react-redux";
import { ExamContextConsumer } from "../../context";
import { editAnswer } from "../../../../../redux/actions/exam";
import { useDispatch } from "react-redux";


const LeftPanel = () => {
  const { currentExam } = useSelector((state) => state.exam);
  const { count, setCount, answer, setAnswer } = ExamContextConsumer();
  const onNext = () => {
    if (count + 1 < currentExam.questions.length) setCount(count + 1);
    else setCount(0);
  };
  const onPrev = () => {
    if (count > 0) setCount(count - 1);
    else setCount(currentExam.questions.length - 1);
  };

const { answers } = answer;
const Q1 = currentExam.questions[count]
const Eid = currentExam._id
const dispatch = useDispatch();

React.useEffect(() => {
  async function func() {
    if (await dispatch(editAnswer({ answers }, Eid, answer._id))) {
      return;
    }
  }
  func();
}, [answers, dispatch]);
const ClearResponse = (optionid) => {
  let ans = answers.find((a) => {
    return String(a.questionid) === String(Q1._id);
  });
  if (ans) {
    setAnswer({
      ...answer,
      answers: [
        ...answers.map((a) => {
          if (String(a.questionid) === String(Q1._id))
            return { ...a, optionid: optionid };
          else return { ...a };
        }),
      ],
    });
  } else {
    let ans = { questionid: Q1._id, optionid: optionid };
    setAnswer({ ...answer, answers: [...answers, ans] });
  }
};

  return (
    <Paper style={{ height: "", width: "70vw", margin: "10px" }}>
      <Question
        question={currentExam.questions[count]}
        examid={currentExam._id}
      />
      <Container
        borderTop="2px solid rgba(0, 0, 0, 0.25)"
        justify="space-between"
        position="absolute"
        height="60px"
        width="66.7vw"
        bottom="0px"
      >
        <Button
          width="100px"
          height="35px"
          background="#cddcea"
          color="black"
          margin="8px"
          onClick={onPrev}
        >
          <Container align="center" justify="center">
            <ArrowBackIosIcon /> Previous
          </Container>
        </Button>
        <Button
          width="200px"
          height="35px"
          background="#cddcea"
          color="black"
          margin="8px"
          onClick={onNext}
        >
          <Container align="center" justify="center">
            Mark for Review and Next
          </Container>
        </Button>
        <Button
          width="150px"
          height="35px"
          background="#cddcea"
          color="black"
          margin="8px"
          onClick={() => ClearResponse(Q1._id)}
        >
          <Container align="center" justify="center">
            Clear Response
          </Container>
        </Button>
        <Button
          width="150px"
          height="35px"
          background="#457cb5"
          color="black"
          margin="8px"
          onClick={onNext}
        >
          <Container align="center" justify="center" style={{ color: "white" }}>
            Save and Next <ArrowForwardIosIcon />
          </Container>
        </Button>
      </Container>
    </Paper>
  );
};

export default LeftPanel;
