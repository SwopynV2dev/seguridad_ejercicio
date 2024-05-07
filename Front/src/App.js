import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background-color: #3D8367;
`;

const LoginContainer = styled.div`
  width: 350px;
  padding: 40px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 30px;
  text-align: center;
  font-weight: bold;
  color: #000;
`;

const FormGroup = styled.div`
  margin-bottom: 40px;
  position: relative;
`;

const Label = styled.label`
  display: block;
  font-size: 17px;
  margin-bottom: 20px;
  font-weight: bold;
  color: #000;
`;

const Input = styled.input`
  width: calc(100% - 20px);
  padding: 10px 10px 10px 35px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
  ${({ invalid }) => invalid && `
    border-color: red;
  `}
`;

const Icon = styled.span`
  position: absolute;
  top: 60%;
  transform: translateY(-10%);
  right: 10px;
  color: #000;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  background-color: #B69840;
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #A78B39;
  }
`;

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isEmailValid = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isPasswordValid = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmailValid(email) && isPasswordValid(password)) {
      try {
        const response = await fetch('http://127.0.0.1:8000/api-token-auth/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
        if (response.ok) {
          // Handle successful login
          console.log('Login successful');
        } else {
          // Handle login failure
          console.error('Login failed');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <Container>
      <LoginContainer>
        <Title>Iniciar Sesión</Title>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu email"
              invalid={email !== '' && !isEmailValid(email)}
            />
            <Icon><AiOutlineUser size={20} /></Icon>
            {email !== '' && !isEmailValid(email) && <small style={{ color: 'red' }}>El correo electrónico no es válido.</small>}
          </FormGroup>
          <FormGroup>
            <Label>Contraseña</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              invalid={password !== '' && !isPasswordValid(password)}
            />
            <Icon><AiOutlineLock size={20} /></Icon>
            {password !== '' && !isPasswordValid(password) && <small style={{ color: 'red' }}>La contraseña debe tener al menos 6 caracteres.</small>}
          </FormGroup>
          <Button type="submit" disabled={!isEmailValid(email) || !isPasswordValid(password)}>Iniciar Sesión</Button>
        </form>
      </LoginContainer>
    </Container>
  );
};

export default App;
