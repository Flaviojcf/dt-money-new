import * as Dialog from "@radix-ui/react-dialog";
import styled from "styled-components";

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
`;

export const Content = styled(Dialog.Content)`
  min-width: 32rem;
  border-radius: 6px;
  padding: 2.5rem 3rem;
  background: ${(props) => props.theme["gray-800"]};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  form {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    input {
      border-radius: 6px;
      border: 0;
      background: ${(props) => props.theme["gray-900"]};
      color: ${(props) => props.theme["gray-300"]};
      padding: 1rem;

      &::placeholder {
        color: ${(props) => props.theme["gray-300"]};
      }
    }

    button[type="submit"] {
      height: 58px;
      border: 0;
      background: ${(props) => props.theme["green-500"]};
      font-weight: bold;
      padding: 0 1.25rem;
      margin-top: 1.5rem;
      border-radius: 6px;
      cursor: pointer;
      color: ${props=>props.theme.white};


      &:disabled{
        opacity: 0.6;
        cursor: not-allowed;
      }

      &:not(:disabled):hover {
        background: ${(props) => props.theme["green-700"]};
        transition: background-color 0.2s;
      }
    }
  }
`;

export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  background: transparent;
  border: 0;

  top: 1.5rem;
  right: 1.5rem;
  line-height: 0;
  cursor: pointer;
  color: ${props=>props.theme["gray-500"]};
`;
