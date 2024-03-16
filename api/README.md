# language-learning-api
This is API for language learning app which allows you to list supported languages, translate texts and create, read, update and delete repetitions.

## Endpoints description
All described endpoints are protected - they use Amazon Cognito user pool as authorizer and require token (JWT) in `Authorization` header. Users can only perform operations on their own repetitions and have no access to others' repetitions.

### GET /supportedLanguages
Get languages supported by translator

Optional query parameter:
* `displayLanguageCode` (string) - the language code for the language to use to display the language names in the response (the default is `en`)

### POST /translate
Translate text

Required body parameters:
* `sourceLanguageCode` (string) - the language code for the language of the text to be translated
* `targetLangugeCode` (string) - the language code for the language of the text after translation
* `text` (string) - text to be translated

### POST /repetitions
Create a new repetition

Required body parameters:
* `sourceLanguageText` (string) - source text for the repetition
* `targetLanguageText` (string) - target text for the repetition
* `sourceLanguage` (string) - language of the given source text
* `targetLanguage` (string) - language of the given target text

### GET /repetitions
List your repetitions

Optional query parameters:
* `startDate` (date) - list repetitions whose next repetition dates are no earlier than given date
* `endDate` (date) - list repetitions whose next repetition dates are no later than given date
* `sourceLanguage` (string) - list repetitions whose source texts are in a given language
* `targetLanguage` (string) - list repetitions whose target texts are in a given language
* `sortBy` (string) - sort by a given field name
* `sortType` (`ASC`|`DESC`) - sort ascending (`ASC`) or descending (`DESC`)
* `skip` (number) - number of repetitions which should be skipped
* `take` (number) - number of repetitions which should be returned

Response:
* `data` (Repetition[]) - list of repetitions
* `skip` - number of repetitions skipped
* `take` - number of repetitions returned
* `total` - number of all existing repetitions (for given users)

### GET /repetitions/{id}
Get a repetition with given `id`

### PATCH /repetitions/{id}
Modify an existing repetition with given `id` or handle repetition result

Optional body parameters:
* `sourceLanguageText` (string) - source text for the repetition
* `targetLanguageText` (string) - target text for the repetition
* `nextRepetitionDate` (string) - date of next repetition
* `repetitionResult` (`success`|`partialSuccess`|`failure`) - result of the repetition. This parameter allows to calculate next repetition date and number of successul repetitions in row based on repetition result. (This parameter for the endpoint will probably not be handled in the near future since there will be a seperate endpoint for this functionality)

### DELETE /repetitions/{id}
Remove a repetition with given `id`

### PATCH /repetitions/{id}/result _(doesn't exist yet)_
Handle repetition result - calculate next repetition date and number of successul repetitions in row based on repetition result
