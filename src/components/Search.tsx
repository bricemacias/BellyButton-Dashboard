import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import icons from '../assets/sprite.svg';

import styled from 'styled-components';
import { RootState } from '../logic/store';
import searchReducer from '../logic/app/searchReducer';

const SearchLayout = styled.form`
  /* flex: 0 0 40%; */

  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: ${(p) => p.theme.screen.smallest}) {
    order: 1;
    flex: 0 0 80%;
    margin-bottom: 2rem;
  }

  flex: 0 0 50%;
  margin-left: 4rem;

  @media only screen and (max-width: ${(p) => p.theme.screen.medium716}) {
    margin-left: 1rem;
    flex: 0 0 40%;
    font-size: 1rem;
  }

  @media only screen and (max-width: ${(p) => p.theme.screen.smallest}) {
    flex: 0 0 50%;
    margin: 1rem auto;
    align-self: center;
  }

  &__input:focus + &__button {
    background-color: ${(p) => p.theme.colors.grey.light3};
  }
`;

export const SearchInput = styled.input`
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  background-color: ${(p) => p.theme.colors.grey.light2};
  border: none;
  padding: 0.7rem 2rem;
  border-radius: 100px;
  width: 90%;
  transition: all 0.2s;
  margin-right: -3.25rem;

  &:focus {
    outline: none;
    width: 100%;
    background-color: ${(p) => p.theme.colors.grey.light3};
  }

  &:focus + button {
    background-color: ${(p) => p.theme.colors.grey.light3};
  }

  &::-webkit-input-placeholder {
    font-weight: 100;
    color: ${(p) => p.theme.colors.grey.light4};
  }
`;

export const SearchButton = styled.div`
  border: none;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: ${(p) => p.theme.colors.grey.light2}; */

  &:focus {
    outline: none;
  }

  &:active {
    transform: translateY(2px);
  }
`;

export const SearchIcon = styled.svg`
  height: 2rem;
  width: 2rem;
  fill: ${(p) => p.theme.colors.grey.dark3};
`;

const Search = () => {
  const search = useSelector((state: RootState) => state.search.data);
  const updateSearchData = searchReducer.updateSearchData;
  const dispatch = useDispatch();

  return (
    <>
      <SearchLayout>
        <SearchInput
          type="text"
          placeholder="Search talents"
          value={search}
          onChange={(e) => dispatch(updateSearchData(e.target.value))}
        />
        <SearchButton>
          <SearchIcon>
            <use xlinkHref={`${icons}#icon-magnifying-glass`} />
          </SearchIcon>
        </SearchButton>
      </SearchLayout>
    </>
  );
};

export default Search;
