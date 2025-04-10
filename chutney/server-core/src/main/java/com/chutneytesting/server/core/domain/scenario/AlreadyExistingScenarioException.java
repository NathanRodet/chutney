/*
 * SPDX-FileCopyrightText: 2017-2024 Enedis
 *
 * SPDX-License-Identifier: Apache-2.0
 *
 */

package com.chutneytesting.server.core.domain.scenario;

@SuppressWarnings("serial")
public class AlreadyExistingScenarioException extends RuntimeException {

    public AlreadyExistingScenarioException() {
        super("Scenario already existing");
    }

}
