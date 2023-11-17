'use client';

import React, { useMemo, useState } from 'react';

import { observer } from 'mobx-react';
import { useQuery } from '@apollo/client';
import { store } from '@/store';
import {
  SearchBy,
  SearchUsersResponse,
  SexFilter,
  SortBy,
  UserFilters,
} from '@/types';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { SEARCH_USERS_QUERY } from '@/graphql/queries/search-users.query';
import { UserProfilePreview } from '@/components/UserProfilePreview';

const SearchPage = () => {
  const [searchBy, setSearchBy] = useState('nickname');
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState('fullname');
  const [sex, setSex] = useState('all');
  const [withPostsOnly, setWithPostsOnly] = useState(false);

  const userFilters: UserFilters = useMemo(
    () => ({
      searchBy: searchBy === 'nickname' ? SearchBy.NICKNAME : SearchBy.FULLNAME,
      sortBy:
        sortBy === 'fullname'
          ? SortBy.FULLNAME
          : SortBy.DATE_OF_ACCOUNT_CREATION,
      searchText,
      sex: sex as SexFilter,
      withPostsOnly,
    }),
    [searchBy, searchText, sex, sortBy, withPostsOnly],
  );

  const { data: searchUsersResponse } = useQuery<SearchUsersResponse>(
    SEARCH_USERS_QUERY,
    {
      variables: {
        searchUsersInput: userFilters,
      },
    },
  );

  const users = useMemo(
    () =>
      searchUsersResponse?.searchUsers.filter(
        (user) => user.id !== store.profile?.id,
      ) ?? [],
    [searchUsersResponse?.searchUsers],
  );

  return (
    <div className="flex justify-center items-start w-full h-full">
      <div className="flex flex-col justify-start items-center w-[95%] max-w-[800px] gap-4">
        <Select onValueChange={setSearchBy} defaultValue="nickname">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Search by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="nickname">Nickname</SelectItem>
              <SelectItem value="fullname">Full name</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select onValueChange={setSortBy} defaultValue="fullname">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="fullname">Full name</SelectItem>
              <SelectItem value="date">Date of account creation</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <h1 className="text-white">Filters</h1>

        <div>
          <RadioGroup defaultValue="all" onValueChange={setSex}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="r1" />
              <Label htmlFor="r1">All</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="males" id="r2" />
              <Label htmlFor="r2">Males</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="females" id="r3" />
              <Label htmlFor="r3">Female</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Checkbox
            id="with-posts"
            checked={withPostsOnly}
            onCheckedChange={() => setWithPostsOnly(!withPostsOnly)}
          />
          <label
            htmlFor="with-posts"
            className="text-sm text-white font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-3"
          >
            With posts only
          </label>
        </div>

        <Input
          variant="big"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        {users &&
          users.map((user) => (
            <UserProfilePreview
              key={user.id}
              withFollowButton
              userData={user}
            />
          ))}
      </div>
    </div>
  );
};

export default observer(SearchPage);
