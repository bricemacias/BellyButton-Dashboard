import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const Form = styled.div`
  font-size: 1.7rem;
  margin: 0 1rem 1rem;
  overflow: scroll;
  height: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  /* background-color: pink; */
`;

const Container = styled.div`
  /* background-color: green; */
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleSection = styled.div`
  display: flex;
  height: 50px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 25px auto;
`;

const Title = styled.div`
  font-size: 26px;
  font-weight: 600;
  letter-spacing: 1px;
  color: ${(p) => p.theme.colors.secondary.main};
`;

const SubTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0px;
  color: ${(p) => p.theme.colors.secondary.pink};
`;

const VideoButtonsContainer = styled.div`
  display: flex;
  width: 60%;
  align-items: center;
  justify-content: space-around;
  margin: 20px auto 10px;
`;

const AddVideoContainer = styled.div`
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${(p) => p.theme.colors.secondary.main};
  color: ${(p) => p.theme.colors.secondary.main};
  padding: 5px;
  border-radius: 50px;
  cursor: pointer;

  &:hover {
    padding: 5px 10px;
  }
`;

const AddVideoText = styled.div`
  font-size: 14px;
  padding-left: 10px;
`;

const AddButton = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  display: flex;
  /* border: 2px solid #ececec; */
`;

const InputTitle = styled.div`
  margin: 5px auto;
  padding-left: 10px;
  width: 50%;
  align-items: center;
  justify-content: flex-start;
  display: flex;
  flex-wrap: nowrap;
  text-align: center;
  white-space: nowrap;
`;

const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  margin: 0px 50px 10px;
  border-radius: 4px;
  position: relative;
  background-color: rgba(243, 243, 243, 0.7);
  transition: 0.3s all;

  &:hover {
    background-color: rgba(255, 255, 255, 0.45);
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
  }
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  position: relative;
  padding: 0px 16px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
  background-color: transparent;
  color: #282828;
  outline: none;
  box-shadow: 0px 4px 20px 0px transparent;
  transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out,
    0.1s padding ease-in-out;
  -webkit-appearance: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  height: 300px;
  justify-content: center;
  align-items: center;
  padding: 20px 0 25px;
`;

const Button = styled.button`
  transition: 0.3s;
  margin: 15px auto 3rem;
  width: 140px;
  height: 50px;
  border-radius: 50px;
  font-size: 15px;
  font-weight: 400;
  border: none;
  color: white;
  background: ${(p) =>
    p.disabled
      ? 'linear-gradient(90deg, #c1b9ee, #c1b9ee 49%, #c1b9ee)'
      : 'linear-gradient(90deg, #432d9c, #2c34ac 49%, #2736af)'};
  cursor: ${(p) => (p.disabled ? '' : 'pointer')};

  &:hover {
    ${(p) => !p.disabled && 'width: 145px'};
    ${(p) => !p.disabled && 'margin-top: 13px'};
    ${(p) => !p.disabled && 'box-shadow: 0 1rem 2rem #c1b9ee'};
  }
`;

const AddTalent = (props: any) => {
  return (
    <MainContainer>
      <TitleSection>
        <Title>Add New Talent</Title>
        <SubTitle>Fill all necessary elements</SubTitle>
      </TitleSection>
      <Form>
        <Container>
          <InputTitle>Name</InputTitle>
          <InputContainer>
            <Input id="name" placeholder="Talent Name" />
          </InputContainer>
          <InputTitle>Youtube Channel Url</InputTitle>
          <InputContainer>
            <Input
              id="name"
              placeholder="https://www.youtube.com/channel/talent_channel_id"
            />
          </InputContainer>
          <InputTitle>Last known V30</InputTitle>
          <InputContainer>
            <Input id="V30" placeholder="Last Talent V30" type="number" />
          </InputContainer>
          <InputTitle>Price</InputTitle>
          <InputContainer>
            <Input id="price" placeholder="ex: 30 for 30€" type="number" />
          </InputContainer>
        </Container>
        <ButtonContainer>
          <Button>Add Talent</Button>
        </ButtonContainer>
      </Form>
    </MainContainer>
  );
};

export default AddTalent;
