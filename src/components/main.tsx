import { useEffect, useState, useRef} from "react";
import styled from "styled-components";
import {TopAreaProps, UserProps} from "../types";
import {joinedDate} from "../utils/formatter";

export const TopArea = ({setUser}: TopAreaProps) => {
    const [empty, setEmpty] = useState<boolean>(false);
    const [notFound, setNotFound] = useState<boolean>(false);
    const usernameRef = useRef<HTMLInputElement>(null);
    const [inputUser] = useState("Marinad16");

    function hadleSubmit() {
        if (
            usernameRef.current?.value.trim() === "" ||
            usernameRef.current?.value === undefined
        ) {
            setEmpty(true);
            setUser(null);
            return;
        }

        setEmpty(false);
        fetchUser(usernameRef.current.value);
    }

    async function fetchUser(username: string) {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();

        if (response.status != 200) {
            setNotFound(true);
            setUser(null);
            return;
        }

        setNotFound(false);

        const user: UserProps = {
            pfp: data.avatar_url,
            name: data.name,
            joinedAt: joinedDate(data.created_at),
            username: data.login,
            bio: data.bio,
            repos: data.public_repos,
            followers: data.followers,
            following: data.following,
            links: {
                location: data.location,
                twitter: data.twitter_username,
                company: data.company,
                blog: data.blog,
            },
        };
        console.log(data);

        setUser(user);
    }

    useEffect(() => {
        fetchUser(inputUser)
    }, [inputUser])

    return (
        <Container>

            <InputArea
                onSubmit={(e: any) => {
                    e.preventDefault();
                    hadleSubmit();
                }}
            >
                <InputLabel>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                        <path
                            d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                    </svg>
                </InputLabel>

                <Input
                    ref={usernameRef}
                    name="username"
                    id="username"
                    type="text"
                    placeholder="Search username ..."
                />
                {empty && <Warn>Enter User</Warn>}

                <SubmitBtn type="submit">Search</SubmitBtn>
            </InputArea>
            {notFound && <Warn>Not Found</Warn>}
        </Container>
    );
};

const Container = styled.header`
  width: 100%;
`;


const Warn = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
  line-height: 2.2rem;
  color: #f74646;
  width: fit-content;
  margin: 0 auto;
  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 2rem;
  }
`

const InputArea = styled.form`
  margin-top: 3.6rem;
  border-radius: 1.5rem;
  background: darkgray;
  box-shadow: 0 16px 30px -10px rgba(70, 96, 187, 0.198567);
  height: 6.9rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem 0.7rem 0.7rem 1.6rem;
  transition: height 0.3s ease;
  position: relative;

  @media (max-width: 768px) {
    height: 5rem;
    padding: 5px;
  }
`;

const InputLabel = styled.label`
  height: 2.4rem;
  width: 2.4em;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  svg{
    width: 30px;
    height: 30px;
    fill: #ffffff;
    @media (max-width: 768px) {
      height: 20px;
      width: 20px;
    }
  }
  @media (max-width: 768px) {
    height: 2rem;
    width: 2em;
  }
  @media (max-width: 420px) {
    display: none;
  }
`;

const Input = styled.input`
  flex: 1;
  font-style: normal;
  font-weight: normal;
  font-size: 1.7rem;
  line-height: 192%;
  color: #333;
  background: none;
  border: none;
  margin: 0 1rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin: 0 0.2rem;
    width: 150px;
  }

  &:focus {
    outline: 1px dashed #0079ff;
  }
`;

const SubmitBtn = styled.button`
  background: #0079ff;
  border: none;
  height: 100%;
  border-radius: 1rem;
  line-height: 2.1rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  width: 8.4rem;
  transition: all 0.3s ease-out;

  &:hover {
    filter: brightness(1.05);
    box-shadow: 0px 0px 15px -3px #0079ff;
  }

  @media (max-width: 768px) {
    width: 6rem;
    font-size: 1.3rem;
  }
`;