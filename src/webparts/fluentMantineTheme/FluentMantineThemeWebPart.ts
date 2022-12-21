import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'FluentMantineThemeWebPartStrings';
import FluentMantineTheme, { IFluentMantineThemeProps } from './components/FluentMantineTheme';

export interface IFluentMantineThemeWebPartProps {
  description: string;
}

export default class FluentMantineThemeWebPart extends BaseClientSideWebPart<IFluentMantineThemeWebPartProps> {

  private currentTheme: IReadonlyTheme;

  public render(): void {
    const element: React.ReactElement<IFluentMantineThemeProps> = React.createElement(
      FluentMantineTheme,
      {
        currentTheme: this.currentTheme
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    this.currentTheme = currentTheme;
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
