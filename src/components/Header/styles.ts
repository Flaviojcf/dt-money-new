import styled from "styled-components";
import * as RadioGroup from "@radix-ui/react-radio-group";

export const HeaderContainer = styled.header`
  background: ${(props) => props.theme["gray-900"]};
  padding: 2.5rem 0 7.5rem;
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

export const NewTransactionButton = styled.button`
  height: 50px;
  border: 0;
  background: ${(props) => props.theme["green-500"]};

  color: ${(props) => props.theme.white};
  font-weight: bold;
  padding: 0 1.25rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: ${(props) => props.theme["green-700"]};
  }
`;

export const TransactionType = styled(RadioGroup.Root)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 0.5rem;
`;

interface TransactionTypeButtonProps {
  variant: "income" | "outcome";
}

export const TransactionTypeButton = styled(RadioGroup.Item)<TransactionTypeButtonProps>`
  background: ${(props) => props.theme["gray-700"]};
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme["gray-300"]};

  svg {
    color: ${(props) =>
      props.variant === "income"
        ? props.theme["green-300"]
        : props.theme["red-300"]};
  }

  &[data-state="unchecked"]:hover {
    transition: background-color 0.2s;
    background: ${(props) => props.theme["gray-600"]};
  }
  &[data-state="checked"] {
    color: ${(props) => props.theme.white};
    background: ${(props) =>props.variant === "income"? props.theme["green-500"]: props.theme["red-500"]};
    border: none;
    svg {
      color: ${(props) => props.theme.white};
    }
  }
`;
