import { MantineProvider } from '@mantine/core';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { Stack } from 'office-ui-fabric-react';
import * as React from 'react';
import { useMantineThemeFromFluentTheme } from '../hooks/useMantineThemeFromFluentTheme';
import { CarouselCard } from './CarouselCard';
import { Components } from './Components';

export interface IFluentMantineThemeProps {
  currentTheme: IReadonlyTheme;
}

export default function FluentMantineTheme(props: IFluentMantineThemeProps): JSX.Element {

  const theme = useMantineThemeFromFluentTheme(props.currentTheme);

  React.useEffect(() => {
    console.log("Fluent Theme =>", props.currentTheme);
  }, [props.currentTheme]);

  React.useEffect(() => {
    console.log("Mantine Theme =>", theme);
  }, [theme]);

  return (
    <MantineProvider theme={theme} withCSSVariables={false}>
      <Stack tokens={{ childrenGap: 20 }}>
        <Components />
        <CarouselCard />
      </Stack>
    </MantineProvider>
  );
}
