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

function main(
  projectId = 'YOUR_PROJECT_ID',
  datasetId = 'YOUR_DATASET_ID',
  displayName = 'YOUR_DISPLAY_NAME'
) {
  // [START automl_translate_create_model]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  // const projectId = 'YOUR_PROJECT_ID';
  // const dataset_id = 'YOUR_DATASET_ID';
  // const displayName = 'YOUR_DISPLAY_NAME';

  // Imports the Google Cloud AutoML library
  const {AutoMlClient} = require(`@google-cloud/automl`);

  // Instantiates a client
  const client = new AutoMlClient();

  async function createModel() {
    // Construct request
    const request = {
      parent: client.locationPath(projectId, 'us-central1'),
      model: {
        displayName: displayName,
        datasetId: datasetId,
        translationModelMetadata: {}, // Leave unset, use the default base model
      },
    };

    // Don't wait for the LRO
    const operation = client.createModel(request);
    console.log(`Training started...`);
    // TODO: Get operation name from promise.
  }

  createModel();
  // [END automl_translate_create_model]
}

main(...process.argv.slice(2));
