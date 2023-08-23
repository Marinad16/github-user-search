import React, {useState} from 'react';
import { UserProps } from "./types";
import {TopArea} from "./components/main";
import { Index } from "./components/UserData/Index";
import styled from "styled-components"

function App() {
    const [user, setUser] = useState<UserProps | null>(null)

    function setUserData (user: UserProps | null): void {
        setUser(user)
    }
  return (
    <div className="App">
        <Container>
            <TopArea setUser={setUserData} />
            {user && <Index user={user} />}
        </Container>
    </div>
  );
}

const Container = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
  padding: 3.1rem 2.4rem;

  @media (min-width: 768px) {
    padding: 3.1rem 7rem;
  }
`;

export default App;
