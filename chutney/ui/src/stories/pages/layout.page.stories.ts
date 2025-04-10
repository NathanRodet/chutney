/*
 * SPDX-FileCopyrightText: 2017-2024 Enedis
 *
 * SPDX-License-Identifier: Apache-2.0
 *
 */

import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ParentComponent } from '@core/components/parent/parent.component';
import { InfoService, LinkifierService, LoginService } from '@core/services';
import { Observable, of } from 'rxjs';
import { Authorization, Linkifier, User } from '@model';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateTestingModule } from '../../app/testing/translate-testing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ChutneyLeftMenuComponent } from '@shared/components/layout/left-menu/chutney-left-menu.component';
import { ChutneyMainHeaderComponent } from '@shared/components/layout/header/chutney-main-header.component';
import { RouterModule, Routes } from '@angular/router';
import { intersection } from '@shared/tools';

const mockLoginService = {
  hasAuthorization(
    authorization: Array<Authorization> | Authorization = [],
    u: User = null,
  ): boolean {
    return true;
  },
  isAuthenticated(): boolean {
    return true;
  },
  getUser(): Observable<User> {
    return of(new User("user_id", "username", "firstname"));
  },
};

const mocklinkifierService = {
  loadLinkifiers(): Observable<Array<Linkifier>> {
    return of([]);
  },
};

const mockInfoService = {
  getVersion(): Observable<string> {
    return of("fake.version");
  },
  getApplicationName(): Observable<string> {
    return of("app-name");
  },
};

const routes: Routes = [
  {
    path: "",
    component: ParentComponent,
    children: [
      { path: "", component: ChutneyMainHeaderComponent, outlet: "header" },
      {
        path: "",
        component: ChutneyLeftMenuComponent,
        outlet: "left-side-bar",
      },
    ],
  },
];

export default {
  title: "Pages/Layout",
  component: ParentComponent,
  decorators: [
    moduleMetadata({
      imports: [
          RouterModule.forChild(routes), TranslateModule, TranslateTestingModule],
      providers: [
        { provide: LoginService, useValue: mockLoginService },
        { provide: LinkifierService, useValue: mocklinkifierService },
        { provide: InfoService, useValue: mockInfoService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }),
  ],
} as Meta;

type Story = StoryObj<ParentComponent>;

export const Default: Story = {};

export const AdminAccess: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: LoginService,
          useValue: {
            ...mockLoginService,
            hasAuthorization(
              authorization: Array<Authorization> | Authorization = [],
              u: User = null,
            ): boolean {
              return (
                !authorization.length ||
                intersection([Authorization.ADMIN_ACCESS], [...authorization])
                  .length > 0
              );
            },
          },
        },
      ],
    }),
  ],
};

export const UserAccess: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: LoginService,
          useValue: {
            ...mockLoginService,
            hasAuthorization(
              authorization: Array<Authorization> | Authorization = [],
              u: User = null,
            ): boolean {
              return (
                !authorization.length ||
                intersection(
                  [
                    Authorization.CAMPAIGN_READ,
                    Authorization.SCENARIO_READ,
                  ],
                  [...authorization],
                ).length > 0
              );
            },
          },
        },
      ],
    }),
  ],
};
