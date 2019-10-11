/**
 * Copyright 2018, Google, LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const {assert} = require('chai');
const {AutoMlClient} = require('@google-cloud/automl');

const cp = require('child_process');
const uuid = require('uuid');

const execSync = cmd => cp.execSync(cmd, {encoding: 'utf-8'});

const CREATE_DATASET_REGION_TAG = 'automl_translate_create_dataset';
const IMPORT_DATASET_REGION_TAG = 'automl_translate_import_dataset';
const DELETE_DATASET_REGION_TAG = 'automl_translate_delete_dataset';

describe(CREATE_DATASET_REGION_TAG, () => {
  const client = new AutoMlClient();
  const displayName = `test_${uuid.v4().replace(/-/g, '_').substring(0, 26)}`;

  it('should create, import, and delete a dataset', async () => {
    const projectId = await client.getProjectId();

    // create
    const create_output = execSync(`node automl/${CREATE_DATASET_REGION_TAG}.js ${projectId} ${displayName}`);
    assert.match(create_output, /Dataset id:/);
    
    const datasetId = create_output.split('Dataset id: ')[1].split('\n')[0];

    // import
    const data = `gs://${projectId}-vcm/en-ja.csv`;

    const import_output = execSync(`node automl/${IMPORT_DATASET_REGION_TAG}.js ${projectId} ${datasetId} ${data}`);
    assert.match(import_output, /Dataset imported/);

    // delete
    const delete_output = execSync(`node automl/${DELETE_DATASET_REGION_TAG}.js ${projectId} ${datasetId}`);
    assert.match(delete_output, /Dataset deleted/);
  });
});
