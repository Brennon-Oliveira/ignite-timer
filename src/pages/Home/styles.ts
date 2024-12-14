import styled from "styled-components";

export const HomeContainer = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  max-width: 41rem;
  margin: 0 auto;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`;

const BaseCountdownButton = styled.button`
  width: 100%;
  border: 0;
  padding: 1rem;
  border-radius: 8;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.5rem;
  font-weight: bold;

  cursor: pointer;
  
  transition: background-color .1s;
  color: ${(props) => props.theme["gray-100"]};

  

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const StartCountdownButton = styled(BaseCountdownButton)`
  background-color: ${(props) => props.theme["green-500"]};
  
  &:not(:disabled):hover {
    background-color: ${(props) => props.theme["green-700"]};
  }
`;

export const StopCountdownButton = styled(BaseCountdownButton)`
  background-color: ${(props) => props.theme["red-500"]};
  
  &:not(:disabled):hover {
    background-color: ${(props) => props.theme["red-700"]};
  }
`;
