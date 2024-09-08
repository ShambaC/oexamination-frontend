import React, { useState, useEffect } from "react";
import { Container, Text } from "../../../styled";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { MathComponent } from 'mathjax-react'

const QuesAns = ({ question, answer, idx }) => {
  const [currAns, setcurrAns] = useState("");

  useEffect(() => {
    if (answer && answer.answers) {
      let ans = answer.answers.find(
        (ans) => String(ans.questionid) === String(question._id)
      );
      setcurrAns({ ...ans });
    }
  }, [answer, question]);

  const checkSymbol = (opt) => {
    if (opt.isanswer) {
      return <CheckIcon fontSize="small" style={{ color: "green" }} />;
    } else if (String(currAns.optionid) === String(opt._id) && !opt.isanswer) {
      return <CloseIcon fontSize="small" style={{ color: "red" }} />;
    }
  };

  return (
    <Container
      width="80vw"
      margin="5px 0px"
      background="white"
      direction="column"
      padding="10px 30px"
    >
      <Container direction="row" justify="space-between">
        <Container direction="row" width="90%">
          <Text width="10%" size="15px">
            <b>Question {idx + 1}: </b>
          </Text>
          <Text width="80%" size="15px">
            <MathComponent tex={question.title} display={false} />
            <img src={question.imgLink} alt="image cannot load"></img>
          </Text>
        </Container>
        <Text width="10%" size="15px">
          <b>Mark: </b>
          {currAns.mark || "0"}/{question.mark}
        </Text>
      </Container>
      <Container direction="row" align="flex-end" justify="space-between">
        <Container width="90%">
          <ol>
            {question.options.map((opt, idx) => (
              <li style={{ display: "flex" }}>
                <Text lineHeight="0px">
                  {idx + 1}: <MathComponent tex={opt.option} display={false} />
                </Text>
                {checkSymbol(opt)}
              </li>
            ))}
          </ol>
        </Container>
      </Container>
    </Container>
  );
};

export default QuesAns;
