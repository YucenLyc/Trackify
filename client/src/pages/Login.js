import styled from './styled-components/macro';

const StyleLoginContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const StyledLoginButton = styled.a`
  display: inline-block;
  background-color: var(--green);
  color: var(--white);
  border-radius: var(--board-radius-pill);
  font-weight: 700;
  font-size: var(--fz-lg);
  padding: var(--spacing-sm) var(--spacing-xl);

  &:hover,
  &:focus {
    text-decoration: none;
    filter: brightness(1.1);
  }
`;

const Login = () => {
  <StyleLoginContainer>
    <StyledLoginButton href="http://localhost:9999/login">
      Log In Spotify
    </StyledLoginButton>
  </StyleLoginContainer>
};

export default Login;
