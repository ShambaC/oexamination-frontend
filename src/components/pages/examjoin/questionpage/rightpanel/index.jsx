import { Paper } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Container, Button, Text } from "../../../../../styled";
import { ExamContextConsumer } from "../../context";

var AnsweredQs = []
var UnAnsweredQs = []
var MarkedQs = []
var NotVisitQs = []

const RightPanel = () => {
  const { currentExam } = useSelector((state) => state.exam);
  const { setCount, count, answer } = ExamContextConsumer();
  const { questions } = currentExam;


  // for(let i = 1; i < questions.length; i++) {
  //   NotVisitQs.push(i)
  // }

  var AnsweredCount = AnsweredQs.length
  var UnAnsweredCount = UnAnsweredQs.length
  var MarkedForReviewCount = MarkedQs.length
  var NotVisitedCount = NotVisitQs.length

  const getTextColor = (idx) => {
    if (idx === count) return "white";
    else if (
      answer.answers.find(
        (ans) => String(ans.questionid) === String(questions[idx]._id)
      )
    )
      return "black";
    return "black"
  };

  const getColor = (idx) => {
    if (idx === count)  {
      return "#3d75af";
    }
    else if (
      answer.answers.find(
        (ans) => String(ans.questionid) === String(questions[idx]._id)
      )
    )
      {
        // const found = AnsweredQs.find((e) => e == idx)
        // if(!found)
        // {
        //   AnsweredQs.push(found)
        //   console.log(AnsweredQs)
        // }
        return "#a5d63d";
      }
      
  };
  return (
    <Paper style={{ height: "80vh", width: "30vw", margin: "10px", background: "#e5eef7" }}>
      <Container justify="center" borderBottom="2px solid rgba(0, 0, 0, 0.25)">
        <Text size="18px" weight="bold">
          Progess Tracker
        </Text>
      </Container>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto auto auto auto auto auto auto",
          padding: "20px",
          maxHeight: "200px",
          borderBottom: "2px solid rgba(0, 0, 0, 0.25)",
          overflow: "auto",
          background: "#e5eef7",
        }}
      >
        {[...Array(questions.length).keys()].map((v) => (
          <Button
            height="30px"
            width="30px"
            radius="5px"
            margin="10px 0px"
            background={getColor(v)}
            onClick={() => {
              setCount(v);
            }}
            color={getTextColor(v)}
          >
            {v + 1}
          </Button>
        ))}
      </div>
      <Container
        borderBottom="2px solid rgba(0, 0, 0, 0.25)"
        direction="column"
      >
        <Container align="center" justify="center">
          <Button
            height="30px"
            width="30px"
            radius="5px"
            margin="10px 0px"
            background="#a5d63d"
            color="black"
          >
            {AnsweredCount}
          </Button>
          <Text lineHeight="0px" margin="0px 10px" align="center">
            Answered
          </Text>
        </Container>
        <Container align="center" justify="center">
          <Button
            height="30px"
            width="30px"
            radius="5px"
            margin="10px 0px"
            background="#f74a04"
          >
            {UnAnsweredCount}
          </Button>
          <Text lineHeight="0px" margin="0px 10px" align="center">
            Not Answered
          </Text>
        </Container>
        <Container align="center" justify="center">
          <Button
            height="30px"
            width="30px"
            radius="5px"
            margin="10px 0px"
            background="#916ebb"
          >
            {MarkedForReviewCount}
          </Button>
          <Text lineHeight="0px" margin="0px 10px" align="center">
            Marked for Review
          </Text>
        </Container>
        <Container align="center" justify="center">
          <Button
            height="30px"
            width="30px"
            radius="5px"
            margin="10px 0px"
            background="#c3f6f7"
            color="black"
          >
            {NotVisitedCount}
          </Button>
          <Text lineHeight="0px" margin="0px 10px" align="center">
            Not Visited
          </Text>
        </Container>
      </Container>
    </Paper>
  );
};

export default RightPanel;
