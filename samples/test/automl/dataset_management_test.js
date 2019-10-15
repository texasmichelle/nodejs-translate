/**
 * Copyright 2019 Google LLC
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
const {Storage} = require('@google-cloud/storage');

const cp = require('child_process');
const uuid = require('uuid');

const execSync = cmd => cp.execSync(cmd, {encoding: 'utf-8'});

const CREATE_DATASET_REGION_TAG = 'automl_translate_create_dataset';
const IMPORT_DATASET_REGION_TAG = 'automl_translate_import_dataset';
const DELETE_DATASET_REGION_TAG = 'automl_translate_delete_dataset';
const LIST_DATASET_REGION_TAG = 'automl_translate_list_datasets';
const GET_DATASET_REGION_TAG = 'automl_translate_get_dataset';
const DATASET_ID = 'TRL3876092572857648864'; // 'TRL8522556519449886720';
const EXPORT_DATASET_REGION_TAG = 'automl_translate_export_dataset';

describe('Automl Translate Dataset Tests', () => {
  const client = new AutoMlClient();

  // it('should create, import, and delete a dataset', async () => {
  //   const projectId = await client.getProjectId();
  //   const displayName = `test_${uuid.v4().replace(/-/g, '_').substring(0, 26)}`;

  //   // create
  //   const create_output = execSync(`node automl/${CREATE_DATASET_REGION_TAG}.js ${projectId} ${displayName}`);
  //   assert.match(create_output, /Dataset id:/);
    
  //   const datasetId = create_output.split('Dataset id: ')[1].split('\n')[0];

  //   // import
  //   const data = `gs://${projectId}-vcm/en-ja-short.csv`;
  //   const import_output = execSync(`node automl/${IMPORT_DATASET_REGION_TAG}.js ${projectId} ${datasetId} ${data}`);
  //   assert.match(import_output, /Dataset imported/);

  //   // delete
  //   const delete_output = execSync(`node automl/${DELETE_DATASET_REGION_TAG}.js ${projectId} ${datasetId}`);
  //   assert.match(delete_output, /Dataset deleted/);
  // });

  // it('should list datasets', async () => {
  //   const projectId = await client.getProjectId();
  //   const list_output = execSync(`node automl/${LIST_DATASET_REGION_TAG}.js ${projectId}`)

  //   assert.match(list_output, /Dataset id/);
  // });

  // it('should get a dataset', async () => {
  //   const projectId = await client.getProjectId();
  //   const get_output = execSync(`node automl/${GET_DATASET_REGION_TAG}.js ${projectId} ${DATASET_ID}`)

  //   assert.match(get_output, /Dataset id/);
  // });

  it('should export a datset', async () => {
    const projectId = await client.getProjectId();
    const export_output = execSync(`node automl/${EXPORT_DATASET_REGION_TAG}.js ${projectId} ${DATASET_ID} gs://${projectId}-vcm/TEST_EXPORT_OUTPUT/`)

    assert.match(export_output, /Dataset exported/);

    const storageClient = new Storage();
    const options = {
      prefix: 'TEST_EXPORT_OUTPUT',
    };
    const [files] = await storageClient.bucket(`gs://${projectId}-vcm`).getFiles(options);
    files.forEach(file => {
      storageClient.bucket(`gs://${projectId}-vcm`).file(file.name).delete();
    });
  });
});
