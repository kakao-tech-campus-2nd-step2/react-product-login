import React from 'react';
import styled from '@emotion/styled';
import { getThemes } from '@apis/themes';
import { Grid, CenteredContainer, StatusHandler } from '@components/common';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ROUTE_PATH } from '@routes/path';
import { getDynamicPath } from '@utils/getDynamicPath';
import { ThemesResponse } from '@internalTypes/responseTypes';
import { AxiosError } from 'axios';
import ThemeItem from './ThemeItem';

const GRID_GAP = 0;
const GRID_COLUMNS = 6;

interface LocationState {
  backgroundColor: string;
  label: string;
  title: string;
  description: string;
}

export default function ThemeCategory() {
  const { data, error, isError, isLoading } = useQuery<ThemesResponse, AxiosError>({
    queryKey: ['theme'],
    queryFn: getThemes,
  });

  const isEmpty = !data || data?.themes.length === 0;

  return (
    <ThemeCategoryContainer>
      <CenteredContainer maxWidth="md">
        <StatusHandler isLoading={isLoading} isError={isError} isEmpty={isEmpty} error={error}>
          <Grid gap={GRID_GAP} columns={GRID_COLUMNS}>
            {data?.themes.map((theme) => (
              <Link
                key={theme.id}
                to={getDynamicPath(ROUTE_PATH.THEME, { themeKey: theme.key })}
                state={
                  {
                    backgroundColor: theme.backgroundColor,
                    label: theme.label,
                    title: theme.title,
                    description: theme.description,
                  } as LocationState
                }
              >
                <ThemeItem image={theme.imageURL} label={theme.label} />
              </Link>
            ))}
          </Grid>
        </StatusHandler>
      </CenteredContainer>
    </ThemeCategoryContainer>
  );
}

const ThemeCategoryContainer = styled.section`
  padding-top: 45px;
  padding-bottom: 23px;
`;
