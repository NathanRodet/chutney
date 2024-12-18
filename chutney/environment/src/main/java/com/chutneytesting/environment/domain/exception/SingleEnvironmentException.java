/*
 * SPDX-FileCopyrightText: 2017-2024 Enedis
 *
 * SPDX-License-Identifier: Apache-2.0
 *
 */

package com.chutneytesting.environment.domain.exception;

public class SingleEnvironmentException extends RuntimeException {

    public SingleEnvironmentException(String environmentName) {
            super("Cannot delete environment with name " + environmentName + " : cannot delete the last env");
        }
}
