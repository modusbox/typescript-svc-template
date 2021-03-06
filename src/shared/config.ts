/******************************************************************************
 *  Copyright 2019 ModusBox, Inc.                                             *
 *                                                                            *
 *  info@modusbox.com                                                         *
 *                                                                            *
 *  Licensed under the Apache License, Version 2.0 (the "License");           *
 *  you may not use this file except in compliance with the License.          *
 *  You may obtain a copy of the License at                                   *
 *  http://www.apache.org/licenses/LICENSE-2.0                                *
 *                                                                            *
 *  Unless required by applicable law or agreed to in writing, software       *
 *  distributed under the License is distributed on an "AS IS" BASIS,         *
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  *
 *  See the License for the specific language governing permissions and       *
 *  limitations under the License                                             *
 ******************************************************************************/

import Convict from 'convict';
import path from 'path';

export interface MockServiceConfig {
    HOST: string
    PORT: number
}

// interface to represent service configuration
export interface ServiceConfig {
    PORT: number
    MOCK_SERVICE: MockServiceConfig
    GET_DATA_FROM_MOCK_SERVICE: boolean
}

// Declare configuration schema, default values and bindings to environment variables
const config = Convict<ServiceConfig>({
    PORT: {
        doc: 'The port of the API server.',
        format: 'port',
        default: 8000,
        env: 'PORT',
    },
    MOCK_SERVICE: {
        HOST: {
            doc: 'The Hostname/IP address of mock service.',
            format: '*',
            default: 'mock-service-host',
            env: 'MOCK_SERVICE_HOST',
        },
        PORT: {
            doc: 'The port of mock service.',
            format: 'port',
            default: 3001,
            env: 'MOCK_SERVICE_PORT',
        },
    },
    GET_DATA_FROM_MOCK_SERVICE: {
        doc: 'Whether to connect to mock service and get the sample data.',
        format: 'Boolean',
        default: false,
        env: 'GET_DATA_FROM_MOCK_SERVICE',
    },
});

// Load configuration
config.loadFile(path.join(__dirname, '/../../config/default.json'));

// Perform configuration validation
config.validate({ allowed: 'strict' });

export default config;
