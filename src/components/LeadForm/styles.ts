import styled from "styled-components";

const Section = styled.div`
  display: flex;
  background-color: #d9dea5;
  height: 40vh;
  width: 100%;
  padding: 16px;
  background-image: url("/images/diced_lemon.png");
  background-size: contain;
  background-position: left center;
  background-repeat: no-repeat;
`;

const TitleContainer = styled.div`
  max-width: 800px;
  margin: auto;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 20px;
  font-weight: bolder;
  color: #000000;
  line-height: 50px;
  letter-spacing: 3px;
`;

const Logo = styled.img`
  margin-bottom: 20px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f8f9fa;
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 550px;
  background: white;
  padding: 40px;
  border-radius: 10px;
  text-align: center;
`;
const FormSection = styled.div`
  margin-top: 40px;
`;
const FormSectionTitle = styled.h3`
  font-weight: bold;
  margin: 15px 0 15px 0;
`;

const FormSectionDescription = styled.p`
  font-weight: bold;
  margin-bottom: 40px;
`;

const FileInput = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  margin: 15px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background-color: #111;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #003d99;
  }
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const LoadingIndicator = styled.div`
  margin-top: 10px;
  font-size: 1rem;
  color: #0052cc;
  font-weight: 600;
`;

const SuccessMessage = styled.p`
  color: green;
  font-weight: 600;
  margin-top: 10px;
`;

const SignInLink = styled.div`
  margin: 20px;
`;

export {
  FileInput,
  SubmitButton,
  LoadingIndicator,
  SuccessMessage,
  FormSection,
  FormSectionDescription,
  FormWrapper,
  FormSectionTitle,
  Container,
  Logo,
  Title,
  TitleContainer,
  Section,
  SignInLink,
};
